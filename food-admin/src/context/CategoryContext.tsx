"use client";
import axios from "axios";
import react, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

interface ICategory {
  name: string;
  _id: string;
}

interface ICategoryContext {
  category: string | undefined;
  categories: ICategory[];
}

export const CategoryContext = createContext({} as ICategoryContext);

const CategoryProvider = ({ children }: PropsWithChildren) => {
  const [category, SetCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const {
        data: { categories },
      } = await axios.get("http://localhost:8080/category");

      setCategories(categories);
      console.log("get categories successfully");
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <CategoryContext.Provider value={{ category, categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
