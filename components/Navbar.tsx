import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'

import Icon from './Icon'
import useSiteMetadata from './SiteMetadata'

const uppercase = (old?: string | null) => {
    return old?.split(' ').map(x => {
        return x.charAt(0).toUpperCase() + x.substring(1)
    }).join(' ')
}


function MenuLink({href, text, children, type}: {href: string, text?: string, children?: any, type?: string}) {
    const router = useRouter()
    if (!type) type = 'link'

    return (
        <>
            {
                type === 'link' && <>
                    <Link href={href}>
                        <li className={router.pathname == href ? 'cursor-pointer block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-black dark:md:text-white md:p-0 dark:text-white' : 'block py-2 pr-4 pl-3 text-zinc-700 border-b border-zinc-100 hover:bg-zinc-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 cursor-pointer'}>
                            {children ? children : text}
                        </li>
                    </Link>
                </>
            }
            {
                type === 'a' && <>
                    <a href={href}>
                        <li className={router.pathname == href ? 'cursor-pointer block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-black dark:md:text-white md:p-0 dark:text-white' : 'block py-2 pr-4 pl-3 text-zinc-700 border-b border-zinc-100 hover:bg-zinc-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-zinc-700 cursor-pointer'}>
                            {children ? children : text}
                        </li>
                    </a>
                </>
            }
        </>
        
    )
}

const USER_MENU = [
    {text: 'Upload', href: '/upload', icon: 'file_upload', type: 'link'},
    {text: 'Logout', href: '/api/auth/logout', icon: 'logout', type: 'a'},
]

const Navbar = () => {
    const [menuHidden, setMenuHidden] = useState(true)
    const [userMenu, setUserMenu] = useState(false)
    const siteMetadata = useSiteMetadata()
    
    const { user } = useUser()
    
    return (
        <nav className="bg-white border-zinc-200 my-2 px-2 sm:px-4 py-3 rounded dark:bg-zinc-800 container mx-auto">
            <div className="container flex md:gap-10 flex-wrap justify-between items-center mx-auto">
                <a href={`/`} className="flex items-center dark:text-white flex-grow-0">
                    <div className='flex items-center text-red-600'>
                        <Icon name='smart_display'/>
                    </div>
                    <span className="mx-2 self-center text-xl font-medium whitespace-nowrap oswald uppercase">{siteMetadata.title}</span>
                </a>
                <div className="flex flex-grow justify-end">
                    <div className="hidden relative md:block w-full mx-20">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-zinc-500" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="search-navbar"
                            className="block p-2 pl-10 w-full text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."/>
                    </div>
                    <button type="button" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3"
                        aria-expanded="false"
                        className="md:hidden text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:outline-none focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 rounded-lg text-sm p-2.5 mr-1"
                        onClick={() => setMenuHidden(!menuHidden)}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <button data-collapse-toggle="mobile-menu-3" type="button"
                        className="inline-flex items-center p-2 text-sm text-zinc-500 rounded-lg md:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600"
                        aria-controls="mobile-menu-3" aria-expanded="false"
                        onClick={() => setMenuHidden(!menuHidden)}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className={`${menuHidden ? 'hidden' : ''} justify-between items-center w-full md:flex md:w-auto md:order-1`} id="mobile-menu-3">
                    <div className="relative mt-3 md:hidden">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-zinc-500" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="search-navbar"
                            className="block p-2 pl-10 w-full text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."/>
                    </div>
                    <ul className="flex flex-col items-center gap-2 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        {/* <MenuLink href='/upload' text='Upload'/> */}
                        {user && <>
                            <div className='md:hidden'>
                                { USER_MENU.map((menuItem, i) => {
                                    return <MenuLink type={menuItem.type} key={i} text={menuItem.text} href={menuItem.href}/>
                                })}
                            </div>
                            <div className={`${userMenu ? 'md:visible' : ''} flex flex-col invisible absolute px-5 right-28 top-0 z-10 bg-white w-72 py-5 border-solid border-zinc-200 border`}>
                                <ul>
                                    <div className='flex flex-row items-center border-b pb-4 mb-4'>
                                        {
                                            user.picture && <Image className='rounded-full' src={user.picture} width={50} height={50} alt='avatar'/>
                                        }
                                        <div className='ml-5'>
                                            <span className='text-lg whitespace-pre-wrap'>{uppercase(user?.nickname)}</span>
                                        </div>
                                    </div>
                                    { USER_MENU.map((menuItem, i) => {
                                        return <MenuLink key={i} href={menuItem.href} type={menuItem.type}>
                                            <div className="flex flex-row items-center mb-2" onClick={() => setUserMenu(false)}>
                                                <Icon name={menuItem.icon} className='mr-2'/>
                                                <span>{menuItem.text}</span>
                                            </div>
                                        </MenuLink>
                                    })}
                                </ul>
                            </div>
                            {user.picture &&
                                <button onClick={() => setUserMenu(!userMenu)}>
                                    <Image className='rounded-full' src={user.picture} width={40} height={40} alt='avatar'/>
                                </button>
                            }
                        </>}
                        {!user &&
                            <MenuLink href={'/api/auth/login'}>
                                <button className='border-blue-500 border-solid border-2 text-blue-500 px-4 py-2 rounded'>
                                    LOGIN
                                </button>
                            </MenuLink>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar