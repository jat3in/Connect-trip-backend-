import mongoose, {Schema} from "mongoose";

const DestinationSchema = Schema({
    destination_name: {
        type: String,
        required: true,
        index: true,
        trim: true,
        unique: true,
    },
    destThumbnail: {
      type: String,
      required: true,
    },
    destImage: [{
      type: String,
    }],
    country: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true

    },
    city: {
        type: String,
        required: true
    },
    attraction: [{
        type: String,
    }],
    popularity: [{
        type: String,

    }],
    best_time_visit: [{
        type: String,
        
    }]

},{timestamps: true});


export const Destination = mongoose.model("destination",DestinationSchema);