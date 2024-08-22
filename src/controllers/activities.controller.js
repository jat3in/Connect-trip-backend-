import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { Activity } from "../models/activities.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudnairy.js";

const createAcitivity = asyncHandler( async (req,res) => {
    const {activityName, activityType,price,duration} = req.body;

    if(!activityName && !activityType && !price && !duration) throw ApiError(400,"This all feild is required");

    const activity = await Activity.create({
        activityName,
        activityType,
        price,
        duration
    });

    if(!activity) throw new  ApiError(400,"the activity is not created");

    return res.status(200).json(new ApiResponce(200,activity,"Activity created successfully"));
});

const updateActivity = asyncHandler( async (req,res) => {

    const {id} = req.params;
    const {activityName, activityType,price,duration} = req.body;
    // const localThumbnailPath = req.files?.activityThumbnail?.path;
    // console.log(localThumbnailPath);
    // if(!localThumbnailPath) throw ApiError(400,"Thumbnail file is required");

    // const activityThumbnail = await uploadOnCloudinary(localThumbnailPath);

    const activity = await Activity.findOneAndUpdate({_id:id},{
        $set: {
            activityName,
        activityType,
        price,
        duration
        }
    },{new: true});

    if(!activity) throw new  ApiError(400,"Your Activity Id is not valid")

    return res.status(200).json(new ApiResponce(200,activity,"Activity Updated successfuly"));
});

const updateActivityThumbnailById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    
    const localThumbnailPath = req.file?.path;
    // console.log(localThumbnailPath);
    if(!localThumbnailPath) throw new ApiError(400,"Thumbnail file is required");

    const activityThumbnail = await uploadOnCloudinary(localThumbnailPath);
    if(!activityThumbnail) throw new ApiError(400,"Thumbnail images is not uploaded");

    const activity = await Activity.findOneAndUpdate({_id: id},{
        $set:{
            activityThumbnail: activityThumbnail.url,
        }
    },{new: true});

    if(!activity) throw new ApiError(400,"The Activity is not updated");
    

    return res.status(200).json(new ApiResponce(200,activity,"Activity Thumbnail updated successfully"));
});

const updateActivityImagesById = asyncHandler( async (req,res) => {
    const {id} = req.params;

    const localImagesPath = req.files[0]?.path;
    // console.log(localImgaesPath);
    if(!localImagesPath) throw new ApiError(400,"Images file is required");

    const activity_images = await uploadOnCloudinary(localImagesPath);
    if(!activity_images) throw new ApiError(400,"Images is not uploaded");

    const activity = await Activity.findOneAndUpdate({_id:id},{
        $set: {
            activity_images: activity_images.url,
        }
    },{new: true});

    if(!activity) throw new ApiError(400,"The Activity is not updated");

    return res.status(200).json(new ApiResponce(200,activity,"Activity Images updated successfully"));
});

const getAllAcitivity = asyncHandler( async (req,res) => {

    const activity = await Activity.find();
    if(!activity) throw new ApiError(400,"Activity not found");
    return res.status(200).json(new ApiResponce(200,activity,"All Activity Fetched Successfully"));
});

const getActivityById = asyncHandler( async (req,res) => {
    const {id} = req.params;

    // console.log(id);

    const activity = await Activity.findOne({_id:id});
    if(!activity) throw new  ApiError(400,"Not found any activity")

    return res.status(200).json(new ApiResponce(200,activity,"Activity find successfully"));

});

const deleteActivity = asyncHandler( async (req,res) => {
    const {id} = req.params;

   const activity =  await Activity.findOneAndDelete({_id:id});
   if(!activity) throw new ApiError(400,"Id is in valid");


    return res.status(200).json(new ApiResponce(200,{},"Activity deleted by id"));
});


export { createAcitivity , updateActivity , updateActivityImagesById , getActivityById , getAllAcitivity , deleteActivity , updateActivityThumbnailById };
