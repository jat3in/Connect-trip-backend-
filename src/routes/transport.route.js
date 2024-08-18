import { Router } from "express";
import { createTransport, getTransportById, updateImagesTransport, updateThumbnailTransport, updateTransport, deleteTransport, getAllTransport } from "../controllers/transport.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-transport").post(createTransport);
router.route("/update-transport/:id").patch(updateTransport);
router.route("/update-thumbnail/:id").patch(upload.single("tranport_thumbnail"),updateThumbnailTransport);
router.route("/update-images/:id").patch(upload.array("transport_images",5),updateImagesTransport);
router.route("/get-transport/:id").get(getTransportById);
router.route("/get-transport").get(getAllTransport);
router.route("/delete-transport/:id").delete(deleteTransport);



export default router;