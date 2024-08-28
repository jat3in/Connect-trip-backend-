import { Router } from "express";
import { createTransport, getTransportById, updateThumbnailTransport, updateTransport, deleteTransport, getAllTransport } from "../../controllers/user/transport.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJwt } from "../../middlewares/auth.middleware.js";
import { calculateRoute } from "../../middlewares/transport.middleware.js";

const router = Router();

router.route("/create-transport").post(verifyJwt,calculateRoute,createTransport);
router.route("/update-transport/:id").patch(verifyJwt,calculateRoute,updateTransport);
router.route("/update-thumbnail/:id").patch(verifyJwt,upload.single("transport_thumbnail"),updateThumbnailTransport);
router.route("/get-transport/:id").get(getTransportById);
router.route("/get-transport").get(getAllTransport);
router.route("/delete-transport/:id").delete(verifyJwt,deleteTransport);



export default router;