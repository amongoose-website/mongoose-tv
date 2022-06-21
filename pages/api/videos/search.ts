import nc from 'next-connect'
import { MongoClient } from 'mongodb'

const { MONGO_URI } = process.env

const route = nc({
    onError(error, _, res: any) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },

    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

route.get(async (req: any, res: any) => {
    if (!MONGO_URI) return
    let { q: query } = req.query
    let results: any = []
    
    if (!query || query === 'undefined') return res.status(200).json({results})
    
    const client = new MongoClient(MONGO_URI)
    results = await client
        .db('mongooseTv')
        .collection('videos')
        .aggregate([
            {
                $search: {
                    index: "autocomplete",
                    autocomplete: {
                        query,
                        path: "title",
                        fuzzy: {
                            maxEdits: 1,
                        },
                        tokenOrder: "sequential",
                    }
                }
            },
            {
                $project: {
                    searchName: 1,
                    _id: 1,
                    id: 1,
                    title: 1,
                    dvdNumber: 1,
                    episodeNumber: 1,
                    isDvd: 1,
                    description: 1,
                    score: { $meta: "searchScore" },
                },
            },
            {
                $limit: 400,
            },
        ]).toArray()
    
    res.status(200).json({results})
})

export default route