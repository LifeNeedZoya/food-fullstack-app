import { NextFunction, Request, Response } from "express";
import Basket from "../model/basket";

export const getAllOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    const basket = await Basket.find(token);

    res.status(200).json({
      message: `Бүх захиалгыг амжилттай авлаа`,
      basket,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.body;
    const findOrder = await Basket.find(orderId);

    res.status(200).json({
      message: `Захиалгыг амжилттай авлаа`,
      findOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBasket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.body;
    const findOrder = await Basket.findByIdAndDelete(orderId);

    res.status(200).json({
      message: `Захиалгыг амжилттай устгалаа`,
      findOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId, userId } = req.body;
    console.log("req", req.body);
    const newOrder = req.body;
    console.log("req", newOrder);

    const findOrder = await Basket.findByIdAndUpdate(
      userId,
      { $set: { orderId, userId } },
      { new: true }
    );

    res.status(200).json({
      message: `захиалгыг амжилттай шинэчиллээ`,
      findOrder,
    });
    console.log("succesfully updated basket");
  } catch (error) {
    next(error);
  }
};

export const createBasket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("REQ BODY :", req.body);

    const newBasket = req.body;
    const findOrder = await Basket.create(req.body);
    res.status(200).json({
      message: ` сагс амжилттай үүсгэлээ`,
      findOrder,
    });
    console.log("сагс амжилттай үүсгэлээ");
  } catch (error) {
    next(error);
  }
};
