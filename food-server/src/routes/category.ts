import { Router } from "express";
import {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../contoller/category";

const router = Router();

router.route("/").post(createCategory).get(getAllCategory);

router
  .route("/:categoryId")
  .put(updateCategory)
  .delete(deleteCategory)
  .get(getCategory);

export default router;
