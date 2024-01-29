import { Request, Response } from "express";

import { sendEmail } from "../utils/sendEmail";
import User from "../model/user";
import bcrypt from "bcrypt";

export const sendEmailToUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log("email", email);
    const otp = Math.round(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    console.log("OTP", otp);
    const salt = await bcrypt.genSalt(10);

    findUser.otp = await bcrypt.hash(otp, salt);

    await findUser.save();
    await sendEmail(email, otp);

    res.status(201).json({ message: "Email амжилттай илгээгдлээ." });
  } catch (error) {
    console.log("ERR", error);
    res.status(400).json({
      message: "Email илгээх үед алдаа гарлаа.",
      error,
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const findUser = await User.findOne({ email });
    console.log("USER", findUser);
    if (!findUser) {
      return res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    const validOtp = await bcrypt.compare(otp, findUser?.otp);

    if (!validOtp) {
      return res.status(400).json({ message: "Код буруу байна" });
    }
    console.log("valid", validOtp);
    res.status(200).json({ message: "OTP is validated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server is internal error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.status(400).json({ message: "no user" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await findUser?.updateOne({ password: hashedPassword });
    await findUser?.save();
    res.status(400).json({ message: "Нууц үг солих амжилттай боллоо" });
  } catch (error) {
    res.status(400).json({ message: "Нууц үг солих  амжилтgui боллоо", error });
    console.log("err", error);
  }
};
