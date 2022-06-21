import axios from 'axios'
import { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import Loading from '../components/Loading'
import VideoThumbnail, { DvdThumbnail } from '../components/VideoThumbnail'

const Home = () => {
  const [data, setData] = useState<any>(null)
  
  useEffect(() => {
    const getVideos = async () => {
      const { data } = await axios.get('/api/videos/all')
      setData(data)
    }
    if (!data) getVideos();
  })

  if (!data) return <Loading/>

  return (
    <Layout>
      <div className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5'>
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center ">
          
          {data.documentaries.length > 0 && <>
            <h1 className='px-6 sm:px-20 md:px-10 lg:px-5 text-3xl pb-2 col-span-full w-full mx-auto'>All Documentaries</h1>
            { data.documentaries.map((video: any, i: number) => <VideoThumbnail key={i} video={video}/>) }
          </>}
          
          <h1 className='px-6 sm:px-20 md:px-10 lg:px-5 text-3xl pb-2 col-span-full w-full mx-auto'>All DVDs</h1>
          
          {data.dvds.length > 0 && <>
            {data.dvds.map((dvd: any, i: number) => <DvdThumbnail key={i} dvd={dvd}/>)}
          </>}
        </div>
      </div>
    </Layout>
  )
}

export default Home
