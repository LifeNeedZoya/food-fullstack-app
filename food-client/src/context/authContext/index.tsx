"use client";
import { PropsWithChildren, createContext, useState } from "react";
import MyAxios from "@/utils/axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const UserContext = createContext<IUserContext>({
  user: {
    name: "",
    email: "",
    address: "",
    password: "",
    rePassword: "",
    avatarImg: "",
  },
  login: async () => {},
  signup: async () => {},
});

interface IUser {
  name: string;
  email: string;
  address: string;
  password?: string;
  rePassword?: string;
  avatarImg?: string;
}

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
}

interface ILogin {
  password: string;
  email: string;
}
export const UserProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
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
      await MyAxios.post("/auth/signup", {
        email,
        name,
        password,
        address,
        avatarImg,
      });
      await Swal.fire({
        position: "top-end",
        title: "Та амжилттай бүртгүүллээ",
        text: "E-mail хаягруу баталгаажуулах линк явууллаа",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/login");
    } catch (error) {
      console.log("err", error);
      toast.error(` ${error.response.data.message as string}`);
    }
  };

  const login = async ({ email, password }: ILogin) => {
    try {
      await MyAxios.post("/auth/login", {
        email,
        password,
      });
      await Swal.fire({
        position: "top-end",
        title: "амжилттай Нэвтрэлээ",
        text: "E-mail хаягруу баталгаажуулах линк явууллаа",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      toast.error(`${error.response.data.message as string}`);
      console.log("err", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, signup }}>
      {children}
    </UserContext.Provider>
  );
};
