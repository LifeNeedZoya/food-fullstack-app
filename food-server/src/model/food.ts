import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    maxLength: [50, "category can not be longer than 50"],
  },
  description: {
    type: String,
    required: [true, "category is required"],
  },
  price: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  isSale: { type: Boolean, default: false },
  image: {
    type: String,
    default: "no-category-photo",
  },
  category: {
    type: Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Food = model("Food", foodSchema);

export default Food;
