import { model, Schema } from "mongoose";

const BasketSchema = new Schema({
  food: {
    type: Schema.ObjectId,
    ref: "Food",
    required: true,
  },
});

const Basket = model("Basket", BasketSchema);
export default Basket;
