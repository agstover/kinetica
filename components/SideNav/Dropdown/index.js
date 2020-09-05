import cn from 'classnames'
import PropTypes from 'prop-types'
import Toggle from './Toggle'
import Content from './Content'
import { useState } from 'react'

import { noop } from '../../../lib/utils'
import { DropdownContext } from './context'

export default function Dropdown({collapsible, managed, active, children}) {
    const [_active, _setActive] = useState(active === false)
    const getActive = () => {
        if(!collapsible) return true
        return managed === true ? active : _active
    }
    const setActive = ({value}) => {
        if(!collapsible) return noop
        if(managed !== true) return _setActive(value)
    }
    return (
        <DropdownContext.Provider value={{collapsible, getActive, setActive}}>
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