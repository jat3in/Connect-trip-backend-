import mongoose, {Schema} from "mongoose"

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

//   const PriceRange = Schema({
//     minPrice: {
//         type: Schema.Types.Decimal128,
//         required: true,
//     },
//     maxPrice: {
//         type: Schema.Types.Decimal128,
//         required: true,
//     }
//   })


const AccomodationSchema = Schema({
  accomodation_name: {
    type: String,
    required: true,
    index: true,

  },
  accomodation_thumbnail:{
    type: String,
  },
  accomodation_images:[{
    type: String,
  }],
  accomodation_type: {
    type: String,
    required: true,
    index: true,
  },
  location: {
    type: locationSchema,
    required: true,
    index: true
  },
  price: {
    type: Schema.Types.Decimal128,
    index: true,
    required: true,
  },
  Amenities: [{
    type: String,
    required: true,
  }],
  capacity: {
    type: Number,
    required: true,
    index: true,
  },
  checkInTime: {
    type: Date,
    required: true,
  },
  checkOutTime: {
    type: Date,
    required: true,
  }
},{timestamps: true});


export const Accomodation = mongoose.model("accomodation",AccomodationSchema);