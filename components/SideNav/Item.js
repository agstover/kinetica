import Link from 'next/link'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default function Item({text, location, active, secondary}) {
    return (
        <a href={location}>
            <h1 className={cn('nav-item',`${active ? 'active': ''}`)}>{text}</h1>
        </a>
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

