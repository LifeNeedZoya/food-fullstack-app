import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const orderSchema = new Schema({
  orderNo: String,
  payment: {
    paidAmount: Number,
    status: {
      type: String,
      enum: ["paid" || "unpaid"],
      default: "unpaid",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    paidDate: Date,
  },
  foods: [],
  address: {
    Khoroo: { type: String },
    Duureg: { type: String },
    BuildingNo: { type: String },
    Info: String,
  },
  delivery: {
    status: {
      type: String,
      enum: ["Pending", "Progressing", "Delivered"],
      default: "Pending",
    },
    deliveredAt: Date,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 6,
    select: false,
  },
  phonenumber: {
    type: Number,
  },
  avatarImg: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user", "moderator"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  orders: [orderSchema],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = model("User", userSchema);

export default User;
