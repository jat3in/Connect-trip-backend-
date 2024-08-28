import { Router } from "express";
import { verifyJwt } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { deleteDestinationById, getAllDestination, getDestionById, registerDestination, updateDestinationById, updateDesttinationImage, updateThumbnailById } from "../../controllers/user/destination.controller.js";


const router = Router();

router.route("/register-destination").post(verifyJwt,upload.fields([{
    name: "destThumbnail",
    maxCount: 1,
},{
    name: "destImage",
    maxCount: 5,
    
}]), registerDestination);

router.route("/update-destination/:id").patch(verifyJwt,updateDestinationById);
router.route("/update-destthumbnail/:id").patch(verifyJwt,upload.single("destThumbnail"),updateThumbnailById);
router.route("/update-destimages/:id").patch(verifyJwt,upload.array("destImage",5),updateDesttinationImage);
router.route("/get-destination").get(getAllDestination);
router.route("/get-destination/:id").get(getDestionById);
router.route("/delete-destination/:id").delete(verifyJwt,deleteDestinationById);


export default router;