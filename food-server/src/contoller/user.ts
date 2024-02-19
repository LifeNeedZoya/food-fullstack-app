import { NextFunction, Request, Response } from "express";
import User from "../model/user";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail";
import jwt from "jsonwebtoken";
import MyError from "../utils/myError";
import { emitWarning } from "process";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body;

    const user = await User.create({ ...newUser });
    const verifyToken = jwt.sign(
      { email: user.email },
      process.env.JWT_PRIVATE_KEY as string,
      {
        expiresIn: "20m",
      }
    );
    await sendEmail({ email: user.email, token: verifyToken });
    res.status(201).json({
      message:
        "Шинэ хэрэглэгч амжилттай бүртгэгдлээ таны бүртгэлтэй имэйл хаяг руу баталгаажуулах email илгээсэн.",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail, userPassword } = req.body;
    const email = userEmail;
    const user = await User.findOne({ email }).select("+password");

    if (user?.isVerified === false) {
      return res.status(401).json({ message: "Имэйлээ баталгаажуулана уу" });
    }
    if (!user) {
      throw new MyError(`Хэрэглэгч олдсонгүй`, 400);
      // return res.status(400).json({ message: "user does not exist" });
    }

    const isValid = await bcrypt.compare(userPassword, user.password);

    if (!isValid) {
      throw new MyError(`Нууц үг буруу байна`, 400);
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_PRIVATE_KEY as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    const { password, ...otherParams } = user;
    console.log("token", token);
    res.status(201).json({
      message: "Хэрэглэгч амжилттай нэвтэрлээ",
      token,
      user: otherParams,
    });
    console.log("Хэрэглэгч амжилттай нэвтэрлээ");
  } catch (error) {
    next(error);
  }
};

export const DeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new MyError(`Хэрэглэгч олдсонгүй`, 400);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new MyError(`Нууц үг буруу байна`, 400);
    }

    await User.deleteOne({ email: user.email });

    res.status(201).json({ message: "Хэрэглэгч амжилттай устлаа" });
  } catch (error) {
    next(error);
  }
};

export const UpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new MyError(`Хэрэглэгч олдсонгүй`, 400);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new MyError(`Нууц үг буруу байна`, 400);
    }

    await User.updateOne({ email, password, name });

    res.status(201).json({ message: "Хэрэглэгч амжилттай устлаа" });
  } catch (error) {
    next(error);
  }
};
