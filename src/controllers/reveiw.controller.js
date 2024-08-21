import { ReviewRatings } from "../models/reveiws.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createReview = asyncHandler( async (req,res) => {
    const {tourist_id, accomodation_id,package_id,activity_id,holiday_id,destination_id} = req.query;
    const {ratings, commments} = req.body;
    if(!ratings && !commments) throw new ApiError(400,"this all fileds are required to create reveiw");
    const entity_id = {
        accomodation_id,
        package_id,
        activity_id,
        holiday_id,
        destination_id
    }

    if(tourist_id){
    const rating = await ReviewRatings.create({
        tourist_id,
        entity_id,
        ratings,
        commments
    });
    if(!rating) new ApiError(400,"the ratings not created");
    return res.status(200).json(new ApiResponce(200,rating,"Ratings created successfully"));
    }

    return res.status(400).json(new ApiError(400,"Reveiw Cant Created Because of tourist id needed"));
    
});

// const editReview = asyncHandler( async (req,res) => {
//     const {id} = req.params;

//     const {ratings, commments} = req.body;
//     if(!ratings && !commments) throw new ApiError(400,"this all fileds are required to create reveiw");


//     const rating = await ReviewRatings.findOneAndUpdate({_id:id},{
//         $set: {
//         ratings,
//         commments
//         }
//     },{new : true});

//     if(!rating) new ApiError(400,"the ratings not updated");
//     return res.status(200).json(new ApiResponce(200, rating," Reveiw and ratings updated successfully"));
// });

const updateReview = asyncHandler( async (req,res) => {
    const {id} = req.params;

    const {ratings, commments} = req.body;
    if(!ratings && !commments) throw new ApiError(400,"this all fileds are required to create reveiw");


    const rating = await ReviewRatings.findOneAndUpdate({_id:id},{
        $set: {
        ratings,
        commments
        }
    },{new : true});

    if(!rating) new ApiError(400,"the ratings not updated");
    return res.status(200).json(new ApiResponce(200, rating," Reveiw and ratings updated successfully"));
});

const deleteReveiw = asyncHandler( async (req,res) => {
    const {id} = req.params;

    await ReviewRatings.findOneAndDelete({_id:id});


    return res.status(200).json(new ApiResponce(200,{},"Reveiws And Ratings deleted successfully"));
});

const getReview = asyncHandler( async (req,res) => {

    const ratings = await ReviewRatings.find();
    if(!ratings) throw new ApiError(400,"Not have Any ratings")


    return res.status(200).json(new ApiResponce(200,ratings,"All Ratings find successfully"));
});

const getReviewId = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const ratings = await ReviewRatings.findOne({_id:id});
    if(!ratings) throw new ApiError(400,"Not have Any ratings")


    return res.status(200).json(new ApiResponce(200,ratings,"Ratings by id fetched successfully"));
});

export { createReview, updateReview, deleteReveiw, getReviewId, getReview}