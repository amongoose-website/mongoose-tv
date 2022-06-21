import fs from 'fs'
import path from 'path'

import appConfig from '../../../config'

const CHUNK_SIZE_IN_BYTES = 1000000
const VIDEOS_DIRECTORY = appConfig.videosDirectory

export default function handler(req: any, res: any) {
  let range = req.headers.range
  if (range == 'bytes=0-1') {
    range = 'bytes=0='
  }

  if (!range) return res.status(400).end('Range must be provided')

  const videoId = req.query.v
  const videoPath = path.join(VIDEOS_DIRECTORY, videoId)

  if (!fs.existsSync(videoPath)) return res.status(404)
  const videoSizeInBytes = fs.statSync(videoPath).size

  const chunkStart = Number(range.replace(/\D/g, ''))
  // Limit video to end of video file
  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    videoSizeInBytes - 1
  )

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
