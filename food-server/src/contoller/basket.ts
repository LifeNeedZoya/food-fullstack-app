import { NextFunction, Request, Response } from "express";
import Basket from "../model/basket";
import User from "../model/user";
import { IReq } from "../utils/interface";
import MyError from "../utils/myError";

export const getAllOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    const basket = await Basket.find(token);
    console.log("getall");
    res.status(200).json({
      message: `Бүх захиалгыг амжилттай авлаа`,
      basket,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("GET");

    console.log("IIIID", req.user._id);
    const basket = await Basket.findOne({ userId: req.user._id }).populate(
      "foods.foodId",
      "name price image"
    );
    console.log("object", basket);
    res.status(200).json({
      message: `Захиалгыг амжилттай авлаа`,
      basket,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBasket = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;
    console.log("PARAMS :", req.params);

    const basket = await Basket.findOne({ userId: req.user._id });

    if (!basket) {
      throw new MyError("basket uuseegui bn", 404);
    }

    console.log("BASKET", basket);
    const findIndexOfFood = (e: any) => {
      return e.foodId == foodId;
    };

    const foodIndex = basket.foods.findIndex(findIndexOfFood);
    console.log("III", foodIndex);

    basket.foods.splice(foodIndex, 1);
    console.log("BASKET", basket);

    await basket?.save();
    console.log("BASKET", basket);
    res.status(200).json({
      message: `Захиалгыг амжилттай устгалаа`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foods } = req.body;
    const userId = req.user._id;

    const basket = await Basket.findOne({ userId: userId });

    if (!basket) {
      console.log("REQ BODY :", req.body);

      const findOrder = await Basket.create({
        foods: req.body.foods,
        userId: userId,
      });
      return res.status(200).json({
        message: ` сагс амжилттай үүсгэлээ`,
        findOrder,
      });
    } else {
      const finIndexOfFood = (e: any) => {
        return e.foodId == foods.foodId;
      };

      const baskedIndex = basket?.foods.findIndex(finIndexOfFood);

      if (baskedIndex === undefined || baskedIndex === -1) {
        basket?.foods.push({ ...foods });
      } else {
        basket!.foods[baskedIndex].count += foods.count;
        basket!.foods[baskedIndex].foodId = foods.foodId;
      }

      await basket?.save();
      res.status(200).json({
        message: `захиалгыг амжилттай шинэчиллээ`,
      });
      console.log("succesfully updated basket");
    }
  } catch (error) {
    next(error);
  }
};
