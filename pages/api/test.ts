import fs from 'fs'
import path from 'path'
import multer from 'multer'
import nc from 'next-connect'

import appConfig from '../../config'
import dbConnect from '../../lib/dbConnect'
import generateUID from '../../lib/generateUID'
import Video from '../../models/Video'

const GB = 1000000000
const destination = appConfig.videosDirectory

const upload = multer({
    limits: { fileSize: GB * 10 },
    storage: multer.diskStorage({
        destination,
        filename: async (req: any, file, cb) => {
            req.id = generateUID()
            cb(null, req.id)
        },
    }),
    fileFilter: (_, file, cb) => {
        return cb(null, file.mimetype === 'video/mp4')
    }
})


const apiRoute = nc({
    onError(error, _, res: any) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
    },

    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    },
})
  
apiRoute.use(upload.single('file'))
  
apiRoute.post(async (req: any, res) => {
    // Connect to MongoDB
    await dbConnect()

    if (!req.file) return res.status(400).end('Invalid file uploaded.')
    
    const savedVideo = new Video({
        id: req.id,
        title: req.body.title,
        
    })
    
    res.status(200).json({})
})
  

export const config = {
    api: {
        bodyParser: false
    },
}

export default apiRoute