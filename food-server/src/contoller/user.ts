import { Request, Response } from "express";
import User from "../model/user";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    const user = await User.create({ ...newUser, password: hashedPassword });
    const verifyToken = jwt.sign(
      { email: user.email },
      process.env.JWT_PRIVATE_KEY as string,
      {
        expiresIn: "5m",
      }
    );
    await sendEmail({ email: user.email, token: verifyToken });
    res.status(201).json({
      message:
        "Шинэ хэрэглэгч амжилттай бүртгэгдлээ таны бүртгэлтэй имэйл хаяг руу баталгаажуулах email илгээсэн.",
    });
    res.status(200).json({
      message: "Шинэ хэрэглэгч үүслээь Таны руу имэйл игээсэн",
      newUser,
    });
  } catch (error) {
    res.status(400).json({ message: "Error occured while adding new user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("aaa");
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res
        .status(400)
        .json({ message: `Имэйл эсвэл нууц үг буруу байна.` });
    }
    console.log("bbbb");
    jwt.verify;
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_PRIVATE_KEY as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    console.log("CCCC");
    res.status(201).json({ message: "Хэрэглэгч амжилттай нэвтэрлээ", token });
  } catch (error) {
    res.status(201).json({ message: `Хэрэглэгч амжилтgui ${error}` });
    console.log("err", error);
  }
};
