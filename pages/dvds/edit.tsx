import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import DvdEdit from '../../components/DvdEdit'

const Edit = () => {
    const [dvd, setDvd] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        async function getDvd() {
            const { data } = await axios(`/api/dvds`, { params: router.query })
            setDvd(data.dvd)
        }
        if (!dvd && router.isReady) getDvd()
    })
    
    if (!dvd) return <Loading/>

    return (
        <Layout pageTitle={`Edit Dvd, ${dvd.title}`}>
            <div className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5 p-5'>
                <DvdEdit dvd={dvd}/>
            </div>
        </Layout>
    )
}

export default Edit
