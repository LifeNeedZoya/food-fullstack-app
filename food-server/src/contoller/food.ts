import { NextFunction, Request, Response } from "express";
import Food from "../model/food";
import MyError from "../utils/myError";

export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newFood = req.body;
    Food.create(newFood);
    res.status(200).json({ message: "Хоол амжилттай үүслээ" });
  } catch (error) {
    next(error);
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

    const deletedFood = await Food.findByIdAndDelete(foodId);
    if (!deletedFood) {
      throw new MyError(`can not find Food with ${foodId} id`, 404);
    }
    res.status(200).json({
      message: `${foodId} id successfully deleted`,
      deletedFood,
    });
  } catch (error) {
    next(error);
  }
};
