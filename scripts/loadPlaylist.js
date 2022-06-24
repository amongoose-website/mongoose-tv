const fs = require('fs');
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const mongoose = require('mongoose');

require('dotenv').config({
    path: path.join(__dirname, '../.env.local')
})

const Video = require('./lib/Video');
const Playlist = require('./lib/Playlist');
const thumbler = require('../lib/thumbler');
const PlaylistModel = require('./lib/PlaylistModel');
const VideoModel = require('./lib/VideoModel');

const originalVideos = '/home/webadmin/playlists';
const videosLocation = '/media/webadmin/media/videos/';
const thumbnailsLocation = '/media/webadmin/media/thumbnails/';

let total = 0;
let progress = 0;

const spinner = ora(`Progress: ${chalk.blue('0%')}`).start();

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

async function saveVideo(video) {
    return new Promise(async (res, _) => {
        if (await VideoModel.exists({
            title: video.title
        })) {
            spinner.text = `Skipping #${video.id}, Progress: ${chalk.blue(Math.round(progress/total * 100) + '%')}`;
            return res(true);
        }
        spinner.text = `Loading #${video.id}, Progress: ${chalk.blue(Math.round(progress/total * 100) + '%')}`

        // Copy file
        let videoPath = videosLocation + video.id;
        await copyFile(video.path, videoPath);

        let thumbPath = `${thumbnailsLocation}${video.id}.png`;
        await createThumbnail(videoPath, thumbPath);

        let newVideo = new VideoModel({
            ...video,
            filename: video.id,
            originalFileName: video.filename,
            path: videoPath
        });

        await newVideo.save();

        res(newVideo);
    })
}

async function saveDvds() {
    // Initialise DB
    await mongoose.connect(process.env.MONGO_URI);

    const playlists = Playlist.loadPlaylists(originalVideos);
    total = playlists.map(playlist => playlist.videos.length)
        .reduce(function(a, b) { return a + b; }, 0);

    for (let playlist of playlists) {
        let savedPlaylist = await PlaylistModel.findOne({title: playlist.title});
        playlist.originalVideos = playlist.videos;
        playlist.videos = playlist.videos.map(({ index, id }) => {
            return { id, index }
        });

        if (!savedPlaylist) {
            savedPlaylist = new PlaylistModel({
                ...playlist,
            });
            await savedPlaylist.save();
        }
        
        for (let video of playlist.originalVideos) {
            await saveVideo(video);
            progress++;
            if(progress === total) {
                spinner.stop();
                console.log('Complete');
            }
        }
    }
}

saveDvds();
