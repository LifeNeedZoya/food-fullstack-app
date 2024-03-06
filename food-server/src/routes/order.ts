import { Router } from "express";
import { createOrder, getOrders } from "../contoller/order";
import { authenticate } from "../middleware/auth";

const router = Router();

router.route("/").get(authenticate, getOrders).post(authenticate, createOrder);

export default router;
