import { useEffect } from "react"
import Button from "./Button"
import cn from 'classnames'

const logoSrc = 'https://www.designbolts.com/wp-content/uploads/2013/05/20-logo.jpg'


const MainNav = () => {
    const height = 'h-12'
    return (
        <div className={cn(height, 'flex flex-row w-full items-center pr-4')}>
            <div className='side-nav-width '>
                <img className={height} src={logoSrc} />
            </div>
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