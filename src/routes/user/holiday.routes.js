import {Router} from "express";
import { verifyJwt } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { deleteHolidayById, getHolidayById, getHolidays, HolidayImagesUpload, HolidayRegsiter, HolidayUpdate } from "../../controllers/user/holiday.controller.js";
import { PriceCalculator, calculateDuration } from "../../middlewares/holiday.middleware.js";

const router = Router();

router.route("/register-holiday").post(verifyJwt,PriceCalculator, calculateDuration ,HolidayRegsiter);
router.route("/update-holiday/:id").patch(verifyJwt,PriceCalculator, calculateDuration ,HolidayUpdate);
router.route("/upload-holiday-images/:id").patch(verifyJwt,upload.array("holiday_images",5),HolidayImagesUpload)
router.route("/get-holiday").get(getHolidays);
router.route("/get-holiday/:id").get(getHolidayById);
router.route("/delete-holiday/:id").delete(verifyJwt,deleteHolidayById);




export default router;

