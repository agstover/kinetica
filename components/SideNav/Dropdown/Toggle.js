import { useDropdownContext } from './context'
import PropTypes from 'prop-types'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

const Chevron = active => active ? <BsChevronDown/> : <BsChevronUp/>

export default function Toggle({children, onClick}) {
    const ctx = useDropdownContext()
    const onClickHandler = (onClick, ctx) => e => {
        console.log("ACTIVE", ctx.getActive());
        if(onClick !== undefined) onClick(e)
        ctx.setActive(!ctx.getActive())
    }
    
    return (
        <div className='nav-item flex flex-row cursor-pointer' onClick={onClickHandler(onClick,ctx)}>
            <div className='flex-grow'>
                {children}
            </div>
            <div className='flex items-center'>
                {
                    ctx.collapsible ? Chevron(ctx.getActive()) : null
                }
            </div>
        </div>
    )
}