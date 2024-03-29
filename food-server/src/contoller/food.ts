import { NextFunction, Request, Response } from "express";
import Food from "../model/food";
import MyError from "../utils/myError";
import cloudinary from "../utils/cloudinary";

export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newFood = req.body;

    console.log("NewFood", newFood);
    console.log("NewFood", req.file);

    const foodContainsName = Food.findOne({ name: newFood.name });

    if (newFood.name == Food.name) {
      console.log("ner adilhan bn");
    }

    if (req.file) {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path);
      newFood.image = secure_url;
    }

    console.log("DATA", newFood);

    await Food.create(newFood);
    res.status(200).json({ message: "Хоол амжилттай үүслээ" });
    console.log("successfully created food");
  } catch (error: any) {
    if (error.code === 11000) {
      // Mongoose duplicate key error
      res.status(400).json({
        message: "Food is already exist",
      });
    } else {
      // Pass the error to the next error handler middleware
      next(error);
    }
  }
};

export const getAllFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foods = await Food.find().populate("category", "name");

    res.status(200).json({
      message: ` id successfully found`,
      foods,
    });
  } catch (error) {
    next(error);
  }
};

export const getFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;

    const findFood = await Food.findById(foodId);
    if (!findFood) {
      throw new MyError(`can not find food with ${foodId} id`, 404);
    }
    res.status(200).json({
      message: `${foodId} id successfully found`,
      findFood,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;
    const updatedFood = req.body;

    const foundFood = await Food.findByIdAndUpdate(foodId, {
      ...updatedFood,
    });
    if (!foundFood) {
      throw new MyError(`can not find food with ${foodId} id`, 404);
    }
    res.status(200).json({
      message: `${foodId} id successfully updated`,
      foundFood,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;
    console.log("REQ :", req.params);

    const deletedFood = await Food.findByIdAndDelete(foodId);
    console.log("deletedFood :", deletedFood);
    if (!deletedFood) {
      throw new MyError(`can not find Food with ${foodId} id`, 404);
    }

    res.status(200).json({
      message: `${foodId} id-тай хоол амжилттай устгалаа `,
      deletedFood,
    });
  } catch (error) {
    next(error);
  }
};
