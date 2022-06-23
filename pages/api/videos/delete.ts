import fs from 'fs'
import path from 'path'
import nc from 'next-connect'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

import appConfig from '../../../config'
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

route.post(withApiAuthRequired(async (req: any, res: any) => {
    if (!req.body || !req.body?.id) return res.status(400).json({message: 'No body data provided'})

    const { id } = req.body

    await dbConnect()

    // Delete video
    await Video.findOneAndDelete({id})
    
    let filePath = path.join(appConfig.videosDirectory, id)
    let thumbnailPath = path.join(appConfig.thumbnailsDirectory, `${id}.png`)
    fs.rmSync(filePath)
    fs.rmSync(thumbnailPath)

    res.status(200).json({message: `Successfully deleted video, ${id}`})
}))

export default route