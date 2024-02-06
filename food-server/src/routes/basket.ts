import { Router } from "express";
import {
  createBasket,
  deleteBasket,
  getAllOrder,
  getOrder,
  updateOrder,
} from "../contoller/basket";

const router = Router();

router.route("/").get(getAllOrder).post(createBasket);
router.route("/:orderId").get(getOrder).put(updateOrder).delete(deleteBasket);

export default router;
