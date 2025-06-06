import mongoose, { Schema } from 'mongoose'


const landSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true
  },
  images: [String],
  location: {
    country: String,
    district: String,
    street: String,
    door: String,
    city: String,
  },
  document: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    
  },
  owner: {
    name: String,
    picture: String,
    email: String,
    phone: String,
  },
},{timestamps: true})

export default mongoose.model('Land', landSchema)
