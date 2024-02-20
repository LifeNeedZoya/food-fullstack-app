import React, { PropsWithChildren, useState } from "react";
import { createContext } from "react";

export const FoodContext = createContext({} as IFoods);

interface IFoods {
  getFoods: () => void;
}

const FoodProvider = ({ children }: PropsWithChildren) => {
  const [foods, setFoods] = useState([]);
  const getFoods = () => {};
  return (
    <FoodContext.Provider value={{ getFoods }}>{children}</FoodContext.Provider>
  );
};

export default FoodProvider;
