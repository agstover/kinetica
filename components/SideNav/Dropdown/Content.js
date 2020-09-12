import { useDropdownContext } from "./context"

export default function Content({children}) {
    const { open } = useDropdownContext()
    return (
        <div className='pl-4'>
            {
                !open
                ? null
                : children
            }
        </div>
    )
}