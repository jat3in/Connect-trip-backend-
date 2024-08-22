import mongoose, {Schema} from "mongoose";

const entitySchema = {
    accomodation_id: {
        type: Schema.Types.ObjectId,
        ref: "accomodation"
    },
    package_id: {
        type: Schema.Types.ObjectId,
        ref: "package"
    },
    transport_id: {
        type: Schema.Types.ObjectId,
        ref: "transport"
    },
    holiday_id:{
        type: Schema.Types.ObjectId,
        ref: "holiday"
    },
    destination_id: {
        type: Schema.Types.ObjectId,
        ref: "destination"
    },
    activity_id: {
        type: Schema.Types.ObjectId,
        ref: "activity"
    }
}

const BookingSchema = Schema({
    tourist_id: {
        type: Schema.Types.ObjectId,
        ref: "tourist",
        index: true,
        required: true,
    },
    entity_id: {
        type: entitySchema,
        required: true,
        index: true
    },
    booking_date: {
        type: Date,
        default: new Date,
        index: true,
    },
    travel_date: { 
        type: Date,
        required: true,
        index: true,
    },
    payment_method: {
        type: String,
        enum: ["PayPal","UPI","CREDIT CARD"],
        required: true,
    },
    total_cost: {
        type: Schema.Types.Decimal128,
        index: true,
        required: true,
    }

},{timestamps: true});


export const Booking = mongoose.model("booking",BookingSchema);