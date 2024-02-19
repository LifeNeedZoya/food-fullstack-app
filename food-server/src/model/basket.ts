import { model, Schema } from "mongoose";

const BasketSchema = new Schema({
  foods: [
    {
      type: Schema.ObjectId,
      ref: "Food",
      required: true,
    },
  ],
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  count: {
    type: Number,
    default: 1,
  },
  isPurchased: { type: Boolean },
});

const Basket = model("Basket", BasketSchema);
export default Basket;
