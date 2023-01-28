
import mongoose from 'mongoose'

const attachmentSchema = new mongoose.Schema({
    filename: {
        type: String,
        unique: true,
        required: true
    },
    originalFilename: {
        type: String,
        unique: false,
        required: true
    },
    size: {
        type: Number,
        unique: false,
        required: true
    },
    type: {
        type: String,
        unique: false
    }
}, {
    timestamps: true
})

const Attachment = mongoose.models.Attachment || mongoose.model('Attachment', attachmentSchema)

export default Attachment
