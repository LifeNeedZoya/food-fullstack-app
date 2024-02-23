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

interface IBasketContext {
  foods: IFood[];
  count: number | undefined;
  addCount: () => void;
  minusCount: () => void;
  addFood?: () => {} | any;
  createBasket?: () => void;
  basketFoods: IFood[];
  updateBasket: () => void;
  basketArray: [];
}

export const BasketContext = createContext({} as IBasketContext);

const BasketProvider = ({ children }: PropsWithChildren) => {
  const [foods, setFoods] = useState([]);
  const [foodId, setFoodId] = useState([]);
  const [basketFoods, setBasketFoods] = useState([]);
  const [count, setCount] = useState(1);
  const basketArray = [];

  const { loggedUser } = useContext(UserContext);
  console.log("LOOOGGED", loggedUser);

  const getBasket = async () => {
    const {
      data: { basket },
    } = await axios.get(
      "http://localhost:8080/basket/65cf2def79557cced6d3c091"
    );
    console.log(foods);
    setBasketFoods(foods);
  };

  const createBasket = async () => {
    try {
      await axios.post("http://localhost:8080/basket", {
        foods: { count: count, foodId: foodId },
        userId: loggedUser?._id,
      });
      toast.success("success");
    } catch (error: any) {
      toast.error("Error", error);
      console.log("ERR", error);
    }
  };

  const updateBasket = async () => {
    try {
      const data = await axios.put(
        "http://localhost:8080/basket/65cf2def79557cced6d3c091",
        {
          foods: { count: count, foodId: foodId },
          userId: loggedUser?._id,
        }
      );

      basketArray.push(data);
      toast.success("success");
    } catch (error: any) {
      toast.error("Error", error);
      console.log("ERR", error);
    }
  };

  const deleteBasketItem = async () => {
    try {
      await axios.post(
        "http://localhost:8080/basket/65cf2def79557cced6d3c091",
        {
          foods: { count: count, foodId: foodId },
          user: loggedUser?._id,
        }
      );
    } catch (error: any) {
      toast.error("Error", error);
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

  const addFood = (id: any) => {
    setFoodId(id);
    console.log("Id", id);
  };

  useEffect(() => {
    getBasket();
  }, []);

  return (
    <BasketContext.Provider
      value={{
        foods,
        count,
        addCount,
        minusCount,
        addFood,
        createBasket,
        basketFoods,
        updateBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
