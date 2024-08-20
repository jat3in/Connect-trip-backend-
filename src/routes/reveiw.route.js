import { Router } from "express";
import { createReview, editReview, deleteReveiw, getReviewId, getReview} from "../controllers/reveiw.controller.js";
const router = Router();

router.route("/reveiw-create").post(createReview);
router.route("/reveiw-edit").patch(editReview);
router.route("/delete-reveiw").delete(deleteReveiw);
router.route("/get-reveiw").get(getReview);
router.route("/get-reveiw/:id").get(getReviewId);




export default router;