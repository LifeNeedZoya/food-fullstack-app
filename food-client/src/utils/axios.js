import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const instanceAxios = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

export default instanceAxios;

///// BAgshiin dunction
// const createReq = async (url: string, foodItem: any) => {
//   const { data } = (await axios.post(url, foodItem, {
//     headers: { Authorization: `Bearer ${token}` },
//   })) as {
//     data: any;
//   };
//   return { basket: data.basket, message: data.message };
// };

// const FoodCard = ({ selectedFood }: IBasket) => {
//   const { food } = selectedFood;
//   const { updateFoodToBasket, deleteFoodFromBasket }: any =
//     useContext(BasketContext);
//   const [quantity, setQuantity] = useState(selectedFood.qty);

//   const handleQuantity = (operation: string, foodId: string) => {
//     console.log("FoodId", operation, foodId);
//     if (operation === "PLUS") {
//       quantity < 10 && setQuantity(quantity + 1);
//     } else {
//       quantity !== 1 && setQuantity(quantity - 1);
//     }

//     updateFoodToBasket({
//       foodId: food._id,
//       quantity: operation === "PLUS" ? quantity + 1 : quantity - 1,
//       totalPrice:
//         operation === "PLUS"
//           ? (quantity + 1) * food.price
//           : (quantity - 1) * food.price,
//     });
//   };

//   const handleRemove = () => {
//     console.log("remove basket", food?._id);
//     deleteFoodFromBasket(food?._id);
//   };
