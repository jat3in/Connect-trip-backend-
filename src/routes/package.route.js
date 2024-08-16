import {Router} from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPackage, deletePackage, getAllPackage, getAllPackageById, updateImagePackage, updatePackage, updateThumbnailPackage } from "../controllers/package.controller.js";

const router = Router();

router.route("/create-package").post(upload.fields([{name: "package_thumbnail",maxCount: 1},{name: "package_images",maxCount: 5}]), createPackage);
router.route("/update-package/:id").patch(updatePackage);
router.route("/update-package-thumbnail/:id").patch(upload.single("package_thumbnail"),updateThumbnailPackage);
router.route("/update-package-images/:id").patch(upload.array("package_images",5),updateImagePackage);
router.route("/package/:id").get(getAllPackageById);
router.route("/package").get(getAllPackage);
router.route("/delete-package/:id").delete(deletePackage);


export default router;
