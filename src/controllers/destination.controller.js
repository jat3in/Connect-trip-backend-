import { Destination } from "../models/destination.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudnairy.js";



const registerDestination = asyncHandler( async (req,res) => {
    const {destination_name, country, state, city,attraction,popularity, best_time_visit} = req.body;

    if([destination_name,country,state,city,attraction,popularity,best_time_visit].some((fields) => fields.trim() === ""))
        throw new ApiError(400, "All Fields are required");

    const existDestination = await Destination.findOne({destination_name});
    
    if(existDestination) throw new ApiError(400,"Destination with the same name cannot be possible.");

    // const destThumbnaiLocalPath = req.files?.destThumbnail[0]?.path;
    
    // const destImageLocalPath = req.files?.destImage[0]?.path;

    // console.log("local ->", destImageLocalPath,destImageLocalPath);

    // if(!destThumbnaiLocalPath) throw new ApiError(400, "Thumbnail Files is required");

    // const destThumbnail = await uploadOnCloudinary(destThumbnaiLocalPath);
    // const destImage = await uploadOnCloudinary(destImageLocalPath);

    // if(!destThumbnail) throw new ApiError(400, "Thumbnail file is required");

    const destination = await Destination.create({
        destination_name,
        country,
        state,
        city,
        attraction,
        popularity,
        best_time_visit,
    });

    console.log("destination -> ", destination);

    if(!destination) throw new ApiError(500,"Something Went wront destination not created");

    return res.status(201).json(new ApiResponce(200, destination, "Destination Created Successfully"));

});

const updateDestinationById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const {destination_name, country, state, city,attraction,popularity, best_time_visit} = req.body;
    if(!destination_name && !country && !state && !city && !attraction && !popularity && !best_time_visit)
        throw new ApiError(400, "All Fields are required");

    const destination = await Destination.find({_id: id});

    if(!destination) throw new  ApiError(400,"Invalid Destination");

    const updatedDestination = await Destination.findOneAndUpdate({_id:id},{
        $set: {
            destination_name,
            country,
            state,
            city,
            attraction,
            popularity,
            best_time_visit,
        }
    },{new: true});

    if(!updatedDestination) throw new  ApiError(400,"Destination not updated");

    return res.status(200).json( new ApiResponce(200,updatedDestination,"Updated Destination Successfully"));
});

const updateThumbnailById = asyncHandler( async (req, res) => {
    const {id} = req.params;

    const destination = await Destination.find({_id:id});

    if(!destination) throw new  ApiError(400,"Destination does not exist");

    const destThumbnailLocalPath = req.file?.path;
    // console.log(destThumbnailLocalPath);
     
    if(!destThumbnailLocalPath) throw new  ApiError(400,"destination thumbnail file is required")

    const destThumbnail = await uploadOnCloudinary(destThumbnailLocalPath);

    if(!destThumbnail) throw new  ApiError(400,"Error occured while uploading image on server");

    const updatedDestination = await Destination.findOneAndUpdate({_id:id},{
        $set:{
            destThumbnail: destThumbnail?.url,
        }
    },{new: true});

    if(!updatedDestination) throw new  ApiError(400,"Couldnt update destination thumnail");


    return res.status(200).json(new ApiResponce(200,updatedDestination,"Destination Thumbnail Image Updated Successfully"));
});

const updateDesttinationImage = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const destination = await Destination.find({_id:id});

    if(!destination) throw new  ApiError(400,"Destination does not exist");

    const destImageLocalPath = req.files[0]?.path;
    console.log(destImageLocalPath)

    if(!destImageLocalPath) throw new  ApiError(400,"Destination Images Files are required");

    const destImages = await uploadOnCloudinary(destImageLocalPath);

    if(!destImages) throw new  ApiError(400,"Error on uploading Images on server");

    const updatedDestination = await Destination.findOneAndUpdate({_id: id},{
        $set: {
            destImages: destImages?.url,
        }
    },{new: true});

    if(!updatedDestination) throw new  ApiError(400,"Destination Images is not updated");
 
    return res.status(200).json( new ApiResponce(200,updatedDestination,"Destination Images Updated Successfully"));
});

const deleteDestinationById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const destination = await Destination.findOneAndDelete({_id:id});
    


    return res.status(200).json(new ApiResponce(200,{},"Deleted Successfully"));
});

const getAllDestination = asyncHandler( async (req,res) => {
    const destination = await Destination.find();
    if(!destination) throw new  ApiError(400,"This destination doesnot exists")


    return res.status(200).json(new ApiResponce(200,destination,"Destination fecthed successfully"));
});

const getDestionById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const destination = await Destination.find({_id:id});
    if(!destination) throw new  ApiError(400,"This destination doesnot exists")


    return res.status(200).json(new ApiResponce(200,destination,"Destination fecthed successfully by id"));
});


export { registerDestination , updateDestinationById, updateThumbnailById, updateDesttinationImage, deleteDestinationById, getAllDestination,getDestionById};