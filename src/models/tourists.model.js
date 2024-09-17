import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const TouristSchema = Schema({
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
        
    },
    travel_preferences : [{
        type: String,
    }],
    travel_history: [{
        type: Schema.Types.ObjectId,
        ref: "destination"
    }],
    martial_status: {
        type: String,
        enum: ["Married","Unmarried"]
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
    role: {
      type: String,
      enum: ["Admin","User","Accomodation","Activities","Transport"],
      default: "User",
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    }

},{
    timestampes: true,
});

TouristSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
    
});

TouristSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
    
};


TouristSchema.methods.generateAcessToken = function () {
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


 TouristSchema.methods.generateRefreshToken = function () {
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



export const Tourist = mongoose.model("tourist",TouristSchema)
