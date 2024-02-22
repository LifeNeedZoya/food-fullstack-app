"use client";

import axios from "axios";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "react";

export const FoodContext = createContext({} as IFoodsContext);

export interface IFood {
  price: string;
  name: string;
  image: string;
  isSale: boolean;
  description: string;
  discountPrice: number;
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
      } = await axios.get("http://localhost:8080/food");
      setFoodData(foods);

      console.log("FOOD DATA: ", foodData);

      console.log("get foods successfully", foods);
      setIsLoading(false);
    } catch (error: any) {
      alert("Get Error - " + error.message);
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
