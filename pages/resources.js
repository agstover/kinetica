import { withMainLayoutAndPrimarySideNav } from 'components/layouts/MainLayout'

export default function Resources() {
  return (
    <h1>Resources</h1>
  )
}

Resources.getLayout = page => withMainLayoutAndPrimarySideNav(page)

