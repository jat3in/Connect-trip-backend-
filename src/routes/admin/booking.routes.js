import { Router } from "express";
import {getAllBooking, deleteBookingById} from "../../controllers/admin/booking.controller.js";
import { adminAuth, verifyJwt } from "../../middlewares/auth.middleware.js";


const router = Router();

router.route("/bookings").get(verifyJwt,adminAuth,getAllBooking);
router.route("/delete-booking/:id").delete(verifyJwt,adminAuth,deleteBookingById);



export default router;