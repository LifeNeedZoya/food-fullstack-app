import { Router } from "express";
import {
  getAllFood,
  createFood,
  getFood,
  updateFood,
  deleteFood,
} from "../contoller/food";
import { upload } from "../utils/multer";

const router = Router();

router.route("/").post(upload.single("image"), createFood).get(getAllFood);

router.route("/:foodId").put(updateFood).delete(deleteFood).get(getFood);

export default router;
