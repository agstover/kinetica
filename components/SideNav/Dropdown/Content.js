import { useDropdownContext } from "./context"
import { Children } from "react"

export default function Content({children}) {
    const { getActive } = useDropdownContext()
    return (
        <div className='pl-4'>
            {
                !getActive()
                ? null
                : children
            }
        </div>
    )
}