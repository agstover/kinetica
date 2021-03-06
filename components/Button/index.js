import NextLink from 'next/link'
import cn from 'classnames'
import { noop } from 'lib/utils'

const Link = ({href, children, className, disabled}) => (<a href={href} className={className}>{children}</a>)

const _button = ({children, onClick, className}) => (
    <button onClick={onClick} className={className}>{children}</button>
)

export default function Button({className, variant, disabled, children, href, ...props}) {
    const El = href ? Link : _button
    return (
        <El href={href} {...props} 
            className={cn({
                classname: true, 
                btn: true, 
                [`btn-${variant}`]: true, 
                'btn-disabled': disabled
            })
        }>
            {children}
        </El>
    )
}

Button.defaultProps = {
    variant: 'primary',
    href: null,
    className: '',
    disabled: false,
    onClick: noop
}

