import Redis from 'ioredis'
import nc from 'next-connect'

import Video from '../../../models/Video'
import dbConnect from '../../../lib/dbConnect'
import Playlist from '../../../models/Playlist'

const route = nc({
    onError(error, _, res: any) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
    },

    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    },
})

route.get(async (req: any, res: any) => {
    if (!process.env.REDIS_URL) return res.status(500).json('Redis URL not provided')
    const redis = new Redis(process.env.REDIS_URL)
    let cache: string | null = await redis.get('allPlaylists')

    if (cache) {
        cache = JSON.parse(cache)
        res.status(200).json(cache)
    }

    await dbConnect()
    
    // const documentaries = await Video.find({ isDvd: false })
    const playlistsQuery = await Playlist.find()
        .sort({ createdAt: 1 })
        .exec()
    let result: Array<any> = []

    for (let playlist of playlistsQuery) {
        let firstEpisodeSearch = playlist.videos.filter((video: any) => video.index == [0])
        let firstEpisode = (await Video.find({id: firstEpisodeSearch[0].id})
            .sort({ episodeNumber: 1 })
            .limit(1)
            .exec())[0]

        result.push({...playlist._doc, firstEpisode, episodeCount: playlist.videos.length})
    }

    redis.set('allPlaylists', JSON.stringify(result))
    if (!cache) return res.status(200).json(result)
})

export default route