import { Router } from "express";
import { signup } from "../contoller/user";
const router = Router();

router.route("/signup").post(signup);

export default router;
