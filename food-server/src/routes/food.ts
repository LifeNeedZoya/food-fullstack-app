import { Router } from "express";
import {
  getAllFood,
  createFood,
  getFood,
  updateFood,
  deleteFood,
} from "../contoller/food";

const router = Router();

router.route("/").post(createFood).get(getAllFood);

router.route("/:foodId").put(updateFood).delete(deleteFood).get(getFood);

export default router;
