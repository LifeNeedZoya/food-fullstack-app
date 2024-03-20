"use client";

import axios from "axios";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "react";
import Myaxios from "@/utils/axios";
import { toast } from "react-toastify";

export const FoodContext = createContext({} as IFoodsContext);

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

interface IFoodsContext {
  getFoods: () => void;
  foodData: IFood[];
  isLoading: boolean;
}

const FoodProvider = ({ children }: PropsWithChildren) => {
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFoods = async () => {
    try {
      const {
        data: { foods },
      } = await Myaxios.get("/food");
      setFoodData(foods);

      console.log("FOOD DATA: ", foodData);

      setIsLoading(false);
    } catch (error: any) {
      toast.error("err", error);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);
  return (
    <FoodContext.Provider value={{ getFoods, foodData, isLoading }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;
