
import mongoose from 'mongoose'

const dvdSchema = new mongoose.Schema({
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
    dvdNumber: {
        type: String,
        unique: true,
        required: true
    },
}, {
    timestamps: true
})

const Dvd = mongoose.models.Dvd || mongoose.model('Dvd', dvdSchema)

export default Dvd
