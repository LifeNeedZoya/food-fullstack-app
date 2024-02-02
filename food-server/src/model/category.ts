import { Schema, model } from "mongoose";

const categorSchema = new Schema({
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
  image: {
    type: String,
    default: "no-category-photo",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = model("Category", categorSchema);

export default Category;
