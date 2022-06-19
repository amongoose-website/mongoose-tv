const fs = require('fs')
const path = require('path')

const generateUID = require('./generateUID');

class Episode {
    constructor(data = {}) {
        if (!data.episodeNumber) throw new Error('Video id not provided');
        this.episodeNumber = data.episodeNumber;
        this.dvdNumber = data.dvdNumber;
        this.isDvd = true;
        this.title = data.title;
        this.description = ''
        this.filename = data.filename;
        this.path = data.path;
        this.size = data.size;
        this.id = generateUID()
    }

    stream(req, res) {
        const videoPath = req.video.path;
        const fileSize = req.video.size;
        const videoRange = req.headers.range;
        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize-1;
            const chunksize = (end-start) + 1;
            const file = fs.createReadStream(videoPath, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    }

    static loadVideo(location, filename, dvdNumber) {
        const split = filename.split('-');
        let filePath = path.join(location, filename);
        let { size } = fs.statSync(filePath);
        let title = split.slice(2)
            .map(i => i.trim())
            .join(' — ')
            .replace(/_/g, ' ')
            .split('.');
        title.pop();
        title = title.join('');
        
        return new Episode({
            episodeNumber: split[1].trim(),
            dvdNumber,
            title,
            filename,
            path: filePath,
            size
        });
    }
}
module.exports = Episode