import { Router } from "express";
import { createTransport, getTransportById, updateThumbnailTransport, updateTransport, deleteTransport, getAllTransport } from "../../controllers/user/transport.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJwt ,adminAuth} from "../../middlewares/auth.middleware.js";
import { calculateRoute } from "../../middlewares/transport.middleware.js";

const router = Router();

router.route("/create-transport").post(verifyJwt,adminAuth,calculateRoute,createTransport);
router.route("/update-transport/:id").patch(verifyJwt,adminAuth,calculateRoute,updateTransport);
router.route("/update-thumbnail/:id").patch(verifyJwt,adminAuth,upload.single("transport_thumbnail"),updateThumbnailTransport);
router.route("/get-transport/:id").get(verifyJwt,getTransportById);
router.route("/get-transport").get(getAllTransport);
router.route("/delete-transport/:id").delete(verifyJwt,adminAuth,deleteTransport);



export default router;