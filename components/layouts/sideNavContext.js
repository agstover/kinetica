import React, { useContext } from 'react'
import {noop} from 'lib/utils'

export const SideNavContext = React.createContext({
    isOpen: noop,
    updateOpenItems: noop
})

export default SideNavContext

export const useSideNavContext = () => {
    const context = useContext(SideNavContext)
    if(!context) throw new Error("SideNavContext can't be used outside SideNav Component")
    return context
}
