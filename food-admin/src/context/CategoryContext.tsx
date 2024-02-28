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
      } = await axios.get("http://localhost:8080/category");

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
