import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Transport } from "../models/transport.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudnairy.js";

const createTransport = asyncHandler( async (req,res) => {
    const {transport_type, provider, route, schedule, price, capacity} = req.body;
    if(!transport_type && !provider && !route && !schedule && !price && !capacity)
        throw new ApiError(400,"This all fields are required");
    
    const transport = await Transport.create({
        transport_type,
        provider,
        route,
        schedule,
        price,
        capacity
    });

    if(!transport) throw new ApiError(400,"The transport not created");
        


    return res.status(200).json(new ApiResponce(200, transport, "Transport created successfully"));
});

const updateTransport = asyncHandler( async (req,res) => {
const {id} = req.params;
    const {transport_type, provider, route, schedule, price, capacity} = req.body;
    if(!transport_type && !provider && !route && !schedule && !price && !capacity)
        throw new ApiError(400,"This all fields are required");

    const transport = await Transport.findOneAndUpdate({_id:id},{
        $set: {
            transport_type,
            provider,
            route,
            schedule,
            price,
            capacity
        }
    },{new: true})

    if(!transport) throw new ApiError(400,"Transport Not Updated");



    return res.status(200).json(new ApiResponce(200,transport,"Transport updated successfully"));
});

const updateThumbnailTransport = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const thumbnailLocalPath = req.file?.path;
    // console.log(thumbnailLocalPath);

    if(!thumbnailLocalPath) throw new ApiError(400,"The thumbnail file is required");
    const transport_thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if(!transport_thumbnail) throw new ApiError(400,"cant upload file on server");

    const updatedThumbnail = await Transport.findOneAndUpdate({_id:id},{
        $set: {
            transport_thumbnail: transport_thumbnail.url
        }
    },{new: true});

    if(!updatedThumbnail) throw new ApiError(400,"Thumbnail not updated");

    return res.status(200).json(new ApiResponce(200,updatedThumbnail,"Thumbnail updated successfully"));
});

const updateImagesTransport = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const tranportImagesLocalPath = req.files[0]?.path;
    console.log(tranportImagesLocalPath);
    if(!tranportImagesLocalPath) new ApiError(400,"the images file is required");

    const transport_images = await uploadOnCloudinary(updateImagesTransport);
    if(!transport_images) throw new ApiError(400,"Transport Images not uploaded on server");

    const updateTransportImages = await Transport.findOneAndUpdate({id},{
        $set: {
            transport_images: transport_images.url
        }
    },{new : true});

    if(!updateTransportImages) throw new ApiError(400,"Transport Images not updated successfully");


    return res.status(200).json(new ApiResponce(200,updateTransportImages,"Transport Images Updated Successfully"));
});

const getAllTransport = asyncHandler( async (req,res) => {
    const transport = await Transport.find();
    if(!tranport) throw new ApiError(400,"Not found any tranport");


    return res.status(200).json(new ApiResponce(200,tranport,"All Transport found successfully"));
});

const getTransportById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const transport = await Transport.findOne({id});
    if(!tranport) throw new ApiError(400,"The Tranport id does not exists");


    return res.status(200).json(new ApiResponce(200,tranport,"Tranport find by id successfully"));
});

const deleteTransport = asyncHandler(async (req,res) => {
    const {id} = req.params;
    await Tranport.findOneAndDelete({id});


    return res.status(200).json(new ApiResponce(200,{},"tranport deleted successfully"))
});

export { createTransport, updateImagesTransport, updateThumbnailTransport, deleteTransport, getAllTransport, getTransportById, updateTransport}