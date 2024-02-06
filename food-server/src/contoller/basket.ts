import { NextFunction, Request, Response } from "express";
import Basket from "../model/basket";

export const getAllOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Basket.find();

    res.status(200).json({
      message: `Бүх захиалгыг амжилттай авлаа`,
      orders,
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

export const deleteOrder = async (
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
    const { orderId } = req.body;
    const findOrder = await Basket.findByIdAndUpdate(orderId);

    res.status(200).json({
      message: `захиалгыг амжилттай шинэчиллээ`,
      findOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newOrder } = req.body;
    const findOrder = await Basket.create(newOrder);

    res.status(200).json({
      message: ` захиалгыг амжилттай үүсгэлээ`,
      findOrder,
    });
  } catch (error) {
    next(error);
  }
};
