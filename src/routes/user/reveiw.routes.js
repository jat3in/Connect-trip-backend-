import { Router } from "express";
import { verifyJwt } from "../../middlewares/auth.middleware.js";
import { createReview, updateReview, deleteReveiw, getReviewId, getReview} from "../../controllers/user/reveiw.controller.js";
const router = Router();

router.route("/reveiw-create").post(verifyJwt,createReview);
router.route("/reveiw-edit/:id").patch(verifyJwt,updateReview);
router.route("/delete-reveiw/:id").delete(verifyJwt,deleteReveiw);
router.route("/get-reveiw").get(getReview);
router.route("/get-reveiw/:id").get(getReviewId);




export default router;