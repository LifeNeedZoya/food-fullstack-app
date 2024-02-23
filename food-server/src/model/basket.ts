import { model, Schema } from "mongoose";

const BasketSchema = new Schema({
  foods: [
    {
      foodId: {
        type: Schema.ObjectId,
        ref: "Food",
        required: true,
      },
      count: {
        type: Number,
        default: 1,
      },
    },
  ],
  userId: {
    type: Schema.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["active", "purchased"],
    default: "active",
  },
});

const Basket = model("Basket", BasketSchema);
export default Basket;
