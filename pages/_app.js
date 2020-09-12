import '../styles/index.css'
import { AnimatePresence } from 'framer-motion'
import { AppStateProvider } from 'shared/appState'
import { getSideNavData, allSideNavData } from 'shared/sideNav'
import { useState } from 'react'

const sideNavData = getSideNavData(allSideNavData)

function MyApp({ Component, pageProps, router }) {
  const initialNavState = Object.keys(sideNavData.indexedById).reduce((acc, key) => {
    if(!sideNavData.indexedById[key]['collapsible']) return acc
    acc[key] = false
    return acc
  },{})

  const [openItems, _updateOpenItems] = useState({...initialNavState})
  const updateOpenItems = id => {
    console.log("OPEN ITEMS", openItems);
    return _updateOpenItems({
      ...openItems,
      [id]: !openItems[id]
  })
  }
  const initialAppState = {
    isOpen: id => openItems[id],
    updateOpenItems,
    navTree: sideNavData.asNavTree,
    navIdIndex: sideNavData.indexedById,
    navLocationIndex: sideNavData.indexedByLocation
  }
  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <AppStateProvider value={{...initialAppState}}>
          
          {
            getLayout(<Component {...pageProps} test={true} key={router.route}/>)
          }
        </AppStateProvider>
      </AnimatePresence>
    </>
  )
}



export default MyApp
