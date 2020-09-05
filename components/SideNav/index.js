import Item from './Item'
import Dropdown from './Dropdown'
import Title from './Title'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function SideNav({variant = 'primary', children}) {
    return (
        <div className={cn('side-nav', variant)}>
            {
                React.Children.map(children, child => React.cloneElement(child, {variant}))
            }
        </div>
    )
}

SideNav.defaultProps = {
    variant: 'primary'
}

SideNav.propTypes = {
    variant: PropTypes.string
}

SideNav.Item = Item
SideNav.Dropdown = Dropdown
SideNav.Title = Title