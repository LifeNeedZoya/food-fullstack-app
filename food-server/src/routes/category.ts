import { Router } from "express";
import {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../contoller/category";
import { upload } from "../middleware/multer";
import { authenticate } from "../middleware/auth";
const router = Router();

router
  .route("/")
  .post(upload.single("image"), createCategory)
  .get(authenticate, getAllCategory);

router
  .route("/:categoryId")
  .put(updateCategory)
  .delete(deleteCategory)
  .get(getCategory);

export default router;
