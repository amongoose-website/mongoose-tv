import axios from 'axios'
import { useEffect, useState } from 'react'

import appConfig from '../config'
import Layout from '../components/Layout'
import Image from 'next/image'

const Home = () => {
  let loaded = false
  const [videos, setVideos] = useState([])
  
  useEffect(() => {
    const getVideos = async () => {
      const { data } = await axios.get('/api/videos/data')
      loaded = true
      setVideos(data)
    }
    if (!loaded) getVideos();
  })

  return (
    <Layout>
      <div className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5'>
        <div className="ml-4">
          <h1 className='text-3xl pb-2'>All Videos</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {videos.length > 0 && <>
              { videos.map((video, i) => { 
                return (
                <div key={i}>
                  <div className="max-w-sm inline-block">
                    <a className='w-full' href={`/watch?v=${video.id}`}>
                      <div style={{width: '320px', height: '180px'}}>
                        <Image 
                          width='320'
                          height='180'
                          src={`/thumbnails/${video.id}.png`} 
                          alt="" />
                      </div>
                    </a>
                    <div className="py-2">
                      <a href={`/watch?v=${video.id}`}>
                        <div className='bg-zinc-200 dark:bg-zinc-700 w-min px-2.5 py-0.5 rounded text-xs my-1'>
                          <span className=' whitespace-nowrap'>DVD • {video.dvdNumber}</span>
                          <span className=' whitespace-nowrap ml-3'>Episode • {video.episodeNumber}</span>
                        </div>
                        <h5 className="text-base font-medium tracking-tight text-zinc-900 dark:text-white">
                          {video.title}
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              )}) }
            </>}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
