import { asyncHandler } from "../../utils/asyncHandler.js";
import { Admin } from "../../models/admin.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponce } from "../../utils/ApiResponce.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../../utils/cloudnairy.js";


const generateAccessAndRefereshTokens = async (adminId) =>{
    try {
        const admin = await Admin.findById(adminId);
        const accessToken = admin.generateAcessToken();
        const refreshToken = admin.generateRefreshToken();

        tourist.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const regiterAdmin = asyncHandler( async (req,res) => {
    // const { fullName, email,phone, password} = req.body;
    // // console.log("admin data :- ", fullName,email,password);

    // if([fullName,email,phone,password].some((field) => field.trim() === "")){
    //     throw new ApiError(400, "All Fields are required")
    // }

    // const existedAdmin = await Admin.findOne({
    //     $or: [{ phone }, { email }]
    // })


    // if (existedAdmin) {
    //     throw new ApiError(409, "Admin with email or Username already exists")
    // }

    // const admin = await Admin.create({
    //     fullName,
    //     email,
    //     phone,
    //     password
    // });
    // console.log("admin -> ", admin);
    // const createdAdmin = await Admin.findById(admin?._id).select(
    //     "-password -refreshToken"
    // )
    // if(!createdAdmin) {
    //     throw new ApiError(500, "Something went wrong while registering the Admin")
    // }
     
    // return res.status(201).json(
    //     new ApiResponce(200, createdAdmin , "Admin registered Successfully")
    // )

    return res.send("listning on the login admin route");

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