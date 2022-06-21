import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import Loading from '../components/Loading'
import VideoThumbnail from '../components/VideoThumbnail'

const Results: NextPage = () => {
    const [results, setResults] = useState([])
    const {query} = useRouter().query

    useEffect(() => {
        async function search() {
            const {data} = await axios.get(`/api/videos/search?q=${query}`)
            if (data.results.length > 0) setResults(data.results)
        }
        if (results.length <= 0) search();
    })

    if (results.length <= 0) return <Loading/>

    return (
        <Layout>
            <div className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5'>
              <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center ">

                {results.length > 0 && <>
                  <div className='px-6 sm:px-20 md:px-10 lg:px-5 pb-2 col-span-full w-full mx-auto'>
                    <h1 className='text-3xl mb-3'>{`Search Results for ${query}`}</h1>
                    <p>{`Showing ${results.length} results`}</p>
                  </div>
                  { results.map((video: any, i: number) => <VideoThumbnail key={i} video={video}/>) }
                </>}
              </div>
            </div>
        </Layout>
    )
}

export default Results