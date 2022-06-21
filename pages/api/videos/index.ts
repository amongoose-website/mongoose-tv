import fs from 'fs'
import path from 'path'

import appConfig from '../../../config'

const VIDEOS_DIRECTORY = appConfig.videosDirectory

export default function handler(req: any, res: any) {
  let range = req.headers.range

  if (!range) return res.status(400).end('Range must be provided')

  const videoId = req.query.v
  const videoPath = path.join(VIDEOS_DIRECTORY, videoId)

  if (!fs.existsSync(videoPath)) return res.status(404)
  const videoSizeInBytes = fs.statSync(videoPath).size

  const parts = range.replace(/bytes=/, "").split("-");
  const chunkStart = parseInt(parts[0], 10);
  const chunkEnd = parts[1]
      ? parseInt(parts[1], 10)
      : videoSizeInBytes-1;

  const contentLength = chunkEnd - chunkStart + 1

  const headers = {
    'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4'
  }

  res.writeHead(206, headers)
  const videoStream = fs.createReadStream(videoPath, {
    start: chunkStart,
    end: chunkEnd
  })

  videoStream.pipe(res)
}
