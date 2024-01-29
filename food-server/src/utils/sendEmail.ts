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

export const sendEmail = async (email: string, subject: string) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: "Hello world?",
    html: `<div>
    <h1>${subject}</h1>
    </div>`,
  });
};
