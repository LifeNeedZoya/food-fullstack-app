"use client";

import myAxios from "@/utils/axios";
import { redirect, useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IUser {
  name: string;
  email: string;
  image: string;
  _id: string;
}

interface IUserContext {
  user: IUser;
  users: IUser[];
  getUsers: () => void;
  getUserFromLocalStrorage: () => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

function UserProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    image: "",
    email: "",
    _id: "",
  });
  const [token, setToken] = useState<string | null>();
  const router = useRouter();

  const getUsers = async () => {
    try {
      const {
        data: { Users },
      } = await myAxios.post("/auth/login");

      setUsers(Users);

      console.log("get foods successfully", Users);
    } catch (error: unknown) {
      toast.error("Error : go to login");
    }
  };

  const getUserFromLocalStrorage = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (!storedUser || !storedToken) {
        toast.error(`Нэвтэрнэ үү`);
        router.push("/login");
      }

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }

      if (storedToken) {
        try {
          const parsedToken = JSON.parse(storedToken);
          setToken(parsedToken);
        } catch (error) {
          console.error("Failed to parse token :", error);
        }
      }

      console.log("get user from localStorage");
    } catch (error: any) {
      toast.error("Error :", error.message);
    }
  };

  useEffect(() => {
    if (!setToken) {
      getUsers();
    } else {
      getUserFromLocalStrorage();
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{ user, users, getUsers, getUserFromLocalStrorage }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
