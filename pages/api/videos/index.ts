import Redis from 'ioredis'
import nc from 'next-connect'

import Video from '../../../models/Video';
import dbConnect from '../../../lib/dbConnect';

const route = nc({
    onError(error, _, res: any) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },

    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

const handleDvd = async (req: any, res: any) => {
    const video = await Video.findOne({
        dvdNumber: req.query.d,
        episodeNumber: req.query.v
    })
    
    if (!video) return res.status(404).json({error: 'DVD not found'})
    return res.status(200).json({
        video: {
            id: video.id,
            title: video.title,
            description: video.description,
            isDvd: true,
            dvdNumber: video.dvdNumber,
            episodeNumber: video.episodeNumber,
        }
    })
}

const handleVideo = async (req: any, res: any) => {
    const video = await Video.findOne({
        id: req.query.v
    })
    
    if (!video) return res.status(404).json({error: 'Video not found'})
    return res.status(200).json({
        video: {
            id: video.id,
            title: video.title,
            description: video.description,
            isDvd: false,
            dvdNumber: video.dvdNumber,
            episodeNumber: video.episodeNumber
        }
    })
}

async function handleCustomQuery(req: any, res: any) {
    let { limit, skip } = req.query
    if (!process.env.REDIS_URL) return res.status(500).json('Redis URL not provided')
    const redis = new Redis(process.env.REDIS_URL);

    // Is documentary?
    let onlyDocumentaries = req.query.isDvd == 'false' ? true : false
    // If searching
    let filter = onlyDocumentaries ? { isDvd: false } : {}
    let total = onlyDocumentaries
        ? Number(await redis.get('totalDocumentaries'))
        : Number(await redis.get('totalVideos'))
    if (!total) {
        total = await Video.estimatedDocumentCount()
        redis.set(onlyDocumentaries ? 'totalDocumentaries' : 'totalVideos', total)
    }

    let videos = await Video.find(filter)
        .sort({ dvdNumber: 1 })
        .limit(limit ? limit : 20)
        .skip(skip != undefined ? skip : 0)
        .exec()

    res.status(200).json({
        videos,
        total
    })
}

route.get(async (req: any, res: any) => {
    await dbConnect()
    // Handle Videos
    if (req.query.v && !req.query.d) return handleVideo(req, res)
    
    // Handle DVDs    
    if (req.query.d && req.query.v) return handleDvd(req, res)

    // Handle custom query
    if (req.query.limit || req.query.skip) return handleCustomQuery(req, res)

    if (!process.env.REDIS_URL) return res.status(500).json('Redis URL not provided')
    const redis = new Redis(process.env.REDIS_URL);

    let filter: any = {}
    let results: any = []
    let cacheKey: string | null = null

    if (req.query.isDvd === 'false') {
        filter.isDvd = false
        cacheKey = 'documentaries'
    } else {
        cacheKey = 'allVideos'
    }

    let cache: string | null = await redis.get(cacheKey)
    if (cache) {
        results = JSON.parse(cache)
        res.status(200).json(results)
    }

    results = await Video.find(filter)
        .sort({ createdAt: -1 })
        .exec()

    await redis.set(cacheKey, JSON.stringify(results))
    
    if (!cache) res.status(200).json(results)
})

export default route