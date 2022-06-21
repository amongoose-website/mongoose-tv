import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import VideoEdit from '../../components/VideoEdit'

const Edit = () => {
    const [video, setVideo] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        async function getVideo() {
            const { data } = await axios(`/api/videos`, { params: router.query })
            setVideo(data.video)
        }
        if (!video && router.isReady) getVideo()
    })
    
    if (!video) return <Loading/>

    return (
        <Layout pageTitle={`Edit Video, ${video.title}`}>
            <div className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5 p-5'>
                <VideoEdit video={video}/>
            </div>
        </Layout>
    )
}

export default Edit
