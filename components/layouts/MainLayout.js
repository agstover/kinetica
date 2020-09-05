import MainNav from 'components/MainNav'
import getSideNavData from 'shared/sideNav'
import { motion } from 'framer-motion'
import { useState } from 'react'
import PropTypes from 'prop-types'
import SideNavContext from './sideNavContext'

const initialOpenItems = Object.keys(getSideNavData().indexedById).reduce((acc, key) => {
    acc[key] = false
    return acc
},{})


// Layouts are added to pages with the withLayout HOC
export default function MainLayout({children}) {
    // set up open/closed state for all nav items if they decide to be collapsible

    const [openItems, _updateOpenItems] = useState({...initialOpenItems})
    const isOpen = id => openItems[id]
    const updateOpenItems = id => {
        _updateOpenItems({
            ...openItems,
            [id]: !openItems[id]
        })
    }

    
    return (
        <div className='flex flex-col'>
            <MainNav />
            <SideNavContext.Provider value={{updateOpenItems, isOpen}}>
                {
                    children
                }
            </SideNavContext.Provider>
        </div>
    )
}

