
const fs = require('fs')
const path = require('path')

const Video = require('./Video');

const generateUID = require('./generateUID');
const subdirPath = (location, subdir) => path.join(location, subdir);

class Playlist {
    constructor(data = {}) {
        this.videos = data.videos || [];
        this.title = data.title;
        this.path = data.path;
        this.id = generateUID();
        this.tags = ['documentaries'];
    }

    static loadPlaylist(location, name) {
        let videos = fs.readdirSync(location)
            .filter(file => path.extname(file).toLowerCase() === '.mp4')
            .map(file => Video.loadVideo(location, file));
        
        let title = name
            .trim()
            .replace(/_/g, ' ');

        return new Playlist({
            videos,
            title,
            path: path.join(location)
        });
    }

    static loadPlaylists(location) {
        // Return empty array for missing location
        if (!fs.existsSync(location)) return [];

        let dir = fs.readdirSync(location)
            .filter(subdir => fs.lstatSync(subdirPath(location, subdir)).isDirectory());
        
        return dir.map(subdir => {
            return Playlist.loadPlaylist(subdirPath(location, subdir), subdir);
        });
    }

    static findDvd(id, dvds = []) {
        if (dvds.length < 1) dvds = Playlist.fetchAll();

        return dvds.find(dvd => dvd.id === id);
    }
}

module.exports = Playlist;