import { NextFunction, Request, Response } from "express";
import Category from "../model/category";
import MyError from "../utils/myError";
import cloudinary from "../utils/cloudinary";
import { rmSync } from "fs";
import { IReq } from "../utils/interface";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("RRQ,", req.body);
    console.log("RRFF,", req.file);
    const newCategory = { ...req.body };
    if (req.file) {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path);
      newCategory.image = secure_url;
    }

    await Category.create(newCategory);
    res.status(200).json({
      message: `successfully created new category with ${newCategory.name} `,
    });
    res.status(200).json({ message: "successfully created new category" });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (
  req: IReq,
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
