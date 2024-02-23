"use client";
import axios from "axios";
import React, {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";

interface ICategory {
  name: string;
  _id: string;
}

interface ICategoryContext {
  categories: ICategory[];
  getCategories: () => void;
}

export const CategoryContext = createContext({} as ICategoryContext);

const CategoryProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      console.log("cate");
      const {
        data: { categories },
      } = await axios.get("http://localhost:8080/category");

      setCategories(categories);
      console.log("Categories from backend", categories);
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ getCategories, categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
