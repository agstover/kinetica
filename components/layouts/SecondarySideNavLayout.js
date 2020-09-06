import { useSideNavContext } from './sideNavContext'
import SideNav from '../SideNav'
import { motion } from 'framer-motion'
import {getSideNavMotionVariants} from 'shared/sideNav'


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
        <SideNav variant='secondary' >
            <motion.div initial="exit" animate="enter" exit="exit">
                <motion.div variants={getSideNavMotionVariants()}>
                    {
                        navData.map(item => {
                            if(!item.location) return <SideNav.Title key={item.id}>{item.title}</SideNav.Title>
                            if(item.items) return <Cascade key={item.id} item={item}/>
                        })
                    }
                </motion.div> 
            </motion.div>
        </SideNav>
    )
}

export default function SecondarySideNavLayout({navData, children}) {
    console.log("NAV DATA", navData);
    return (
        <div>
            <SecondarySideNav navData={navData} />
            {
                children
            }
        </div>
    )

}