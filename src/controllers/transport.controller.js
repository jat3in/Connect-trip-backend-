import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Transport } from "../models/transport.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudnairy.js";


const createTransport = asyncHandler( async (req,res) => {
    const {transport_type, provider, route, schedule, price,transport_from, transport_to, capacity} = req.body;
    if(!transport_type && !provider && !route && !schedule && !price && !capacity && !transport_from && !transport_to)
        throw new ApiError(400,"This all fields are required");

        if(!req.route) throw new ApiError(400,"Route is required");
    
    const transport = await Transport.create({
        transport_type,
        provider,
        transport_from,
        transport_to,
        route: req.route,
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

// const updateImagesTransport = asyncHandler( async (req,res) => {
//     const {id} = req.params;
//     const transportImagesLocalPath = req.files;
//     // console.log(tranportImagesLocalPath);
//     if(!transportImagesLocalPath) throw new  ApiError(400,"Transport Images Files are required");

//     const imageUrlsArray = transportImagesLocalPath.map(file => file.path);

//     // console.log(imageUrlsArray)
//     if(imageUrlsArray.length === 0) throw new ApiError("images files is required");
    

//     const serverImage = await Promise.all(
//         imageUrlsArray.map(async (data) => {
            
//             const imageUrlServer = await uploadOnCloudinary(data);
//             return imageUrlServer.url; // Return the url of upload image
//         })
//     );

//     // console.log(serverImage)
//     // const destImages = await uploadOnCloudinary(imageUrls);

//     if(serverImage.length === 0 ) throw new  ApiError(400,"Error on uploading Images on server");
    
//     const updateTransportImages = await Transport.findOneAndUpdate({_id:id},{
//         $set: {
//             transport_images: serverImage
//         }
//     },{new : true});

//     if(!updateTransportImages) throw new ApiError(400,"Transport Images not updated successfully");


//     return res.status(200).json(new ApiResponce(200,updateTransportImages,"Transport Images Updated Successfully"));
// });

const getAllTransport = asyncHandler( async (req,res) => {
    const transport = await Transport.find();
    if(!transport) throw new ApiError(400,"Not found any tranport");


    return res.status(200).json(new ApiResponce(200,transport,"All Transport found successfully"));
});

const getTransportById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const transport = await Transport.findOne({_id:id});
    if(!transport) throw new ApiError(400,"The Tranport id does not exists");


    return res.status(200).json(new ApiResponce(200,transport,"Tranport find by id successfully"));
});

const deleteTransport = asyncHandler(async (req,res) => {
    const {id} = req.params;
    await Transport.findOneAndDelete({_id:id});


    return res.status(200).json(new ApiResponce(200,{},"tranport deleted successfully"))
});

export { createTransport, updateThumbnailTransport, deleteTransport, getAllTransport, getTransportById, updateTransport}