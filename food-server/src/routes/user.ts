import { Router } from "express";
import { signup, login, verifyAccount } from "../contoller/user";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").get(verifyAccount);

export default router;
