import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createAccomodation, deleteAccomodationById, getAccomodationById, getAllAccomodation, updateAccomodationById, updateAccomodationImageById, updateAccomodationThumbnail } from "../controllers/accomodation.controller.js";

const router = Router();

router.route("/create-accomodation").post(verifyJwt,upload.fields([{
    name: "accomodation_thumbnail",
    maxCount: 1,
},{
    name: "accomodation_images",
    maxCount: 5,
}]), createAccomodation);
router.route("/update-accomodation/:id").patch(verifyJwt,updateAccomodationById);
router.route("/update-accomodation-images/:id").patch(verifyJwt,upload.array("accomodation_images",5),updateAccomodationImageById);
router.route("/update-accomodation-thumbnail/:id").patch(verifyJwt,upload.single("accomodation_thumbnail"),updateAccomodationThumbnail);
router.route("/delete-accomodation/:id").delete(verifyJwt,deleteAccomodationById);
router.route("/accomodation/:id").get(verifyJwt,getAccomodationById);
router.route("/accomodation").get(verifyJwt,getAllAccomodation);



export default router;