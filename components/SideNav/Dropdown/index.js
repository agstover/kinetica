import cn from 'classnames'
import PropTypes from 'prop-types'
import Toggle from './Toggle'
import Content from './Content'
import { useState } from 'react'

import { DropdownContext } from './context'

export default function Dropdown({children}) {
    const [open, toggle] = useState(false)
    const onToggle = e => {
        e.preventDefault()
        toggle(!open)
    }
    const context = {
        onToggle,
        open
    }
    return (
        <DropdownContext.Provider value={context}>
            <div>
                {
                    children
                }
            </div>
        </DropdownContext.Provider>
    )
}

Dropdown.Toggle = Toggle
Dropdown.Content = Content

// export default function Dropdown({collapsible, managed, active, children}) {
//     const [_active, _setActive] = useState(active === false)
//     const isActive = () => {
//         console.log("ACTIVE?", _active);
//         if(!collapsible) return true
//         return managed === true ? active : _active
//     }
//     const setActive = (value) => {
//         if(!collapsible) return noop
//         if(managed !== true) return _setActive(value)
//     }
//     return (
//         <DropdownContext.Provider value={{collapsible, isActive, setActive}}>
//             <div>
//                 {
//                     children
//                 }
//             </div>
//         </DropdownContext.Provider>
//     )
// }

Dropdown.Toggle = Toggle
Dropdown.Content = Content

Dropdown.propTypes = {
    collapsible: PropTypes.bool,
    managed: PropTypes.bool,
    active: PropTypes.bool
}

Dropdown.defaultProps = {
    managed: false,
    onClick: false,
    collapsible: false,
    active: false
}