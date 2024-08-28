import {Router} from "express";
import {createBooking,updateBooking,getAllBooking,getBookingById,deleteBooking} from "../../controllers/user/booking.controller.js";
import { verifyJwt, adminAuth } from "../../middlewares/auth.middleware.js";
const router = Router();


router.route("/create-booking").post(verifyJwt,createBooking);
router.route("/update-booking/:id").patch(verifyJwt,adminAuth,updateBooking);
router.route("/get-booking").get(verifyJwt,adminAuth,getAllBooking);
router.route("/get-booking/:id").get(verifyJwt,getBookingById);
router.route("/delete-booking/:id").delete(verifyJwt,deleteBooking);



export default router;