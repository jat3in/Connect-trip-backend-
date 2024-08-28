import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; 



// calculating duration like duration = finale date - initial dates
// the particular result comes under days

const DurationSchema = Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    }, 
    durationInDay: {
        type: Number,
    }
})

const PackageDurationSchema = {
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


const PackageInclusionSchema = {
    transport:[{
        type: Schema.Types.ObjectId,
        ref: "transport",
    }],
    accomodation: [{
        type: Schema.Types.ObjectId,
        ref: "accomodation",
    }],
    activities: [{
            type: Schema.Types.ObjectId,
            ref: "activity"
        }],
    meals:[{
        type: String,
        enum: ["Breakfast","Lunch","Dinner"]
    }],
    guided_tours:{
        type: String,
    }
}


const PackageSchema = Schema({
    package_name: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    package_region: {
        type: String,
        required: true,
        lowercase: true,
        
    },
    package_thumbnail:{
        type: String,
        
    },
    package_images:[{
        type: String,
    }],
    description: {
        type: String,

    },
    package_inclusion: {
        type: PackageInclusionSchema,
        required: true
    },
    package_destination: [{
        type: Schema.Types.ObjectId,
        ref: "destination",
        required: true,
        index: true,
    }],
    package_type: {
        type: String,
        enum: ["Adventure","Family","Romantic"],
        required: true,
        index: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    package_itinery:[{
        type: ItinerySchema,
        required: true
    }],
    package_duration:{
        type: PackageDurationSchema,
    },
    duration: {
        type: DurationSchema,
        required: true,
    },
    avalablities_date: [{
        type: Date,
        index: true,
    }],
    price_accomodation:{
        type: Schema.Types.Decimal128,
    },
    price_transport: {
      type: Schema.Types.Decimal128,  
    },
    price_activity: {
      type: Schema.Types.Decimal128,  
    },
    reviews: {
        type: Schema.Types.ObjectId,
        refs: "review",
    }

},{timestamps: true});

PackageSchema.plugin(mongooseAggregatePaginate);
export const Package = mongoose.model("package",PackageSchema)