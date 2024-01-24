import { Request, Response } from "express";
import User from "../model/user";
import * as bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  res.json({ message: "Шинэ хэрэглэгч үүслээ.", user });
};
