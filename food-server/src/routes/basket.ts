import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  updateOrder,
} from "../contoller/basket";

const router = Router();

router.route("/").get(getAllOrder).post(createOrder);
router.route("/:orderId").get(getOrder).put(updateOrder).delete(deleteOrder);

export default router;
