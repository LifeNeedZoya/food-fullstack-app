"use client";

import myAxios from "@/utils/axios";

import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface ICategory {
  name: string;
  _id: string;
}

interface ICategoryContext {
  category: string | undefined;
  categories: ICategory[];
  refresh: boolean;
  setRefresh: (boolean: boolean) => void;
}

export const CategoryContext = createContext({} as ICategoryContext);

const CategoryProvider = ({ children }: PropsWithChildren) => {
  const [category, SetCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getCategory = async () => {
    try {
      const {
        data: { categories },
      } = await myAxios.get("/category");

      setCategories(categories);
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, [refresh]);
  return (
    <CategoryContext.Provider
      value={{ category, categories, refresh, setRefresh }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
