import { useEffect } from "react"
import Button from "./Button"
import cn from 'classnames'
import Link from 'next/link'



const MainNav = () => {

    return (
        <div className='flex flex-row items-center px-4 py-8'>
            <div className={'flex-grow'}>
                <h1>Search</h1>
            </div>
            <div>
                <Button>Sign In</Button>
            </div>
        </div>
    )
}

export default MainNav