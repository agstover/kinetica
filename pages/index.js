import { withMainLayoutAndPrimarySideNav } from 'components/layouts/MainLayout'

export default function Home() {
  return (
    <div className='bg-primary bg-gradient-to-br from-primary to-secondary'>
      <ul className='circles'>
        <li><img className='bg-gray-300 rounded-full opacity-25' src='/avatars/hvac.png'/></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <h1 style={{height: '600px'}}>Home</h1>

    </div>
  )
}

Home.getLayout = page => withMainLayoutAndPrimarySideNav(page)

