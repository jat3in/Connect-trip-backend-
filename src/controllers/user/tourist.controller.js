import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponce } from "../../utils/ApiResponce.js"
import { Tourist } from "../../models/tourists.model.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../../utils/cloudnairy.js";

const generateAccessAndRefereshTokens = async (touristId) =>{
    try {
        const tourist = await Tourist.findById(touristId);
        const accessToken = tourist.generateAcessToken();
        const refreshToken = tourist.generateRefreshToken();

        tourist.refreshToken = refreshToken
        await tourist.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const RegisterTourist = asyncHandler( async ( req, res) => {

    const { fullName, email, password, role} = req.body;
    console.log("tourist data :- ", fullName,email,password);

    if([fullName,email,password].some((field) => field.trim() === "")){
        throw new ApiError(400, "All Fields are required")
    }

    const existedTourist = await Tourist.findOne({
        email 
    })


    if (existedTourist) {
        throw new ApiError(409, "Tourist with email or Touristname already exists")
    }

    let profilePicLocalPath;

    if (
        req.files &&
        Array.isArray(req.files.profile_pic) &&
        req.files.profile_pic.length > 0
      )
      profilePicLocalPath = req.files?.profile_pic[0]?.path;
    const profile_pic = await uploadOnCloudinary(profilePicLocalPath)

    const tourist = await Tourist.create({
        fullName,
        email,
        password,
        profile_pic: profile_pic?.url || "",
        role
    });
    console.log("tourist -> ", tourist);
    const createdTourist = await Tourist.findById(tourist?._id).select(
        "-password -refreshToken -role"
    )
    if(!createdTourist) {
        throw new ApiError(500, "Something went wrong while registering the Tourist")
    }
     
    return res.status(201).json(
        new ApiResponce(200, createdTourist , "Tourist registered Successfully")
    )

});

const loginTourist = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, phone, password} = req.body
    console.log(email);

    if (!phone && !email) {
        throw new ApiError(400, "phone or email is required")
    }
    

    const tourist = await Tourist.findOne({
        $or: [{phone}, {email}]
    })

    if (!tourist) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await tourist.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(tourist._id);


    const loggedInTourist = await Tourist.findById(tourist._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponce(
            200, 
            {
                tourist: loggedInTourist
            },
            "tourist logged In Successfully"
        )
    )

});



const logoutTourist = asyncHandler(async(req, res) => {
   const re = await Tourist.findByIdAndUpdate(
        req.tourist._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    console.log(re)

    const options = {
        httpOnly: true,
        secure: true
    }


    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponce(200, {}, "tourist LoggedOut"))
});


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const tourist = await Tourist.findById(decodedToken?._id)
    
        if (!tourist) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== tourist?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(tourist._id);
     
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponce(
                200, 
                {accessToken, refreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async(req, res) => {

    const {oldPassword, newPassword} = req.body

    const tourist = await Tourist.findById(req.tourist?._id)
    const isPasswordCorrect = await tourist.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    tourist.password = newPassword
    await tourist.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponce(200, {}, "Password changed successfully"))

})

const getCurrentTourist = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponce(
        200,
        req.tourist,
        "tourist fetched successfully"
    ))
})
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email, gender, nationality, phone, travel_preferences, martial_status, pincode, state } = req.body;

    // Check if all required fields are provided
    if (!fullName || !email || !phone) {
        throw new ApiError(400, "Full name, email, and phone are required");
    }

    // Find and update the tourist information
    const tourist = await Tourist.findByIdAndUpdate(
        req.tourist?._id,
        {
            $set: {
                fullName: fullName,
                email: email,
                gender: gender,
                nationality: nationality,
                phone: phone,
                travel_preferences: travel_preferences,
                martial_status: martial_status,
                pincode: pincode,
                state: state,
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    // Return the response
    return res
        .status(200)
        .json(new ApiResponce(200, tourist, "Account details updated successfully"));
});

const getAllSingleTourist = asyncHandler( async (req,res) => {
    const {id} = req.params;
    const tourist = await Tourist.findOne({_id: id});
    if(!tourist) throw new ApiError(400,"Tourist not found");
    return res.status(200).json(new ApiResponce(200,tourist,"Tourist found successfully"))


});



const updateProfilePic = asyncHandler(async(req, res) => {
    const profilePicLocalPath = req.file?.path

    if (!profilePicLocalPath) {
        throw new ApiError(400, "profile image file is missing")
    }

    //TODO: delete old image - assignment

    // const deletePrivious = await deleteOnCloudinary(req.tourist?.profile_pic);

    const profile_pic = await uploadOnCloudinary(profilePicLocalPath)

    if (!profile_pic.url) {
        throw new ApiError(400, "Error while uploading on cloudinary")
        
    }

    const tourist = await Tourist.findByIdAndUpdate(
        req.tourist?._id,
        {
            $set:{
                profile_pic: profile_pic.url
            }
        },
        {new: true}
    ).select("-password -refreshToken")

    return res
    .status(200)
    .json(
        new ApiResponce(200, tourist, " image updated successfully")
    )
})



export { RegisterTourist,
    loginTourist,
    updateAccountDetails, 
    logoutTourist, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentTourist,
    updateProfilePic,
    getAllSingleTourist
    
}
