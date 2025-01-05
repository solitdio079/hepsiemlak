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
    },
    userType: {
        type: String,
        default:"visitor"
    },
    documents: {
        type:[String]
    },
    isVerified: {
        type:Boolean,
        default:false
    }
}, {timestamps: true})


export default mongoose.model('Users', userSchema)