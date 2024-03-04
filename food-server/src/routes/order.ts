import { Router } from "express";
import { createOrder } from "../contoller/order";
import { authenticate } from "../middleware/auth";

const router = Router();

router.route("/").post(authenticate, createOrder);

export default router;
