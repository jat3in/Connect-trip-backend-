import {Router} from "express";
import { verifyJwt , adminAuth} from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { deleteHolidayById, getHolidayById, getHolidays, HolidayImagesUpload, HolidayRegsiter, HolidayUpdate } from "../../controllers/user/holiday.controller.js";
import { PriceCalculator, calculateDuration } from "../../middlewares/holiday.middleware.js";

const router = Router();

router.route("/register-holiday").post(verifyJwt,adminAuth,PriceCalculator, calculateDuration ,HolidayRegsiter);
router.route("/update-holiday/:id").patch(verifyJwt,adminAuth,PriceCalculator, calculateDuration ,HolidayUpdate);
router.route("/upload-holiday-images/:id").patch(verifyJwt,adminAuth,upload.array("holiday_images",5),HolidayImagesUpload)
router.route("/get-holiday").get(getHolidays);
router.route("/get-holiday/:id").get(verifyJwt,getHolidayById);
router.route("/delete-holiday/:id").delete(verifyJwt,adminAuth,deleteHolidayById);




export default router;

