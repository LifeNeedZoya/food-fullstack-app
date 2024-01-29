"use strict";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_HOST,
  port: 465,
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "tserenyanjinb216@gmail.com",
    pass: "xcnkyhhwktkbrkdl",
  },
});

export const sendEmail = async (email: string, otp: string) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "reset email",
    text: "Hello world?",
    html: `<div>
    <h1>Email reset code is ${otp}</h1>
    </div>`,
  });
};
