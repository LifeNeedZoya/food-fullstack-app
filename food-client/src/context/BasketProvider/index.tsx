"use client";
import React, {
  ChangeEvent,
  PropsWithChildren,
  PropsWithoutRef,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IFood } from "../FoodProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../AuthProvider";

interface IBasket {
  count: string;
  foodId: IFood;
  _id: string;
}

interface IBasketContext {
  count: number | undefined;
  addCount: () => void;
  minusCount: () => void;
  basketFoods: IBasket[] | undefined[];
  updateBasket: (id: string) => void;
  deleteBasketItem: (foodId: string) => void;
}

export const BasketContext = createContext({} as IBasketContext);

const BasketProvider = ({ children }: PropsWithChildren) => {
  // const [foodId, setFoodId] = useState<string | null>(null);
  const [basketFoods, setBasketFoods] = useState([]);
  const [count, setCount] = useState(1);

  const { loggedUser, loggedToken } = useContext(UserContext);

  const getBasket = async () => {
    const {
      data: { basket },
    } = await axios.get(`http://localhost:8080/basket/${loggedUser?._id}`);
    setBasketFoods(basket?.foods);
  };

  let foodId = "";

  const updateBasket = async (id: string) => {
    try {
      foodId = id;
      const data = await axios.put(
        `http://localhost:8080/basket/${loggedUser?._id}`,
        {
          foods: { count: count, foodId: foodId },
          userId: loggedUser?._id,
        }
      );

      toast.success("success");
    } catch (error: any) {
      toast.error("Error", error);
      console.log("ERR", error);
    } finally {
      setCount(1);
      foodId = "";
    }
  };

  const deleteBasketItem = async (foodId: string) => {
    try {
      console.log("id", foodId);
      await axios.delete(`http://localhost:8080/basket/${foodId}`, {
        headers: {
          Authorization: `Bearer ${loggedToken}`,
        },
      });
      toast.success(`success`);
    } catch (error) {
      toast.error(`Error : ${error}`);
      console.log("ERR", error);
    }
  };

  const addCount = () => {
    setCount(count + 1);
  };

  const minusCount = () => {
    if (count < 2) {
      toast.error("тоо 1с их байх ёстой");
    } else {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    getBasket();
  }, [updateBasket]);

  return (
    <BasketContext.Provider
      value={{
        count,
        addCount,
        minusCount,
        basketFoods,
        deleteBasketItem,
        updateBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
