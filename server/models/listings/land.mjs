import mongoose, { Schema } from 'mongoose'
import Listing from './listing.mjs'

const landSchema = new Schema({
  details: {
        plotNumber: String,
        swap: Boolean,
        landType: String,
      
  },
})

export default Listing.discriminator('Land', landSchema)
