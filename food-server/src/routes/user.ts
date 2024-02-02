import { Router } from "express";
import { signup, login } from "../contoller/user";
import {
  sendEmailToUser,
  verifyOtp,
  resetPassword,
  verifyUser,
} from "../contoller/verify";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/verify").post(sendEmailToUser);
router.route("/verify/compare").post(verifyOtp);
router.route("/newPassword").put(resetPassword);
router.route("/verify/user").get(verifyUser);

export default router;
