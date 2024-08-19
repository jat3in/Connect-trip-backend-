import { Router } from "express";
const router = Router();

router.route("/reveiw-create").post();
router.route("/reveiw-edit").patch();
router.route("/delete-reveiw").delete();
router.route("/get-reveiw").get();
router.route("/get-reveiw/:id").get();




export default router;