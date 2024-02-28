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
  getBasket: () => void;
  minusCount: () => void;
  basketFoods: IBasket[] | undefined[];
  updateBasket: (id: string) => void;
  deleteBasketItem: (foodId: string) => void;
}

export const BasketContext = createContext({} as IBasketContext);

const BasketProvider = ({ children }: PropsWithChildren) => {
  const [basketFoods, setBasketFoods] = useState([]);
  const [count, setCount] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const { loggedUser, loggedToken } = useContext(UserContext);

  const getBasket = async () => {
    console.log("MIDDle", loggedToken);
    const {
      data: { basket },
    } = await axios.get(`http://localhost:8080/basket/user`, {
      headers: {
        Authorization: `Bearer ${loggedToken}`,
      },
    });
    console.log("BASKET_DATA :", basket);
    setBasketFoods(basket?.foods);
    toast.success("get basket foods successfully");
  };

  let foodId = "";

  const updateBasket = async (id: string) => {
    try {
      foodId = id;
      const data = await axios.put(
        `http://localhost:8080/basket/${loggedUser?._id}`,
        {
          foods: { count: count, foodId: foodId },
        }
      );
      setRefresh(!refresh);
      toast.success("Хоолыг амжилттай сагсанд нэмлээ");
    } catch (error: any) {
      toast.error("Хоолыг нэмэхэд алдаа гарлаа дахин оролдоно уу", error);
      console.log("ERR CLF+++++>", error);
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
      toast.success("Хоолыг амжилттай устгалаа");
      setRefresh(!refresh);
    } catch (error) {
      toast.error(`Хоолыг нэмэхэд алдаа гарлаа дахин оролдоно уу ${error}`);
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
    if (loggedToken != undefined) {
      getBasket();
    }
  }, [refresh, loggedToken]);

  return (
    <BasketContext.Provider
      value={{
        count,
        addCount,
        getBasket,
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
