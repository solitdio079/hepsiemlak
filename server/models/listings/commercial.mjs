import mongoose, { Schema } from 'mongoose'
import Listing from './listing.mjs'

const commercialSchema = new Schema({
  details: {
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
      type: Boolean,
    },
  },
})

export default Listing.discriminator('Commercial', commercialSchema)
