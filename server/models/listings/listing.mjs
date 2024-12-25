import mongoose, { Schema } from 'mongoose'

const options = { discriminatorKey: 'type', timestamps: true }
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    age: Number,
    usage: String,
    location: {
        country: String,
        district: String,
        street: String,
        door: String,
        city: String
    },
    area: {
        net: Number,
        gross: Number
    },
    adType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    owner: {
        name: String,
        picture: String,
        email: String
    }
}, options)


export default mongoose.model('Listings', listingSchema)