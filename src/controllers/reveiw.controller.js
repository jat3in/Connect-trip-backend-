import { ReviewRatings } from "../models/reveiws.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudnairy.js";


const createReview = asyncHandler( async (req,res) => {
    const {ratings, commments, date} = req.body;
    if(!ratings && !commments && !date) throw new ApiError(400,"this all fileds are required to create reveiw");


    const rating = await ReviewRatings.create({
        ratings,
        commments,
        date
    });

    if(!rating) new ApiError(400,"the ratings not created");


    return res.status(200).json(new ApiResponce(200,rating,"Ratings created successfully"));
});

const editReview = asyncHandler( async (req,res) => {
    const {id} = req.params;

    const {ratings, commments, date} = req.body;
    if(!ratings && !commments && !date) throw new ApiError(400,"this all fileds are required to create reveiw");


    const rating = await ReviewRatings.findOneAndUpdate({id},{
        $set: {
        ratings,
        commments,
        date
        }
    },{new : true});

    if(!rating) new ApiError(400,"the ratings not updated");
    return res.status(200).json(new ApiResponce(200, rating," Reveiw and ratings updated successfully"));
});

const deleteReveiw = asyncHandler( async (req,res) => {
    const {id} = req.params;

    await ReviewRatings.findOneAndDelete({id});


    return res.status(200).json(new ApiResponce(200,{},"Reveiws And Ratings deleted successfully"));
});

const getReview = asyncHandler( async (req,res) => {

    const ratings = await ReviewRatings.find();
    if(!ratings) throw new ApiError(400,"Not have Any ratings")


    return res.status(200).json(new ApiResponce(200,ratings,"All Ratings find successfully"));
});

const getReviewId = asyncHandler( async (req,res) => {


    return res.send("get reveiew by id");
});

export { createReview, editReview, deleteReveiw, getReviewId, getReview}