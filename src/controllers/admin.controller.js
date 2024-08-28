import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudnairy.js";


const regiterAdmin = asyncHandler( async (req,res) => {


    return res.send("listning on the admin register route");
});


const loginAdmin = asyncHandler( async (req, res) => {


    return res.send("listning on the login admin route");
});

const updateAdmin = asyncHandler( async (req,res) => {

    return res.send("listning on the update admin route");
});

const adminProfilePic = asyncHandler( async (req,res) => {

    return res.send("listning on the admin profile route");
});

const getCurrentAdmin = asyncHandler( async (req,res) => {

    return res.send("listning on th ecurrent admin route");
});

const getAllAdmin = asyncHandler( async (req,res) => {


    return res.send("listning on the get all admins");
});

const getAdminById = asyncHandler( async (req,res) => {


    return res.send("listning on the get admin by id");
});

const changeCurrentPassword = asyncHandler( async (req,res) => {


    return res.send("listning on the change current password");
});

const deleteAdmin = asyncHandler( async (req,res) => {


    return res.send("listning on the delete admin route");
});


export { regiterAdmin, loginAdmin, getAdminById, getAllAdmin, getCurrentAdmin, deleteAdmin, adminProfilePic, updateAdmin, changeCurrentPassword}