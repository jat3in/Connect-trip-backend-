import jwt from "jsonwebtoken";
import {asyncHandler} from "../utils/asyncHandler.js";
import {Tourist} from "../models/tourists.model.js";
import {ApiError} from "../utils/ApiError.js";


const verifyJwt = asyncHandler( async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization"?.replace("Bearer ", ""));
        if(!token) throw new ApiError(401, "Unauthorized Request");
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const tourist = await Tourist.findById(decodeToken._id).select("-password -refreshToken");

        if(!tourist) throw new ApiError(401, "Invalid Access Token");
        req.tourist = tourist;
        next();
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
        
    }

});

const adminAuth = asyncHandler( async (req,res,next) => {
    if(!req.tourist && !req.tourist.role === "Admin") throw new ApiError(400,"Access Denied");
    next();
});


export {verifyJwt, adminAuth}