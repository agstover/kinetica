import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'

export default function Title({children}) {
    return (
        <h1 className='uppercase'>{children}</h1>
    )
}