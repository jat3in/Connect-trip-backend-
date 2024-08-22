import {Router} from "express";
const router = Router();


router.route("/create-booking").post();
router.route("/update-booking").patch();
router.route("/get-booking").get();
router.route("/get-booking/:id").get();
router.route("/delete-booking/:id").delete();



export default router;