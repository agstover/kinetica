import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { SecondarySideNavLayout } from "components/layouts"
import path from 'path'
import fs from 'fs'
import { getFilePaths } from 'lib/utils'
import matter from 'gray-matter'


const root = process.cwd() + '/_content'

export default function Learn(props) {
  const {nav, mdxSource, frontMatter} = props
  const content = hydrate(mdxSource)
  return (
      <SecondarySideNavLayout navData={nav.items}>
          <div className='text-white'>
          {
            content
          }
          </div>
      </SecondarySideNavLayout>
  )
}

export async function getStaticProps({params}) {
    const root = process.cwd()
    const targetExists = filepath => fs.existsSync(filepath)
    // getNavData
    // this is a catch-all route so params.trade is an array of all url segments
    const tradeNavLocation = path.join(process.cwd(),`/shared/sideNav/${params.trade[0]}`)
    const nav = await fs.promises.readFile(`${tradeNavLocation}.json`)

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
        nav: JSON.parse(nav),
        mdxSource,
        frontMatter
      }, // will be passed to the page component as props
    }
}

export async function getStaticPaths() {
    const paths = getFilePaths(`${root}/learn`, fs)
      .map(path => {
        let arr = path.split(`${root}/learn/`)[1]
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
  

