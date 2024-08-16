import mongoose, {Schema} from "mongoose";

const BookingSchema = Schema({
    tourist_id: {
        type: Schema.Types.ObjectId,
        ref: "tourist",
        index: true,
        required: true,
    },
    accomodation_id: {
        type: Schema.Types.ObjectId,
        ref: "accomodation",
        index: true,
    },
    package_id: {
        type: Schema.Types.ObjectId,
        ref: "package",
        index: true,
    },
    transport_id: {
        type: Schema.Types.ObjectId,
        ref: "transport",
        index: true,
    },
    holiday_id:{
        type: Schema.Types.ObjectId,
        ref: "holiday",
        index: true,
    },
    booking_date: {
        type: Date,
        default: new Date(),
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