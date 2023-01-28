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

async function handleCustomQuery(req: any, res: any) {
    let { limit, skip } = req.query
    if (!process.env.REDIS_URL) return res.status(500).json('Redis URL not provided')
    const redis = new Redis(process.env.REDIS_URL);

    // If searching
    let total = Number(await redis.get('totalDvds'))
    if (!total) {
        total = await Playlist.estimatedDocumentCount()
        redis.set('totalDvds', total)
    }

    const playlistsQuery = await Playlist.find()
        .sort({ dvdNumber: 1 })
        .limit(limit ? limit : 20)
        .skip(skip != undefined ? skip : 0)
        .exec()
    
    let playlists: Array<any> = []

    for (let playlist of playlistsQuery) {
        let firstEpisode = (await Video.find({dvdNumber: playlist.dvdNumber})
            .sort({ episodeNumber: 1 })
            .limit(1)
            .exec())[0]
        let episodeCount = await Video.count({ dvdNumber: playlist.dvdNumber })

        playlists.push({...playlist._doc, firstEpisode, episodeCount})
    }
        

    res.status(200).json({
        playlists,
        total
    })
}

const handlePlaylist = async (req: any, res: any) => {
    const playlist = await Playlist.findOne({
        id: req.query.v
    })
    
    if (!playlist) return res.status(404).json({error: 'playlist not found'})
    return res.status(200).json({
        playlist: {
            id: playlist.id,
            title: playlist.title,
            description: playlist.description
        }
    })
}

route.get(async (req: any, res: any) => {
    // Handle Playlist Query
    if (req.query.v && !req.query.d) return handlePlaylist(req, res)

    // Handle custom query
    if (req.query.limit || req.query.skip) return handleCustomQuery(req, res)

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