import axios from 'axios'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'

import Layout from '../components/Layout'
import NotFound from '../components/NotFound'
import VideoPlayer from '../components/VideoPlayer'
import { ListThumbnail } from '../components/VideoThumbnail'

const WatchPage = ({ query }: { query: any }) => {
    const [list, setList] = useState<any>(null)
    const [video, setVideo] = useState<any>({})
    const [loaded, setLoaded] = useState(false)
    let index = Number(query.index) || 0

    if (!query.v && !query.d) return <NotFound/>
    // Check video exists
    const { list: listId, dvdList } = query

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const getVideo = async () => {
            const { data } = await axios.get('/api/videos', {params: query})
            if (data.video && Object.keys(video).length <= 0) {
                setVideo(data.video)
            }
            
            if (!loaded) setLoaded(true)
        }
        const getList = async () => {
            const { data } = await axios.get('/api/videos', {params: query})
            console.log(data)
            if (data.videos.length && data.videos.length > 0) {
                if(index +1 >= data.videos.length || index + 1 <= 0) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    index = 0
                }
                setVideo(data.videos[index])
                setList(data)
            }
            if (!loaded) setLoaded(true)
        }
        if (!loaded) listId || dvdList ? getList() : getVideo()

    })

    return (
        <Layout pageTitle={video.title}>
            <div className="container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white">
                <div className='flex flex-col bg-black items-center'>
                    {loaded && 
                        <>
                            {Object.keys(video).length > 0 && <VideoPlayer id={video.id}/>}
                            {Object.keys(video).length <= 0 && <NotFound/>}
                        </>
                    }
                </div>
                <div className='px-4 pb-20 mt-3'>
                    { video.isDvd &&
				    <div className='bg-zinc-200 dark:bg-zinc-700 w-min px-2.5 py-0.5 rounded text-xs my-1'>
					    <span className=' whitespace-nowrap'>DVD • {video.dvdNumber}</span>
					    <span className=' whitespace-nowrap ml-3'>Episode • {video.episodeNumber}</span>
				    </div>
				    }
                    <h1 className='text-xl font-medium mb-2'>{video.title}</h1>
                    <p className='text-sm font-base'>{video.description}</p>

                    { list && 
                        <div className='flex flex-col w-full mt-10 border md:w-1/2 max-h-96'>
                            <h1 className='text-lg mt-2 mb-5 mx-4'>{`Playlist - ${list.title}`}</h1>
                            {list?.videos?.length > 0 && <div className='bg-zinc-50 overflow-scroll overscroll-contain'>
                                { list?.videos?.map((video: any, i: number) => <ListThumbnail key={i} index={i} video={video} listId={list.id} isCurrent={index === i}/>) }
                            </div>}
                        </div>
                    }
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