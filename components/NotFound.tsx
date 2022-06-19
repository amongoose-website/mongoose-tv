import Image from 'next/image'
import Link from 'next/link'

import Layout from './Layout'

import notFoundImage from '../public/not-found.png'

const NotFound = () => {
    return (
        <div className='container mx-auto flex flex-col items-center py-20 dark:text-white rounded my-3'>
            <Image
                src={notFoundImage}
                alt={'404 Video Not Found'}
                width={278}
                height={160}
                layout='fixed'/>
            <h1 className='text-center text-2xl mb-5'>This video isn&#39;t available anymore</h1>
            <Link href='/'>
                <button className='border-blue-600 border-solid border-2 rounded py-1.5 px-4 text-blue-600'>GO TO HOME</button>
            </Link>
        </div>
    )
}

export default NotFound