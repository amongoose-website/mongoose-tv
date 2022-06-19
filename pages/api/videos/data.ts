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
    await dbConnect()
    const video = await Video.findOne({
        dvdNumber: req.query.d,
        episodeNumber: req.query.e
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
    await dbConnect()
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
            episodeNumber: video.episodeNumber,
        }
    })
}

route.get((req: any, res: any) => {
   // Handle Videos
    if (req.query.v) return handleVideo(req, res)
    
    // Handle DVDs    
    if (req.query.d && req.query.e) return handleDvd(req, res)
})

export default route