import { withPrimarySideNavLayout } from 'components/layouts'

export default function Home() {
  return (
    <h1>Home</h1>
  )
}

Home.getLayout = page => withPrimarySideNavLayout(page)

