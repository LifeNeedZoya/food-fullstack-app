import { Router } from "express";
import { signup, login } from "../contoller/user";
import { sendEmailToUser, verifyOtp, resetPassword } from "../contoller/verify";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/verify/email").post(sendEmailToUser);
router.route("/verify/compare").post(verifyOtp);
router.route("/newPassword").put(resetPassword);

export default router;
