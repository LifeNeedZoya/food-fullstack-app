import { Router } from "express";
import { signup, login } from "../contoller/user";
import {
  sendEmailToUser,
  verifyOtp,
  resetPassword,
  verifyUser,
} from "../contoller/verify";
const router = Router();
import { getAllUsers, getUser } from "../contoller/user";

router.route("/").get(getAllUsers);
router.route("/:userId").get(getUser);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/verify").post(sendEmailToUser);
router.route("/verify/compare").post(verifyOtp);
router.route("/newPassword").put(resetPassword);
router.route("/verify/user").get(verifyUser);

export default router;
