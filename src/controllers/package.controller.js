import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudnairy.js";
import { Package } from "../models/package.model.js";


const createPackage = asyncHandler( async (req,res) => {
    const { package_name,description,package_inclusion,package_destination,package_type,price,package_itinery,package_duration,duration,avalablities_date} = req.body;

    if( !package_name && !duration && !package_inclusion && !package_type && !price && !package_destination && !package_itinery && !package_duration)
        throw new ApiError(400, "Some what feild is required");

    // Package.aggregate([
    //     {
    //         $lookup: {
    //             from: "transports", // The name of the transport collection
    //             localField: "package_inclusion.transport",
    //             foreignField: "_id",
    //             as: "transportDetails"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "accomodations", // The name of the accommodation collection
    //             localField: "package_inclusion.accomodation",
    //             foreignField: "_id",
    //             as: "accommodationDetails"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "activities", // The name of the activity collection
    //             localField: "package_inclusion.activities",
    //             foreignField: "_id",
    //             as: "activityDetails"
    //         }
    //     },
    //     {
    //         $addFields: {
    //             durationInDays: {
    //                 $divide: [
    //                     { $subtract: ["$duration.endDate", "$duration.startDate"] },
    //                     1000 * 60 * 60 * 24
    //                 ]
    //             }
    //         }
    //     },
    //     {
    //         $addFields: {
    //             totalTransportCost: { $sum: "$transportDetails.price" },
    //             totalAccommodationCost: { $sum: "$accommodationDetails.price" },
    //             totalActivityCost: { $sum: "$activityDetails.price" }
    //         }
    //     },
    //     {
    //         $addFields: {
    //             overallPrice: {
    //                 $sum: [
    //                     "$totalTransportCost",
    //                     "$totalAccommodationCost",
    //                     "$totalActivityCost",
    //                     "$price"
    //                 ]
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             package_name: 1,
    //             durationInDays: 1,
    //             totalTransportCost: 1,
    //             totalAccommodationCost: 1,
    //             totalActivityCost: 1,
    //             overallPrice: 1
    //         }
    //     }
    // ]).then(result => {
    //     console.log(result);
    // })
    // .catch(err => {
    //     console.error(err);
    // });

    const createdPackage = await Package.create({
        package_name,
        description,
        package_inclusion,
        package_destination,
        package_type,
        price,
        package_itinery,
        package_duration,
        duration,
        avalablities_date
    });

    if(!createdPackage) throw new ApiError(400,"Package does not created");

    return res.status(200).json(new ApiResponce(200,createdPackage,"Package Created Successfully"));
});


const updatePackage = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);

    const { package_name,description,package_inclusion,package_destination,package_type,price,package_itinery,package_duration,duration,avalablities_date} = req.body;

    if( !package_name && !duration && !package_inclusion && !package_type && !price && !package_destination && !package_itinery && !package_duration)
        throw new ApiError(400, "Some what feild is required")

    const updatedPackage = await Package.findOneAndUpdate({_id:id},{
        $set: {
        package_name,
        description,
        package_inclusion,
        package_destination,
        package_type,
        price,
        package_itinery,
        package_duration,
        duration,
        avalablities_date
        }
    },{new: true});

    if(!updatedPackage) throw new  ApiError(400,"Package Not Updated")


    return res.status(200).json(new ApiResponce(200,updatedPackage,"Updated Package Successfully"));
});

const updateThumbnailPackage = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);
    
    const packageThumbnailLocalPath = req.file?.path;
    // console.log(packageThumbnailLocalPath)

    if(!packageThumbnailLocalPath) throw new  ApiError(400,"The Thumnail file is required");

    const package_thumbnail = await uploadOnCloudinary(packageThumbnailLocalPath);
    
    if(!package_thumbnail) throw new  ApiError(400,"While uploading on cloudinary is not possible");

    const updateThumbnail = await Package.findOneAndUpdate({_id:id},{
        $set: {
            package_thumbnail: package_thumbnail.url

        }
    },{new : true});

    if(!updateThumbnail) throw new  ApiError(400,"Thumnail Not Updated");
    return res.status(200).json(new ApiResponce(200,updateThumbnail,"The Thumbnail Updated for package"));
});

const updateImagePackage = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);

    const packageImageLocalPath = req.files[0]?.path;
    // console.log(packageImageLocalPath)

    if(!packageImageLocalPath) throw new  ApiError(400,"The Images file is required");

    const package_images = await uploadOnCloudinary(packageImageLocalPath);
    
    if(!package_images) throw new  ApiError(400,"While uploading on cloudinary is not possible");

    const updateImages = await Package.findOneAndUpdate({_id:id},{
        $set: {
            package_images: package_images.url

        }
    },{new : true});

    if(!updateImages) throw new  ApiError(400,"Images Not Updated");

    return res.status(200).json(new ApiResponce(200,updateImages,"Package Images Updated Successfully"));
});

const getAllPackage = asyncHandler( async (req,res) => {
    const packages = await Package.find();
    if(!packages) throw new  ApiError(400,"cannot find packages");
    return res.status(200).json(new ApiResponce(200,packages,"All Packages find successfully"));
});

const getAllPackageById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);

    const packages = await Package.findOne({_id:id});
    if(!packages) throw new  ApiError(400,"Package does not exist");

    return res.status(200).json(new ApiResponce(200,packages,"Package with id find successfully"));
});


const deletePackage = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);

    await Package.findOneAndDelete({_id:id});

    return res.status(200).json(new ApiResponce(200,{},"Package deleted successfully"));
});


export {createPackage,updateImagePackage,updateThumbnailPackage,getAllPackage,getAllPackageById,deletePackage, updatePackage}