import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { Booking } from "../models/booking.model.js";

const createBooking = asyncHandler( async (req,res) => {
    const {tourist_id,accomodation_id,package_id,transport_id,holiday_id,destination_id,activity_id} = req.query;

    const {travel_date, payment_method, total_cost} = req.body;

    const entitySchema = {
        accomodation_id,
        package_id,
        transport_id,
        holiday_id,
        destination_id,
        activity_id
    };

    if(!tourist_id && !entitySchema) throw new ApiError(400,"Booking cannot be created without tourist and entity");

    if(!travel_date && !payment_method && !total_cost) throw new ApiError(400,"This fields are required");

    const booking = await Booking.create({
        tourist_id,
         entity_id : entitySchema,
        travel_date,
        payment_method,
        total_cost
    });

    if(!booking) throw new ApiError(400,"Booking is not created");

    return res.status(200).json(new ApiResponce(200,booking,"Booking Created successfully"));
});


const updateBooking = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const {status} = req.body;
    // console.log(id);
    const booking = await Booking.findOne({_id:id});
    if(!booking) throw new ApiError(400,"Booking does not exists");

    const updatedBooking = await Booking.findOneAndUpdate({_id:id},{
        $set: {
         status
        }
    },{new : true});

    if(!updatedBooking) throw new ApiError(400,"Booking not updated");

    return res.status(200).json(new ApiResponce(200,updatedBooking,"Booking updated Successfully"));
});

const getAllBooking = asyncHandler( async (req,res) => {
    const booking = await Booking.find();
    if(!booking) throw new ApiError(400,"Booking not found");
    return res.status(200).json(new ApiResponce(200,booking,"Booking found successfully"));
});


const getBookingById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);
    const booking = await Booking.findOne({_id: id});
    if(!booking) throw new ApiError(400,"booking Id Not valid");

    return res.status(200).json(new ApiResponce(200,booking,"Booking found with id successfully"));

});

const deleteBooking = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);
    await Booking.findOneAndDelete({_id:id});

    return res.status(200).json(new ApiResponce(200,{},"Booking Deleted Successfully"));
});


export {createBooking,updateBooking,getAllBooking,getBookingById,deleteBooking}