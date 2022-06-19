
import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
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
    isDvd: {
        type: Boolean,
        default: false
    },
    dvdNumber: {
        type: String,
        required: false
    },
    episodeNumber: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    originalFileName: {
        type: String,
        required: true
    },
    encoding: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema)

export default Video
