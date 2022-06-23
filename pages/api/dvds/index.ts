import Redis from 'ioredis'
import nc from 'next-connect'

import Dvd from '../../../models/Dvd'
import Video from '../../../models/Video'
import dbConnect from '../../../lib/dbConnect'

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
    let cache: string | null = await redis.get('allDvds')

    if (cache) {
        cache = JSON.parse(cache)
        res.status(200).json(cache)
    }

    await dbConnect()
    
    // const documentaries = await Video.find({ isDvd: false })
    const dvdsQuery = await Dvd.find()
        .sort({ dvdNumber: 1 })
        .exec()
    let result: Array<any> = []

    for (let dvd of dvdsQuery) {
        let firstEpisode = (await Video.find({dvdNumber: dvd.dvdNumber})
            .sort({ episodeNumber: 1 })
            .limit(1)
            .exec())[0]
        let episodeCount = await Video.count({ dvdNumber: dvd.dvdNumber })

        result.push({...dvd._doc, firstEpisode, episodeCount})
    }

    redis.set('allDvds', JSON.stringify(result))
    if (!cache) return res.status(200).json(result)
})

export default route