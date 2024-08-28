import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

adminSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
    
});

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
    
};


adminSchema.methods.generateAcessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 86400,
      }
    );
  };


 adminSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: 864000,
      }
    );
  };


export const Admin = mongoose.model("admin",adminSchema);