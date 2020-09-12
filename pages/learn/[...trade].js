import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import path from 'path'
import fs from 'fs'
import { getFilePaths } from 'lib/utils'
import matter from 'gray-matter'
import { MainLayout } from 'components/layouts'
import SecondarySideNav from 'components/SecondarySideNav'
import { getSideNavData } from 'shared/sideNav'
import Post from 'components/Post'
import omit from 'lodash.omit'
import { useAppStateContext } from 'shared/appState'

const root = process.cwd()

export default function Learn({mdxSource, frontMatter, navData, tradeData}) {
  const content = hydrate(mdxSource)
  return (
      <MainLayout sideNav={<SecondarySideNav tradeData={tradeData} navData={navData}/>}>
        <Post title={frontMatter.title || 'This is where title should go.'}>
          {
            content
          }
        </Post>
      </MainLayout>
  )
}

export async function getStaticProps({params}) {
    
    const trade = params.trade[0]
    const targetExists = filepath => fs.existsSync(filepath)
    // getNavData
    // this is a catch-all route so params.trade is an array of all url segments
    const navDataPath = path.join(process.cwd(),`/shared/sideNav/${trade}`)
    let rawNavData = await fs.promises.readFile(`${navDataPath}.json`)
      .then(data => JSON.parse(data))

    const {asNavTree:navData} = getSideNavData(rawNavData['items'])
    
    // getContent
    let contentPath = `${root}/_content/learn/${params.trade.join('/')}`

    contentPath = targetExists(contentPath) ? `${contentPath}/index.mdx` : `${contentPath}.mdx`

    const source = await fs.promises.readFile(
      contentPath,
      'utf-8'
    )

    const { data:frontMatter, content } = matter(source)
    const mdxSource = await renderToString(content)
    return {
      props: {
        tradeData: omit(rawNavData,['items']),
        navData,
        mdxSource,
        frontMatter
      }, // will be passed to the page component as props
    }
}

export async function getStaticPaths() {
    const paths = getFilePaths(`${root}/_content/learn`, fs)
      .map(path => {
        let arr = path.split(`${root}/_content/learn/`)[1]
        .split('/')
        arr.splice(arr.length -1, 1, arr[arr.length -1 ].replace(/\.mdx/, ''))
        if(arr[arr.length - 1] === 'index') arr.splice(arr.length - 1, 1)
        return arr
      })
    return {
      paths: paths.map(trade => ({ params: { trade }})),
      fallback: false
    };
}
  

