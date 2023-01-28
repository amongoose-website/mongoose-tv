import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import PlaylistEdit from '../../components/PlaylistEdit'

const Edit = () => {
    const [playlist, setPlaylist] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        async function getDvd() {
            const { data } = await axios(`/api/playlists`, { params: router.query })
            setPlaylist(data.playlist)
        }
        if (!playlist && router.isReady) getDvd()
    })
    
    if (!playlist) return <Loading/>

    return (
        <Layout pageTitle={`Edit Playlist, ${playlist.title}`}>
            <div className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5 p-5'>
                <PlaylistEdit playlist={playlist}/>
            </div>
        </Layout>
    )
}

export default Edit
