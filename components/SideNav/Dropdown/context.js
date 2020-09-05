import React, { useContext } from 'react'

export const DropdownContext = React.createContext()

export const useDropdownContext = () => {
    const context = useContext(DropdownContext)
    if(!context) throw new Error('DropdownContext used outside SideNav Compound Component')
    return context
}