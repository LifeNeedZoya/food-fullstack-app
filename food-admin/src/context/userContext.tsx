"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IUser {
  name: string;
  email: string;
  image: string;
}

interface IUserContext {
  users: IUser[];
  getUsers: () => void;
  getUserFromLocalStrorage: () => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

function UserProvider({ children }: any) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();

  const getUsers = async () => {
    try {
      const {
        data: { Users },
      } = await axios.get("http://localhost:8080/auth");

      setUsers(Users);

      console.log("get foods successfully");
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  const getUserFromLocalStrorage = async () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      toast.error("go to signup ");
    }

    console.log("get user from localStorage");
    try {
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, getUsers, getUserFromLocalStrorage }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
