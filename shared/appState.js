import React, { useContext } from 'react'
import {noop} from 'lib/utils'

export const AppStateContext = React.createContext({
    isOpen: noop,
    updateOpenItems: noop
})

export const AppStateProvider = AppStateContext.Provider

export const useAppStateContext = () => {
    const context = useContext(AppStateContext)
    if(!context) throw new Error("useAppStateContext can't be used outside of AppStateProvider")
    return context
}
