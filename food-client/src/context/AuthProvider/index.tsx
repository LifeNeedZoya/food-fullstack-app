"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import MyAxios from "@/utils/axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BasketContext } from "../BasketProvider";

interface IUser {
  name: string;
  email: string;
  address: string;
  password?: string;
  rePassword?: string;
  avatarImg?: string;
}

export interface ILoggedUser {
  name: string;
  email: string;
  address: string;
  _id: string;
}
export const UserContext = createContext<IUserContext>({
  loggedToken: "",
  login: async () => {},
  signup: async () => {},
  getUserFromLocalStrorage: async () => {},
  user: {
    name: "",
    email: "",
    address: "",
    password: "",
    rePassword: "",
    avatarImg: "",
  },
  loggedUser: {} as ILoggedUser,
});

interface ISignUp {
  name: string;
  password: string;
  email: string;
  address?: string;
  avatarImg?: string;
}

interface IUserContext {
  user: IUser;
  login: ({ email, password }: ILogin) => {};
  logout?: () => {};
  signup?: ({ name, email, password, address, avatarImg }: ISignUp) => {};
  getUserFromLocalStrorage: () => {};
  loggedUser: ILoggedUser;
  loggedToken: string | null | undefined;
}

interface ILogin {
  password: string;
  email: string;
}
const UserProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<ILoggedUser>({
    name: "",
    email: "",
    address: "",
    _id: "",
  });
  const [loggedToken, setLoggedToken] = useState<string | null>();

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    address: "",
    password: "",
    rePassword: "",
  });

  const signup = async ({
    name,
    email,
    password,
    address,
    avatarImg,
  }: ISignUp) => {
    try {
      await axios.post("http://localhost:8080/auth/signup", {
        email,
        name,
        password,
        address,
        avatarImg,
      });
      await Swal.fire({
        position: "center",
        title: "Та амжилттай бүртгүүллээ",
        text: "E-mail хаягруу баталгаажуулах линк явууллаа",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/login");
    } catch (error: any) {
      console.log("err", error);
      toast.error(`${error.response.data.message as string}`);
    }
  };

  const login = async ({ email, password }: ILogin) => {
    try {
      console.log("User");
      const {
        data: { token, user },
      } = await axios.post("http://localhost:8080/auth/login", {
        userEmail: email,
        userPassword: password,
      });

      await Swal.fire({
        position: "center",
        title: "амжилттай Нэвтрэлээ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));

      router.push("/");
    } catch (error: any) {
      toast.error(` Error ${error.response.data.message as string}`);
      console.log("err", error);
    }
  };

  const getUserFromLocalStrorage = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      console.log("log", storedUser);
      if (!storedUser || !storedToken) {
        toast.error("go to signup ");
      }

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setLoggedUser(parsedUser);
      }

      if (storedToken) {
        try {
          const parsedToken = JSON.parse(storedToken);
          setLoggedToken(parsedToken);
        } catch (error) {
          console.error("Failed to parse token :", error);
        }
      }
    } catch (error: any) {
      alert("Get Error - " + error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    getUserFromLocalStrorage();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        signup,
        getUserFromLocalStrorage,
        loggedUser,
        loggedToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
