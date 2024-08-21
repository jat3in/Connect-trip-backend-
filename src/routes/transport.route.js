import { Router } from "express";
import { createTransport, getTransportById, updateImagesTransport, updateThumbnailTransport, updateTransport, deleteTransport, getAllTransport } from "../controllers/transport.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-transport").post(verifyJwt,createTransport);
router.route("/update-transport/:id").patch(verifyJwt,updateTransport);
router.route("/update-thumbnail/:id").patch(verifyJwt,upload.single("transport_thumbnail"),updateThumbnailTransport);
router.route("/update-images/:id").patch(verifyJwt,upload.array("transport_images",5),updateImagesTransport);
router.route("/get-transport/:id").get(getTransportById);
router.route("/get-transport").get(getAllTransport);
router.route("/delete-transport/:id").delete(verifyJwt,deleteTransport);



export default router;