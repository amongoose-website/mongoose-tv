const fs = require('fs')
const path = require('path')

const generateUID = require('./generateUID');

class Video {
    constructor(data = {}) {
        this.index = data.index
        this.isDvd = false;
        this.title = data.title;
        this.description = ''
        this.filename = data.filename;
        this.path = data.path;
        this.size = data.size;
        this.id = generateUID()
    }

    static loadVideo(location, filename) {
        const split = filename.split('-');
        let filePath = path.join(location, filename);
        let { size } = fs.statSync(filePath);
        let reducedFileName = split.slice(1)
            .map(i => i.trim())
            .join(' — ')
            .replace(/_/g, ' ')
        
        let title = path.parse(reducedFileName).name

        return new Video({
            createdAt: split[1].trim(),
            index: Number(split[0]),
            title,
            filename,
            path: filePath,
            size
        });
    }
}
module.exports = Video