import cn from 'classnames'
import markdownStyles from 'styles/markdown.module.css'

export default function Post({title, children}) {
    return (
        <div className=''>
            <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left'>{title}</h1>
            <div className={markdownStyles['markdown']}>
                {
                    children
                }
            </div>
        </div>
    )
}