import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Transport } from "../models/transport.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudnairy.js";

const createTransport = asyncHandler( async (req,res) => {


    return res.send("listning on the create transport route");
});

const updateTransport = asyncHandler( async (req,res) => {



    return res.send("listning on the update transport route");
});

const updateThumbnailTransport = asyncHandler( async (req,res) => {

    return res.send("listning on the update thumbnail route");
});

const updateImagesTransport = asyncHandler( async (req,res) => {


    return res.send("listning on the update image transport route");
});

const getAllTransport = asyncHandler( async (req,res) => {


    return res.send("listning on the get all transport route");
});

const getTransportById = asyncHandler( async (req,res) => {


    return res.send("listning on the get transport by id");
});

const deleteTransport = asyncHandler(async (req,res) => {


    return res.send("listning on delete transport route")
});

export { createTransport, updateImagesTransport, updateThumbnailTransport, deleteTransport, getAllTransport, getTransportById, updateTransport}