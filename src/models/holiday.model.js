import mongoose, {Schema} from "mongoose";


const DurationSchema = {
    days:{
        type: Number,
    },
    nights:{
        type: Number,
    }
}


const ItinerySchema = {
    day:{
        type: String,
    },
    description: {
        type: String,
    }
}

const HolidayInclusionSchema = {
    transport:[{
        type: Schema.Types.ObjectId,
        ref: "transport",
    }],
    accomodation: [{
        type: Schema.Types.ObjectId,
        ref: "accomodation",
    }],
    meals:[{
        type: String,
        enum: ["Breakfast","Lunch","Dinner"]
    }],
    guided_tours:{
        type: String,
    }
}

const HolidaySchema = Schema({
    holiday_name: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    destination: [{
        type: Schema.Types.ObjectId,
        ref: "Destination",
    }],
    duration:{
        type: DurationSchema,
        required: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    holiday_images: [{
        type: String,
    }],
    holiday_itinery: [{
        type: ItinerySchema,
        required: true,
    }],
    holiday_inclusion: {
        type: HolidayInclusionSchema,
        required: true,        
    },
    holiday_exclusion:[{
        type: String,
        required: true,
    }],
    holidayTransport_price:{
        type: Schema.Types.Decimal128,
    },
    holidayAccomodation_price:{
        type: Schema.Types.Decimal128,
    },
    durationInDays: {
        type: Number,
    },
    reviews:{
        type: Schema.Types.ObjectId,
        ref: "review",

    }

},{timestamps: true});



export const Holiday = mongoose.model("holiday",HolidaySchema);