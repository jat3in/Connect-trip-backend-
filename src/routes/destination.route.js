import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteDestinationById, getAllDestination, getDestionById, registerDestination, updateDestinationById, updateDesttinationImage, updateThumbnailById } from "../controllers/destination.controller.js";


const router = Router();

router.route("/register-destination").post(upload.fields([{
    name: "destThumbnail",
    maxCount: 1,
},{
    name: "destImage",
    maxCount: 5,
    
}]), registerDestination);

router.route("/update-destination/:id").patch(updateDestinationById);
router.route("/update-destthumbnail/:id").patch(upload.single("destThumbnail"),updateThumbnailById);
router.route("/update-destimages/:id").patch(upload.array("destImage",5),updateDesttinationImage);
router.route("/get-destination").get(getAllDestination);
router.route("/get-destination/:id").get(getDestionById);
router.route("/delete-destination/:id").delete(deleteDestinationById);


export default router;