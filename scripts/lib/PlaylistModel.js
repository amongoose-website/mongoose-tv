const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        unique: false,
        required: true
    },
    description: {
        type: String,
        unique: false,
        required: false
    },
    tags: {
        type: Array,
        required: true,
        default: []
    },
    videos: {
        type: Array,
        required: true,
        default: []
    }
}, {
    timestamps: true
});

const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema)

module.exports = Playlist
