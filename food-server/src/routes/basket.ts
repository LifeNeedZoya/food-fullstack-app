import { Router } from "express";
import {
  deleteBasket,
  getAllOrder,
  getOrder,
  updateOrder,
} from "../contoller/basket";
import { authenticate } from "../middleware/auth";

const router = Router();

router.route("/").get(getAllOrder).put(authenticate, updateOrder);

router.route("/user").get(authenticate, getOrder);

router.route("/:foodId").delete(authenticate, deleteBasket);

export default router;
