import mongoose, {Schema} from "mongoose";

const adminSchema = Schema({
    fullName:{
        type: String,
        required: true,
        index: true, 
        trim: true,
    },
      email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    gender: {
        type: String,
        enum: ["Male","Female","Others"],
    },
    nationality : {
        type: String,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
        
    },
    pincode: {
        type: String,

    },
    state: {
        type: String,
    },
    profile_pic: {
        type: String, // string from cloudnairy 
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    }

},{timestamps: true});


export const Admin = mongoose.model("admin",adminSchema);