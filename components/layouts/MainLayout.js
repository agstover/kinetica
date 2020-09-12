import MainNav from 'components/MainNav'
import {getSideNavData, allSideNavData, getSideNavMotionVariants} from 'shared/sideNav'
import { motion } from 'framer-motion'
import { useState } from 'react'
import PropTypes from 'prop-types'
import PrimarySideNav from 'components/PrimarySideNav'
import Link from 'next/link'
import cn from 'classnames'

const sideNavData = getSideNavData(allSideNavData)
const logoSrc = 'https://www.designbolts.com/wp-content/uploads/2013/05/20-logo.jpg'


const Logo = () => (
    <Link href='/'>
        <div className='cursor-pointer flex top-nav-height pl-5'>
            <img className='self-center' src={'/kinetica_logo_dark.png'} />
        </div>
    </Link>
)

const SideNavContainer = ({children, className }) => (
    <div className={cn(className, 'flex flex-col h-screen sidenav-width')}>
        <Logo />
        <div className='px-4 py-5 w-64 flex-grow overflow-y-auto overflow-x-hidden'>
            <motion.div initial="exit" animate="enter" exit="exit">
                <motion.div variants={getSideNavMotionVariants()}>
                    {
                        children
                    }
                </motion.div>
            </motion.div>
        </div>
        <div className='flex flex-col px-4 py-5'>
            SideNav Footer
        </div>
    </div>
)

// Layouts are added to pages with the withLayout HOC
export default function MainLayout({sideNav:SideNav, children}) {
    return (
        <div className='flex flex-row w-full h-full'>  
            <SideNavContainer className='text-xl border-r border-white'>
                {
                    React.cloneElement(SideNav,{
                        ...SideNav.props
                    })
                }
            </SideNavContainer>
            <div className='flex flex-col flex-grow h-full'>
                <MainNav/>
                <div className='flex flex-col overflow-y-auto h-screen relative'>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}

export const withMainLayoutAndPrimarySideNav = page => (
    <MainLayout sideNav={<PrimarySideNav />}>
        {
            page
        }
    </MainLayout>
)


