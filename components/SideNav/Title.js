import cn from 'classnames'

export default function Title({children, className}) {
    return (
        <h1 className='uppercase mt-4 mb-1'>{children}</h1>
    )
}