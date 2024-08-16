import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { changeCurrentPassword, getCurrentTourist, loginTourist, logoutTourist, refreshAccessToken, RegisterTourist, updateAccountDetails, updateProfilePic } from "../controllers/tourist.controller.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = Router();


router.route("/register").post( upload.fields([{
    name: "profile_pic",
    maxCount: 1,
}]),RegisterTourist);

router.route("/login").post(loginTourist);
router.route("/logout").post(verifyJwt,logoutTourist);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").patch(verifyJwt,changeCurrentPassword);
router.route("/current-tourist").get(verifyJwt, getCurrentTourist);
router.route("/update-tourist").patch(verifyJwt, updateAccountDetails);
router.route("/profile-pic").patch(verifyJwt, upload.single("profile_pic"), updateProfilePic);

export default router;