import { Router } from "express";
import { createTransport, getTransportById, updateImagesTransport, updateThumbnailTransport, updateTransport, deleteTransport, getAllTransport } from "../controllers/transport.controller.js";

const router = Router();

router.route("/create-transport").post(createTransport);
router.route("/update-transport/:id").patch(updateTransport);
router.route("/update-thumbnail/:id").patch(updateThumbnailTransport);
router.route("/update-images/:id").patch(updateImagesTransport);
router.route("/get-transport/:id").get(getTransportById);
router.route("/get-transport").get(getAllTransport);
router.route("/delete-transport/:id").delete(deleteTransport);



export default router;