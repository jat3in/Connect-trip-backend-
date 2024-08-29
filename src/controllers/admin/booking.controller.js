import { Booking } from "../../models/booking.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponce } from "../../utils/ApiResponce.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getAllBooking = asyncHandler( async (req,res) => {
    const bookings = await Booking.find();
    if(!bookings) throw new ApiError(400,"Bookings not find");
    return res.status(200).json(new ApiResponce(200,bookings,"All Bookingd Finded successfully"));
});

const deleteBookingById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    await Booking.findOneAndDelete({_id:id});
    return res.status(200).json(new ApiResponce(200,{},"Booking Deleted with id"));
});

export {getAllBooking, deleteBookingById}