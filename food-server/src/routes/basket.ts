import { Router } from "express";
import {
  deleteBasket,
  getAllOrder,
  getOrder,
  updateOrder,
} from "../contoller/basket";
import { authenticate } from "../middleware/auth";

const router = Router();

router.route("/").get(getAllOrder);
router.route("/:userId").get(getOrder).put(updateOrder);

router.route("/:foodId").delete(authenticate, deleteBasket);
export default router;
