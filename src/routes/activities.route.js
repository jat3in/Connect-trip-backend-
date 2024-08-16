import { Router } from "express";
import { createAcitivity, deleteActivity, getActivityById, getAllAcitivity, updateActivity, updateActivityImagesById, updateActivityThumbnailById } from "../controllers/activities.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-activity").post(upload.fields([{
    name: "activityThumbnail",
    maxCount: 1
},{
    name: "activity_images",
    maxCount: 5
}]),createAcitivity);

router.route("/update-activity/:id").patch(updateActivity);
router.route("/update-activity-thumbnail/:id").patch(upload.single("activityThumbnail"), updateActivityThumbnailById);
router.route("/update-activity-images/:id").patch(upload.array("activity_images",5), updateActivityImagesById);
router.route("/get-all-activity/:id").get(getActivityById);
router.route("/get-all-activity").get(getAllAcitivity);
router.route("/delete-activity/:id").delete(deleteActivity);



export default router;