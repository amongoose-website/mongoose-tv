const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mongoose = require('mongoose');

require('dotenv').config({
    path: path.join(__dirname, '../.env.local')
})

const Dvd = require('./lib/Dvd');
const thumbler = require('../lib/thumbler');
const DvdModel = require('./lib/DvdModel');
const VideoModel = require('./lib/VideoModel');

const originalDvds = '/media/webadmin/media/the-choice/';
const videosLocation = '/media/webadmin/media/videos/';
const thumbnailsLocation = '/media/webadmin/media/thumbnails/';

let total = 0;
let progress = 0;

function createThumbnail(original, neue) {
    return new Promise((res, rej) => {
        thumbler.extract(original, neue, '00:00:20', '320x180', err => {
            if (err) return rej(err);
            res(neue);
        });
    })
}

function copyFile(original, neue) {
    return new Promise((res, _) => {
        fs.copyFile(original, neue, () => {
            res();
        });
    })
}

async function saveEpisode(episode) {
    return new Promise(async (res, _) => {
        if (await VideoModel.exists({
            episodeNumber: episode.episodeNumber,
            dvdNumber: episode.dvdNumber
        })) {
            console.log(`Skipping E${episode.episodeNumber}/D${episode.dvdNumber}, Progress: ${chalk.blue(Math.round(progress/total * 100))}%`);
            return res(true);
        }
        console.log(`Loading E${episode.episodeNumber}/D${episode.dvdNumber}, Progress: ${chalk.blue(Math.round(progress/total * 100))}%`)

        // Copy file
        let videoPath = videosLocation + episode.id;
        await copyFile(episode.path, videoPath);

        let thumbPath = `${thumbnailsLocation}${episode.id}.png`;
        await createThumbnail(videoPath, thumbPath);

        let newVideo = new VideoModel({
            ...episode,
            filename: episode.id,
            originalFileName: episode.filename,
            path: videoPath
        });

        await newVideo.save();

        res(newVideo);
    })
}

async function saveDvds() {
    // Initialise DB
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xdz53.mongodb.net/mongooseTv?retryWrites=true&w=majority`);

    const dvds = Dvd.fetchAll(originalDvds);
    total = dvds.map(dvd => dvd.episodes.length)
        .reduce(function(a, b) { return a + b; }, 0);


    dvds.forEach(async dvd => {
        let savedDvd = await DvdModel.findOne({dvdNumber: dvd.dvdNumber});
        if (!savedDvd) {
            savedDvd = new DvdModel({
                ...dvd
            });
            await savedDvd.save();
        }

        dvd.episodes.forEach(async episode => {
            await saveEpisode(episode);
            progress++;
            if(progress === total) {
                console.log('Complete');
            }
            return;
        });
    });
}

saveDvds();
