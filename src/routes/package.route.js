import {Router} from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPackage, deletePackage, getAllPackage, getAllPackageById, updateImagePackage, updatePackage, updateThumbnailPackage } from "../controllers/package.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { PriceCalculator, calculateDuration } from "../middlewares/package.middleware.js";

const router = Router();

router.route("/create-package").post(verifyJwt, PriceCalculator, calculateDuration, createPackage);
router.route("/update-package/:id").patch(verifyJwt,updatePackage);
router.route("/update-package-thumbnail/:id").patch(verifyJwt,upload.single("package_thumbnail"),updateThumbnailPackage);
router.route("/update-package-images/:id").patch(verifyJwt,upload.array("package_images",5),updateImagePackage);
router.route("/package/:id").get(getAllPackageById);
router.route("/package").get(getAllPackage);
router.route("/delete-package/:id").delete(verifyJwt,deletePackage);


export default router;
