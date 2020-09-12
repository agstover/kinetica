import SideNav from 'components/SideNav'
import { useAppStateContext } from 'shared/appState'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function PrimarySideNav() {
    const {navTree:sideNavData} = useAppStateContext()
    const { pathname:currenLocation } = useRouter()
    console.log("Current Location", currenLocation);
    return (
        <SideNav variant='primary' >
            {
                sideNavData.map(item => {
                    if(item.location) return <SideNav.Item as={Link} key={item.id} active={currenLocation === item.location} location={item.location}>{item.title}</SideNav.Item>
                    if(item.items && item.collapsible) return (
                        <SideNav.Dropdown key={item.id} >
                            <SideNav.Dropdown.Toggle>{item.title}</SideNav.Dropdown.Toggle>
                            <SideNav.Dropdown.Content>
                                {
                                    item.items.map(item => <SideNav.Item as={Link} className='text-white' key={item.id} location={item.location} >{item.title}</SideNav.Item>)
                                }
                            </SideNav.Dropdown.Content>
                        </SideNav.Dropdown>
                    )
                })
            }
        </SideNav>
    )
}
