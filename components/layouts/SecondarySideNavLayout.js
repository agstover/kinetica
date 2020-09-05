import { useSideNavContext } from './sideNavContext'
import SideNav from '../SideNav'

const Cascade = (item, depth = 0)=> {
    return (
        <>
            <SideNav.Item key={item.id} text={item.title} location={item.location} />
            {
                !Array.isArray(item.items)
                ? null
                : item.items.map(item => <Cascade item={item} depth={depth + 1}/>)
            }
        </>
    )
}

const SecondarySideNav = ({navData}) => {
    const {isOpen, updateOpenItems} = useSideNavContext()
    return (
        <SideNav variant='primary' >
            <motion.div initial="exit" animate="enter" exit="exit">
                <motion.div variants={sideNavMotionVariants}>
                    {
                        navData.map(item => {
                            if(item.location) return <SideNav.Item key={item.id} text={item.title} location={item.location} />
                            if(item.items) return (
                                <SideNav.Group key={item.id} title={item.title} managed collapsible={item.collapsible} active={isOpen(item.id)} onClick={()=>updateOpenItems(item.id)}>
                                    {
                                        <Cascade item={item} />
                                    }
                                </SideNav.Group>
                            )
                        })
                    }
                </motion.div> 
            </motion.div>
        </SideNav>

    )
}