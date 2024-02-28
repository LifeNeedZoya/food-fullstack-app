import { NextFunction, Request } from "express";

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

export const createOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newOrder = {
      orderNo: 123,
      payment: {
        paidAmount: 341000,
      },
      address: {
        Khoroo: "11-r khoroo",
        Duureg: "3",
        BuildingNo: 45,
        Info: "String",
      },
    };
  } catch (error) {
    next(error);
  }
};
