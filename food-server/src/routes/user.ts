import { Router } from "express";
import { signup, login, checkUserPassword } from "../contoller/user";
import {
  sendEmailToUser,
  verifyOtp,
  resetPassword,
  verifyUser,
} from "../contoller/verify";
const router = Router();
import { getAllUsers, getUser, changeUserData } from "../contoller/user";
import { authenticate } from "../middleware/auth";
import { upload } from "../utils/multer";

router.route("/").get(getAllUsers);
router.route("/:userId").get(getUser);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/changeUser").put(authenticate, changeUserData);
router.route("/checkPassword").post(authenticate, checkUserPassword);
router.route("/verify").post(sendEmailToUser);
router.route("/verify/compare").post(verifyOtp);
router.route("/newPassword").put(resetPassword);
router.route("/verify/user").get(verifyUser);

export default router;
