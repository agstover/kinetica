import SideNav from 'components/SideNav'
import Link from 'next/link'
import { useRouter } from 'next/router'

/// WE'RE NOT GETTING IDS FROM THE GETSTATICPROPS METHOD. NEED TO PASS IT THROUGH THE ADD IDS FUNCTION

const Cascade = ({item, depth = 0})=> {
    const {asPath} = useRouter()
    return (
        <>
            {
                item.location 
                ? <SideNav.Item as={Link} active={asPath===item.location} location={item.location}>{item.title}</SideNav.Item>
                : <SideNav.Title>{item.title}</SideNav.Title>
            }
            {
                !Array.isArray(item.items)
                ? null
                : item.items.map(item => <Cascade key={item.id} item={item} depth={depth + 1}/>)
            }
        </>
    )
}

export default function SecondarySideNav({tradeData, navData}) {
    return (
        <>
            <div className='bg-green-400 rounded-sm shadow-sm'>
                <img src={require(`../public${tradeData.avatar}`)} />
            </div>
            <SideNav variant='secondary' >
                {
                    navData.map(item => <Cascade key={item.id} item={item} />)
                }
            </SideNav>
        </>
    )
}