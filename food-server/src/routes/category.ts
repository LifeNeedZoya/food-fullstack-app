import { Router } from "express";
import {
  getAllCategory,
  getCatgory,
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
  .get(getCatgory);

export default router;
