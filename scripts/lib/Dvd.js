
const fs = require('fs')
const path = require('path')

const Episode = require('./Episode');

const generateUID = require('./generateUID');
const subdirPath = (location, subdir) => path.join(location, subdir);
const dvdsLocation = path.join(__dirname, '../../sample');


class Dvd {
    constructor(data = {}) {
        if (!data.dvdNumber) throw new Error('DVD id not provided');
        this.dvdNumber = data.dvdNumber;
        this.episodes = data.episodes || [];
        this.title = data.title;
        this.path = data.path;
        this.id = generateUID();
    }

    findVideo(id) {
        return this.episodes.find(video => video.episodeNumber === id);
    }

    static loadDvd(location, name) {
        const split = name.split('-');
        const dvdNumber = split[0].trim()
        let episodes = fs.readdirSync(location)
            .filter(file => path.extname(file).toLowerCase() === '.mp4')
            .map(file => Episode.loadVideo(location, file, dvdNumber));
        let title = split.slice(1)
            .join(' - ')
            .trim()
            .replace(/_/g, ' ');

        return new Dvd({
            dvdNumber,
            episodes,
            title,
            path: path.join(location)
        });
    }

    static loadDvds(location) {
        // Return empty array for missing location
        if (!fs.existsSync(location)) return [];

        let dir = fs.readdirSync(location)
            .filter(subdir => fs.lstatSync(subdirPath(location, subdir)).isDirectory());
        
        return dir.map(subdir => {
            return Dvd.loadDvd(subdirPath(location, subdir), subdir);
        });
    }

    static fetchAll() {
        return Dvd.loadDvds(dvdsLocation)
    }

    static findDvd(id, dvds = []) {
        if (dvds.length < 1) dvds = Dvd.fetchAll();

        return dvds.find(dvd => dvd.id === id);
    }
}

module.exports = Dvd;