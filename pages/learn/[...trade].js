import { withLayout } from "../../components/layouts"
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import SecondarySideNavLayout from "../../components/SideNav"
import path from 'path'
import fs from 'fs'
import { getFilePaths } from 'lib/utils'
import { render } from "react-dom"

const root = process.cwd() + '/_content'

export default function Learn({nav, mdxSource, frontMatter}) {
    // content = hydrate(mdxSource)
    return (
        <SecondarySideNavLayout navData={nav}>
            <div>
                {/* {content} */}
            </div>
        </SecondarySideNavLayout>
    )
}

export async function getStaticProps({params}) {
    // this is a catch-all route so params.trade is an array of all url segments
    const tradeNavLocation = path.join(process.cwd(),`/shared/sideNav/${params.trade[0]}`)
    const nav = await fs.promises.readFile(`${tradeNavLocation}.json`)
    // const source = fs.readFileSync(
    //   path.join(root, `${params.trade.join('/')}.mdx`),
    //   'utf-8'
    // )
    // console.log("SOURCE", source);
    // const { data:frontMatter, content } = matter(source)
    // const mdxSource = await renderToString(content)
    return {
      props: {
        nav: JSON.parse(nav),
        // mdxSource,
        // frontMatter
      }, // will be passed to the page component as props
    }
}

export async function getStaticPaths() {
    const paths = getFilePaths(`${root}/learn`, fs)
      .map(path => {
        let arr = path.split(`${root}/`)[1]
        .split('/')
        arr.splice(arr.length -1, 1, arr[arr.length -1 ].replace(/\.mdx/, ''))
        return arr
      })
      
    return {
      paths: paths.map(trade => ({ params: { trade }})),
      fallback: true
    };
}
  

