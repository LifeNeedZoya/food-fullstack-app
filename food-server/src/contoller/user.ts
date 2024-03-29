import { NextFunction, Request, Response } from "express";
import User from "../model/user";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail";
import jwt from "jsonwebtoken";
import MyError from "../utils/myError";
import { emitWarning } from "process";
import { IReq } from "../utils/interface";

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
    const user = await User.findOne({ email }).select("+password").lean();

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
    console.log("Хэрэглэгч амжилттай нэвтэрлээ", user);
  } catch (error) {
    next(error);
  }
};

export const checkUserPassword = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.user;
    const { pass } = req.body;
    console.log("pass", pass);

    const user = await User.findOne({ email }).select("+password").lean();

    if (!user) {
      throw new MyError(`Хэрэглэгч олдсонгүй`, 400);
    }

    const isValid = await bcrypt.compare(pass, user.password);

    if (!isValid) {
      throw new MyError(`Нууц үг буруу байна`, 400);
    }

    res.status(201).json({
      message: "Хэрэглэгчийн нууц үг зөв байна",
      isValid: true,
    });
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

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Users = await User.find();

    res.status(200).json({
      message: `Захиалгыг амжилттай авлаа`,
      Users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const findUser = await User.find(userId);

    res.status(200).json({
      message: `Захиалгыг амжилттай авлаа`,
      findUser,
    });
  } catch (error) {
    next(error);
  }
};

export const changeUserData = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userData } = req.body;
    const { user } = req;

    if (!userData) {
      throw new MyError(`Хэрэглэгчийн мэдээлэл дутуу байна.`, 400);
    }

    const findUser = await User.updateMany(
      { _id: user._id },
      {
        $set: {
          name: userData.name,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
        },
      }
    );

    res.status(201).json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай өөрчиллөө.",
      findUser,
    });
    console.log("successfully changed user data", findUser);
  } catch (error) {
    next(error);
  }
};
