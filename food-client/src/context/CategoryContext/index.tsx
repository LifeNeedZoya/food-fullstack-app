"use client";
import myAxios from "@/utils/axios";
import React, {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

interface ICategory {
  name: string;
  _id: string;
}

interface ICategoryContext {
  categories: ICategory[];
  getCategories: () => void;
  chosenCategory: string;
  HandleClickCategory: (id: string) => void;
}

export const CategoryContext = createContext({} as ICategoryContext);

const CategoryProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState(
    "65bccbf8cfc2bc3551a49ea4"
  );

  const getCategories = async () => {
    try {
      console.log("cate");
      const {
        data: { categories },
      } = await myAxios.get("/category");

      setCategories(categories);
      console.log("Categories from backend", categories);
    } catch (error: any) {
      toast.error("error");
    }
  };

  const HandleClickCategory = (id: string) => {
    setChosenCategory(id);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ getCategories, categories, HandleClickCategory, chosenCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
