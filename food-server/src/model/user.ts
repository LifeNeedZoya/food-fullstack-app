import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
  avatarImg: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
  address: {
    street: {
      type: String,
    },
    noBuilding: {
      type: String,
    },
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
});

// userSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = model("User", userSchema);

export default User;
