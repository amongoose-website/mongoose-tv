import nc from 'next-connect'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

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
    await dbConnect()
    
    const query = await Dvd.find().sort({ dvdNumber: 1 }).exec()
    let dvds: Array<any> = [];

    for (let dvd of query) {
        let firstEpisode = (await Video.find({dvdNumber: dvd.dvdNumber})
            .sort({ episodeNumber: 1 })
            .limit(1)
            .exec())[0]
        let episodeCount = await Video.count({ dvdNumber: dvd.dvdNumber })

        dvds.push({...dvd._doc, firstEpisode, episodeCount});
    }

    console.log(dvds)
    res.status(200).json(dvds)
})

export default route