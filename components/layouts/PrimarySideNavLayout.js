import { useSideNavContext } from './sideNavContext'
import SideNav from '../SideNav'
import getSideNavData, {getSideNavMotionVariants} from 'shared/sideNav'
import { motion } from 'framer-motion'

export default function PrimarySideNavLayout({children}) {
    const {isOpen, updateOpenItems} = useSideNavContext()
    const sideNavData = getSideNavData().asNavTree
    return (
        <div className='flex flex-row'>
            <SideNav variant='primary' >
                <motion.div initial="exit" animate="enter" exit="exit">
                    <motion.div variants={getSideNavMotionVariants()}>
                        {
                            sideNavData.map(item => {
                                if(item.location) return <SideNav.Item key={item.id} text={item.title} location={item.location} />
                                if(item.items) return (
                                    <SideNav.Dropdown key={item.id} managed collapsible={item.collapsible} active={isOpen(item.id)} >
                                        <SideNav.Dropdown.Toggle onClick={()=>updateOpenItems(item.id)}>{item.title}</SideNav.Dropdown.Toggle>
                                        <SideNav.Dropdown.Content>
                                            {
                                                item.items.map(item => <SideNav.Item key={item.id} text={item.title} location={item.location} />)
                                            }
                                        </SideNav.Dropdown.Content>
                                    </SideNav.Dropdown>
                                )
                            })
                        }
                    </motion.div> 
                </motion.div>
            </SideNav>
            {
                children
            }
        </div>

    )
}

export const withPrimarySideNavLayout = page => (
    <PrimarySideNavLayout>
        {page}
    </PrimarySideNavLayout>
)