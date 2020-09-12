import dashify from 'dashify'

import main from './main'
import hvac from './hvac.json'

/* START: Tools for creating the side nav. Hopefully onece _app can use, getstaticprops() we can dispense with hardcoding primary side nav data */
export const allSideNavData = [
    ...main,
    {
        title: 'Learn',
        collapsible: true,
        items: [
            hvac
        ]
    }
]

const addIds = data => {
    const _addIds = (data, parentId = '') => {
        
        return data.reduce((acc, datum) => {
            let datumId = `${parentId.length > 0 ? parentId + '.' : parentId}${dashify(datum.title)}`
            let newDatum = {
                ...datum, 
                id: datumId

            }
            if(Array.isArray(datum.items)) {
                newDatum.items = _addIds(datum.items, datumId)
            }
            acc.push(newDatum)
            return acc
        },[])
    }
    const result = _addIds(data)
    return result
}

// Utility function for indexing the data tree by arbitrary index (id, path, etc)
const indexBy = ({index, data}) => {
    const createIndex = (acc = {}, data) => data.reduce((acc, datum) => {
        if(datum[index]) acc[datum[index]] = datum
        if(Array.isArray(datum.items)) return createIndex(acc, datum.items)
        return acc
    }, acc)
    return createIndex({}, data)
}

export const getSideNavData = navData => (function(){
    let data = addIds(navData)
    const indexedByLocation = data => indexBy({data, index: 'location'})

    const indexedById = data => indexBy({data, index: 'id'})

    return {
        asNavTree: data,
        indexedByLocation: indexedByLocation(data),
        indexedById: indexedById(data)
    }
}())
/* END: Side Nav Tools */

export const getSideNavMotionVariants = () => {
    let easing = [0.175, 0.85, 0.42, 0.96]

    return {
    exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easing
      }
    }
}

}
