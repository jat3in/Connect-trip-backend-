import { Router } from "express";
import { regiterAdmin, loginAdmin, getAdminById, getAllAdmin, getCurrentAdmin, deleteAdmin, adminProfilePic, updateAdmin, changeCurrentPassword} from "../controllers/admin.controller.js";
const router = Router();

router.route("/register").post(regiterAdmin);
router.route("/login").post(loginAdmin);
router.route("/update/admin/:id").patch(updateAdmin);
router.route("/change-password/:id").patch(changeCurrentPassword);
router.route("/admins").get(getAllAdmin);
router.route("/admin/:id").get(getAdminById);
router.route("/current/admin").get(getCurrentAdmin);
router.route("/delete/admin/:id").delete(deleteAdmin);
router.route("/admin/profile-pic/:id").patch(adminProfilePic);


export default router;