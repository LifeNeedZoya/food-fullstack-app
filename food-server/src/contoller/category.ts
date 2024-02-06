import { NextFunction, Request, Response } from "express";
import Category from "../model/category";
import MyError from "../utils/myError";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("DDDDD=>", req.body);
    await Category.create(req.body);
    res.status(200).json({ message: "successfully created new category" });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      message: ` id successfully found`,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;

    const findCategory = await Category.findById(categoryId);
    if (!findCategory) {
      throw new MyError(`can not find category with ${categoryId} id`, 404);
    }
    res.status(200).json({
      message: `${categoryId} id successfully found`,
      category: findCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const updatedCategory = req.body;

    const findCategory = await Category.findByIdAndUpdate(categoryId, {
      ...updatedCategory,
    });
    if (!findCategory) {
      throw new MyError(`can not find category with ${categoryId} id`, 404);
    }
    res.status(200).json({
      message: `${categoryId} id successfully found`,
      category: findCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      throw new MyError(`can not find category with ${categoryId} id`, 404);
    }
    res.status(200).json({
      message: `${categoryId} id successfully found`,
      deletedCategory,
    });
  } catch (error) {
    next(error);
  }
};
