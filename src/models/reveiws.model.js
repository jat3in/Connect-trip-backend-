import mongoose, {Schema} from "mongoose";

const EntitySchema = Schema({
    accomodation_id: {
        type: Schema.Types.ObjectId,
        ref: "accomodation"
    },
    destination_id: {
        type: Schema.Types.ObjectId,
        ref: "destination"
    },
    activity_id: {
        type: Schema.Types.ObjectId,
        ref: "activity"
    }
})


const ReviewSchema = Schema({
    tourist_id: {
        type: Schema.Types.ObjectId,
        ref: "tourist",
        required: true,
        index: true,
    },
    entity_id: {
        type: EntitySchema,
        index: true,
        required: true,
    },
    ratings: {
        type: String,
    },
    comments: {
        type: String,

    },
    date: {
        type: Date,
    }

},{timestamps: true})


export const ReviewRatings = mongoose.model("review",ReviewSchema);