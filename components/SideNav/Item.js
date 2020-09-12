import Link from 'next/link'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function Item(props) {
    const {
        children, 
        location, 
        active, 
        className = '',
        as
    } = props
    const Component = as || 'a'
    return (
        <Component href={location}>
            <h1 className={cn(className, 'nav-item cursor-pointer text-gray-400',`${active ? 'text-primary' : ''}`)}>{children}</h1>
        </Component>
    )
}

Item.defaultProps = {
    secondary: false,
    active: false
}

Item.propTypes = {
    text: PropTypes.string,
    location: PropTypes.string,
    active: PropTypes.bool,
    secondary: PropTypes.bool
}

