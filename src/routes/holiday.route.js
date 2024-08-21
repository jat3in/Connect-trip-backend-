import {Router} from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteHolidayById, getHolidayById, getHolidays, HolidayImagesUpload, HolidayRegsiter, HolidayUpdate } from "../controllers/holiday.controller.js";

const router = Router();

router.route("/register-holiday").post(verifyJwt,HolidayRegsiter);
router.route("/update-holiday/:id").patch(verifyJwt,HolidayUpdate);
router.route("/upload-holiday-images/:id").patch(verifyJwt,upload.array("holiday_images",5),HolidayImagesUpload)
router.route("/get-holiday").get(getHolidays);
router.route("/get-holiday/:id").get(getHolidayById);
router.route("/delete-holiday/:id").delete(verifyJwt,deleteHolidayById);




export default router;

