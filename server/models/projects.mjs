import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  images: [String],
  location: {
    country: String,
    district: String,
    street: String,
    door: String,
    city: String,
  },
  numOfUnits: {
    type: Number,
    required: true,
  },
  owner: {
    name: String,
    picture: String,
    email: String,
    phone: String,
  },
})

export default mongoose.model('Projects', projectSchema)