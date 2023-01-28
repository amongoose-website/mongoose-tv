import axios from 'axios'
import { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import Loading from '../components/Loading'
import { DvdThumbnail, PlaylistThumbnail } from '../components/VideoThumbnail'

const Home = () => {
  const [playlists, setPlaylists] = useState<any>([])
  const [dvds, setDvds] = useState<any>([])
  
  useEffect(() => {
    const getVideos = async () => {
      const dvdsResults = await axios.get('/api/dvds')
      const documentariesResults = await axios.get('/api/playlists')
      setPlaylists(documentariesResults.data)
      setDvds(dvdsResults.data)
    }
    if (dvds.length < 1) getVideos();
  })

  if (playlists.length < 1 && dvds.length < 1) return <Loading/>

  return (
    <Layout>
      <div className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5'>
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center ">
          
          {playlists.length > 0 && <>
            <h1 className="px-6 sm:px-20 md:px-10 lg:px-5 text-3xl pb-2 col-span-full w-full mx-auto">All Documentaries</h1>
            { playlists.map((playlist: any, i: number) => {
              <PlaylistThumbnail key={i} playlist={playlist}/>
            }) }
          </>}
          
          
          {dvds.length > 0 && <>
            <h1 className='px-6 sm:px-20 md:px-10 lg:px-5 text-3xl pb-2 col-span-full w-full mx-auto'>All DVDs</h1>
            {dvds.map((dvd: any, i: number) => <DvdThumbnail key={i} dvd={dvd}/>)}
          </>}
        </div>
      </div>
    </Layout>
  )
}

export default Home
