import axios from 'axios'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'

import Layout from '../components/Layout'
import NotFound from '../components/NotFound'
import VideoPlayer from '../components/VideoPlayer'

const WatchPage = ({ query }: { query: any }) => {
    if (!query.v && (!query.d || !query.e)) return <NotFound/>

    // Check video exists
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [video, setVideo] = useState<any>({})
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loaded, setLoaded] = useState(false)
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const getVideo = async () => {
            const { data } = await axios.get('/api/videos/data', {params: query})

            if (data.video && Object.keys(video).length <= 0) {
                setVideo(data.video)
            }
            
            if (!loaded) setLoaded(true)
        }
        getVideo()
    })

    return (
        <Layout pageTitle={video.title}>
            <div className="container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white">
                <div className='flex flex-col bg-black items-center rounded-t'>
                    {loaded && 
                        <>
                            {Object.keys(video).length > 0 && <VideoPlayer id={video.id}/>}
                            {Object.keys(video).length <= 0 && <NotFound/>}
                        </>
                    }
                </div>
                <div className='px-4 pb-20 mt-3'>
                    <h1 className='text-xl font-medium mb-2'>{video.title}</h1>
                    <p className='text-sm font-base'>{video.description}</p>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {query: context.query}
    }
}

export default WatchPage