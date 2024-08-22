import {Router} from "express";
import {createBooking,updateBooking,getAllBooking,getBookingById,deleteBooking} from "../controllers/booking.controller.js";
const router = Router();


router.route("/create-booking").post(createBooking);
router.route("/update-booking").patch(updateBooking);
router.route("/get-booking").get(getAllBooking);
router.route("/get-booking/:id").get(getBookingById);
router.route("/delete-booking/:id").delete(deleteBooking);



export default router;