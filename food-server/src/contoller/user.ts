import { Request, Response } from "express";
import User from "../model/user";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({ message: "Шинэ хэрэглэгч үүслээ.", user });
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
    res.status(201).json({ message: "Хэрэглэгч амжилтgui ", error });
  }
};

export const verifyAccount = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await sendEmail(email, "Verify Account for Food platform");

    res.status(201).json({ message: "Email амжилттай илгээгдлээ." });
  } catch (error) {
    console.log("ERR", error);
    res.status(400).json({
      message: "Email илгээх үед алдаа гарлаа.",
      error,
    });
  }
};
