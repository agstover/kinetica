import { useDropdownContext } from './context'
import PropTypes from 'prop-types'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

const Chevron = active => active ? <BsChevronDown/> : <BsChevronUp/>

export default function Toggle({children, onClick}) {
    const {onToggle, open} = useDropdownContext()    
    return (
        <div className='nav-item flex flex-row cursor-pointer' onClick={onToggle}>
            <div className='flex-grow'>
                {children}
            </div>
            <div className='flex items-center'>
                {
                    Chevron(open)
                }
            </div>
        </div>
    )
}