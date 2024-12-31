import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String
    },
    picture: {
        type: String
    },
    phone: {
        type:String
    },
    notifUrl: {
        type: Object
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})


export default mongoose.model('Users', userSchema)