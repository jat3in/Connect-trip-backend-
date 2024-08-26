import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { Holiday } from "../models/holiday.model.js";
import { uploadOnCloudinary , deleteOnCloudinary } from "../utils/cloudnairy.js"

const HolidayRegsiter = asyncHandler( async (req,res) => {
    const {holiday_name,description,destination,duration,startDate,endDate,holiday_itinery,holiday_inclusion,holiday_exclusion,reviews} = req.body;

    if(!holiday_name && !destination && !duration && !holiday_itinery && !holiday_inclusion)
            throw new ApiError(400,"All fields are mendatory");
    
    const holidayExists = await Holiday.findOne({holiday_name});
    if(holidayExists) throw new ApiError(400,"same holiday name already exists");

    if(!req.finalPrice) throw new ApiError(400,"Price is not calculated for holiday");
    
    // const holidayImageLocalPath = req?.files[0]?.path;
    // // console.log(holidayImageLocalPath);

    // const holiday_images = await uploadOnCloudinary(holidayImageLocalPath);

    const holiday = await Holiday.create({
        holiday_name,
        destination,
        description,
        duration,
        price: req.finalPrice,
        startDate,
        endDate,
        holiday_itinery,
        holiday_inclusion,
        holiday_exclusion,
        holidayTransport_price: req.priceTransport ,
        holidayAccomodation_price: req.priceAccomodation,
        durationInDays: req.durationInDays,
        reviews
    });

    if(!holiday) throw new ApiError(500,"Holiday not created");

    return res.status(201).json( new ApiResponce(201, holiday, "Holiday created successfully"));
});

const HolidayUpdate = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);
    const {holiday_name,description,destination,duration,startDate,endDate,holiday_itinery,holiday_inclusion,holiday_exclusion,reviews} = req.body;
    
    if(!holiday_name && !destination && !duration && !holiday_itinery && !holiday_inclusion)
        throw new ApiError(400,"All fields are mendatory");

    const holiday = await Holiday.findOne({_id: id});

    if(!holiday) throw new ApiError(400,"Holiday does not exists");

    if(!req.finalPrice) throw new ApiError(400,"Price is not calculated for holiday");
    

    const updateHoliday = await Holiday.findOneAndUpdate({_id : id},{
        $set : {
            holiday_name,
            destination,
            description,
            duration,
            price: req.finalPrice,
            startDate,
            endDate,
            holiday_itinery,
            holiday_inclusion,
            holiday_exclusion,
            holidayTransport_price: req.priceTransport ,
            holidayAccomodation_price: req.priceAccomodation,
            durationInDays: req.durationInDays,
            reviews
        }
    },{new: true});

    if(!updateHoliday) throw new ApiError(400, "Holiday not update some error occurred");

    return res.status(201).json(new ApiResponce(201,updateHoliday,"Holiday Updated successfully"));
});

const HolidayImagesUpload = asyncHandler( async (req,res) => {
    const {id} = req.params;

    const holiday = await Holiday.findOne({_id: id});

    if(!holiday) throw new  ApiError(400, "Invalid Id of holiday");

    
    const holidayImageLocalPath = req.files[0].path;
    // // console.log(holidayImageLocalPath);
    if(!holidayImageLocalPath) throw new  ApiError(400,"Images files are required");


    const holiday_images = await uploadOnCloudinary(holidayImageLocalPath);

    if(!holiday_images.url) throw new  ApiError(400,"Failed to upload on Server");

    const updatedHoliday = await Holiday.findOneAndUpdate({_id: id},{
        $set:{
            holiday_images: holiday_images.url,
        }
    },{new: true});

    if(!updatedHoliday) throw new  ApiError(400,"Holiday Object not updated");

    return res.status(201).json(new ApiResponce(201,updatedHoliday,"Images for the holiday Uploaded Successfully"));
})

const getHolidays = asyncHandler( async (req,res) => {
    const holidays = await Holiday.find();
    if(!holidays) throw new ApiError(400,"Holiday does not exists");

    return res.status(200).json( new ApiResponce(200,holidays,"All Holidays shown successfully"));
});

const getHolidayById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);

    const holiday = await Holiday.find({_id: id});
    if(!holiday) throw new  ApiError(400,"Holiday Does not exists");

    return res.status(200).json( new ApiResponce(200,holiday,"Holiday Fetched Successfully"));
});

const deleteHolidayById = asyncHandler( async (req,res) => {
    const {id} = req.params;
    // console.log(id);

    const holiday = await Holiday.findByIdAndDelete(id);
    
    return res.status(200).json(200,"Deleted Successfully");
})


export { HolidayRegsiter, deleteHolidayById, getHolidayById, getHolidays, HolidayUpdate, HolidayImagesUpload };