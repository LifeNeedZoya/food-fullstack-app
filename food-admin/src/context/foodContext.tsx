"use client";
import myAxios from "@/utils/axios";
import {
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
  refresh: boolean;
  setRefresh: (boolean: boolean) => void;
}

export const FoodContext = createContext({} as IFoodContext);

const FoodProvider = ({ children }: PropsWithChildren) => {
  const [food, SetFood] = useState();
  const [foods, setFoods] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const deleteFood = async (foodId: string) => {
    try {
      console.log("id", foodId);
      await myAxios.delete(`/food/${foodId}`);

      toast.success(`success`);
      setRefresh(!refresh);
    } catch (error) {
      toast.error(`Error : ${error}`);
      console.log("ERR", error);
    }
  };

  const getFoods = async () => {
    try {
      const {
        data: { foods },
      } = await myAxios.get("/food");

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
    <FoodContext.Provider
      value={{ food, foods, deleteFood, refresh, setRefresh }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;
