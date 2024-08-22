import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { Booking } from "../models/booking.model.js";

const createBooking = asyncHandler( async (req,res) => {

    return res.send("listning on create booking routes");
});


const updateBooking = asyncHandler( async (req,res) => {
    const {id} = req.params;
    console.log(id);

    return res.send("listning on the booking update routes");
});

const getAllBooking = asyncHandler( async (req,res) => {


    return res.send("listning on the get all booking routes");
});


const getBookingById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    console.log(id);

    return res.send("listning on the get by id booking");

});

const deleteBooking = asyncHandler( async (req,res) => {
    const {id} = req.params;
    console.log(id);

    return res.send("listning on the delete booking routes");
});


export {createBooking,updateBooking,getAllBooking,getBookingById,deleteBooking}