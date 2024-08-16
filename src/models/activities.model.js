import mongoose, {Schema} from "mongoose";

const locationSchema = Schema({
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    }
  });


const ActivitiesSchema = Schema({
    activityName: {
        type: String,
        required: true,
        index: true,
    },
    activityThumbnail: {
        type: String,
    },
    activity_images:[{
        type: String,
    }],
    activityType: {
        type: String,
        enum: ["Wildlife","Nature","Water"],
        required: true,
    },
    location: {
        type: locationSchema,

    },
    price: {
        type: Schema.Types.Decimal128,
    },
    duration: {
        type: Date,
    }

},{timestampes: true})


export const Activity = mongoose.model("activity",ActivitiesSchema);