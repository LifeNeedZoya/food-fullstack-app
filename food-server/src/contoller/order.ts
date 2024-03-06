import { NextFunction, Request, Response } from "express";
import { IReq } from "../utils/interface";
import User from "../model/user";
import MyError from "../utils/myError";
import Basket from "../model/basket";

// {
//   orderNo: String,
//   payment: {
//     paidAmount: Number,
//   },
//   address: {
//     Khoroo: { type: String },
//     Duureg: { type: String },
//     BuildingNo: { type: String },
//     Info: String,
//   },

// },

export const createOrder = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { address, basket } = req.body;
    const { user } = req;
    console.log("Basket", basket);

    if (!user || !address || !basket) {
      throw new MyError(`Хэрэглэгчийн мэдээлэл дутуу байна.`, 400);
    }

    const findUser = await User.findById(user._id);
    if (!findUser) {
      throw new MyError(`Хэрэглэгч олдсонгүй`, 400);
    }
    const newOrder = {
      orderNo: "#" + Math.floor(Math.random() * 100000), // generate
      products: basket.foods,
      payment: {
        paymentAmount: basket.totalPrice,
        status: "paid",
      },
      address: {
        ...address,
      },
      delivery: {
        status: "Progressing",
      },
    };
    console.log("ORDER", newOrder);

    user.orders.push(newOrder);
    await user.save();

    await Basket.findByIdAndDelete(basket._id);

    res.status(201).json({ message: "Захиалга амжилттай үүслээ." });
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
    const { orderId } = req.params;
    const findUser = await User.findByIdAndUpdate({ orders: { $set: [] } });
    res.status(200).json({ message: "Захиалга амжилттай шинэчлэгдлээ." });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("getOrders");
    console.log("REQ USER :", req.user);
    const { _id } = req.user;
    console.log("IID", _id);
    const findUser = await User.findById(_id);

    const orders = findUser?.orders;
    console.log("orders", orders);

    res.status(200).json({ message: "Захиалга амжилттай авлаа.", orders });
  } catch (error) {
    next(error);
  }
};
