import nc from 'next-connect'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

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

route.post(withApiAuthRequired(async (req: any, res: any) => {
    if (!req.body || !req.body?.id) return res.status(400).json({message: 'No body data provided'})

    const neue = await Video.findOneAndUpdate({id: req.body.id}, req.body)
    res.status(200).json(neue)
}))

export default route