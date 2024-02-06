import { model, Schema } from "mongoose";

const BasketSchema = new Schema({
  food: {
    type: Schema.ObjectId,
    ref: "Food",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Count: {
    type: Number,
    default: 1,
  },
});

const Basket = model("Basket", BasketSchema);
export default Basket;
