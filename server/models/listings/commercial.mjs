import mongoose, { Schema } from 'mongoose'
import Listing from './listing.mjs'

const commercialSchema = new Schema({
  details: {
    numberOfRooms: {
      rooms: Number,
      hall: Number,
    },
    numberOfToilets: Number,
    heating: {
      heatingType: String,
      fuel: String,
    },
    state: {
      type: String,
    },
    floor: {
      total: Number,
      specific: Number,
    },
    furnishing: {
      type: String,
    },
  },
})

export default Listing.discriminator('Commercial', commercialSchema)
