import {Router} from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import { createPackage, deletePackage, getAllPackage, getAllPackageById, updateImagePackage, updatePackage, updateThumbnailPackage, regionSearch } from "../../controllers/user/package.controller.js";
import { verifyJwt, adminAuth } from "../../middlewares/auth.middleware.js";
import { PriceCalculator, calculateDuration } from "../../middlewares/package.middleware.js";

const router = Router();

router.route("/create-package").post(verifyJwt,adminAuth, PriceCalculator, calculateDuration, createPackage);
router.route("/update-package/:id").patch(verifyJwt,adminAuth,PriceCalculator, calculateDuration,updatePackage);
router.route("/update-package-thumbnail/:id").patch(verifyJwt,adminAuth,upload.single("package_thumbnail"),updateThumbnailPackage);
router.route("/update-package-images/:id").patch(verifyJwt,adminAuth,upload.array("package_images",5),updateImagePackage);
router.route("/package/:id").get(verifyJwt,getAllPackageById);
router.route("/package").get(getAllPackage);
router.route("/search").get(regionSearch);
router.route("/delete-package/:id").delete(verifyJwt,adminAuth,deletePackage);


export default router;
