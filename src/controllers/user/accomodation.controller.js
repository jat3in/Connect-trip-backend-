import { Accomodation } from "../../models/accomodation.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponce } from "../../utils/ApiResponce.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../../utils/cloudnairy.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const createAccomodation = asyncHandler( async (req,res) => {
    const {accomodation_name, accomodation_type, location, price,Amenities, capacity, checkInTime,checkOutTime} = req.body;

    if(!accomodation_name && !accomodation_type && !location && !capacity && !price)
        throw new ApiError(400,"All fields for the given accomodation is required");
    
    const accomodation = await Accomodation.create({
        accomodation_name,
        accomodation_type,
        location,
        price,
        Amenities,
        capacity,
        checkInTime,
        checkOutTime
    });

    if(!accomodation) throw new ApiError(400,"Accomodation is not created");

    return res.status(200).json( new ApiResponce(200,accomodation,"Accomodation created successfully"));
});


const updateAccomodationById = asyncHandler( async (req,res) => {
    const {id} = req.params;

    const {accomodation_name, accomodation_type, location, price,Amenities, capacity, checkInTime,checkOutTime} = req.body;

    if(!accomodation_name && !accomodation_type && !location && !capacity && !price)
        throw new ApiError(400,"All fields for the given accomodation is required");

    const updatedAccomodation = await Accomodation.findOneAndUpdate({_id:id},{
        $set: {
            accomodation_name,
            accomodation_type,
            location,
            price,
            Amenities,
            capacity,
            checkInTime,
            checkOutTime
        }
    },{new: true});

    if(!updatedAccomodation) throw new ApiError(400,"Cann't update Accomodation");
    
    return res.status(200).json(new ApiResponce(200,updatedAccomodation,"Accomodation Updated successfully"));
});

const updateAccomodationThumbnail = asyncHandler( async (req,res) => {
    const {id} = req.params;
    
    const localThumbnailPath = req.file?.path;
    if(!localThumbnailPath) throw new ApiError(400,"Thumbnail files is required");
    // console.log(localThumbnailPath)

    const accomodation_thumbnail = await uploadOnCloudinary(localThumbnailPath);

    if(!accomodation_thumbnail) throw new ApiError(400,"The Thumbnail is not uploaded");

    const updatedThumbnail = await Accomodation.findOneAndUpdate({_id:id},{
        $set: {
            accomodation_thumbnail: accomodation_thumbnail.url,
        }
    },{new: true});

    if(!updatedThumbnail) throw new  ApiError(400,"Thumbnail is Not updated");

    return res.status(200).json( new ApiResponce(200,updatedThumbnail,"Accomodation Thumbnail Image Updated Successfully"));
});

const updateAccomodationImageById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const localImagesPath = req.files;
    // console.log(localImagesPath)
    if(!localImagesPath) throw new  ApiError(400,"Accomodation Images Files are required");

    const imageUrlsArray = localImagesPath.map(file => file.path);

    // console.log(imageUrlsArray)
    if(imageUrlsArray.length === 0) throw new ApiError("images files is required");
    

    const serverImage = await Promise.all(
        imageUrlsArray.map(async (data) => {
            
            const imageUrlServer = await uploadOnCloudinary(data);
            return imageUrlServer.url; // Return the url of upload image
        })
    );

    // console.log(serverImage)
    // const destImages = await uploadOnCloudinary(imageUrls);

    if(serverImage.length === 0 ) throw new  ApiError(400,"Error on uploading Images on server");



    const updatedImages = await Accomodation.findOneAndUpdate({_id:id},{
        $set: {
            accomodation_images: serverImage,
        }
    },{new: true});

    if(!updatedImages) throw new  ApiError(400,"Images is Not updated");

    return res.status(200).json( new ApiResponce(200,updatedImages,"Accomodation Images Updated Successfully"));
});

const deleteAccomodationById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    
    const accomodation = await Accomodation.findOne({_id:id});
    if(!accomodation) throw new  ApiError(400,"Accomodation does not exists")

    await Accomodation.findOneAndDelete({_id:id});    



    return res.status(200).json(new ApiResponce(200,{},"Accomodation Deleted Successfully"));
});

const getAccomodationById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    
    const accomodation = await Accomodation.findOne({_id:id});
    if(!accomodation) throw new  ApiError(400,"Accomodation does not exists");

    res.status(200).json(new ApiResponce(200, accomodation, "Fetched Accomodation By id Successfully"));
});

const getAllAccomodation = asyncHandler( async (req,res) => {

    const accomodation = await Accomodation.find();
    if(!accomodation) throw new  ApiError(400,"Accomodation does not exists")

    return res.status(200).json(new ApiResponce(200,accomodation,"All Accomodation Fecthed Successfully"));
})


export { createAccomodation, updateAccomodationById, updateAccomodationThumbnail, updateAccomodationImageById,deleteAccomodationById, getAccomodationById, getAllAccomodation }
