"use client";
import axios from "axios";
import react, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "./userContext";
import { toast } from "react-toastify";

export interface IFood {
  _id: string;
  price: string;
  name: string;
  image: string;
  isSale: boolean;
  description: string;
  discountPrice: number;
  count: string;
}

interface IFoodContext {
  food: string | undefined;
  deleteFood: (foodId: string) => void;
  foods: IFood[];
}

export const FoodContext = createContext({} as IFoodContext);

const FoodProvider = ({ children }: PropsWithChildren) => {
  const [food, SetFood] = useState();
  const [foods, setFoods] = useState([]);
  const { user } = useContext(UserContext);

  const deleteFood = async (foodId: string) => {
    try {
      console.log("id", foodId);
      await axios.delete(`http://localhost:8080/food/${foodId}`);

      toast.success(`success`);
    } catch (error) {
      toast.error(`Error : ${error}`);
      console.log("ERR", error);
    }
  };

  const getFoods = async () => {
    try {
      const {
        data: { foods },
      } = await axios.get("http://localhost:8080/food");

      setFoods(foods);
      console.log("get foods successfully");
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);
  return (
    <FoodContext.Provider value={{ food, foods, deleteFood }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;