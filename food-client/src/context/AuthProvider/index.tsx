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
  phoneNumber: number;
}

interface IOrder {
  orderNo: string;
  delivery: {
    status: string;
  };
  _id: string;
  foods: [];
  payment: {
    status: string;
    paidDate: string;
  };
}

interface IUserContext {
  user: IUser;
  checkPassword: (pass: string) => {};
  orders: [IOrder] | null;
  login: ({ email, password }: ILogin) => {};
  logout: () => void;
  signup?: ({ name, email, password, address, avatarImg }: ISignUp) => {};
  getUserFromLocalStrorage: () => {};
  loggedUser: ILoggedUser;
  loggedToken: string | null | undefined;
  changeUserData: (userData: any) => void;
}

export const UserContext = createContext<IUserContext>({
  loggedToken: "",
  login: async () => {},
  checkPassword: async () => {},
  signup: async () => {},
  getUserFromLocalStrorage: async () => {},
  changeUserData: async () => {},
  logout: () => {},
  orders: [
    {
      orderNo: "",
      delivery: {
        status: "",
      },
      _id: "",
      foods: [],
      payment: {
        status: "",
        paidDate: "",
      },
    },
  ],
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

interface ILogin {
  password: string;
  email: string;
}

const UserProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<ILoggedUser>({
    _id: "",
    name: "",
    email: "",
    address: "",
    phoneNumber: 0,
  });
  const [loggedToken, setLoggedToken] = useState<string | null>();
  const [orders, setOrders] = useState<[IOrder] | null>(null);

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
      } = await MyAxios.post("/auth/login", {
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

  const checkPassword = async (pass: string) => {
    try {
      const {
        data: { isValid },
      } = await MyAxios.post(
        `/auth/checkPassword`,
        { pass },
        {
          headers: {
            Authorization: `Bearer ${loggedToken}`,
          },
        }
      );
      if (isValid) {
      }
    } catch (error) {
      toast.error("aldaa");
    }
  };

  const getOrders = async () => {
    try {
      const {
        data: { orders },
      } = await MyAxios.get("/order", {
        headers: { Authorization: `Bearer ${loggedToken}` },
      });
      setOrders(orders);
      console.log("orders", orders);
    } catch (error) {
      toast.error("алдаа гарлаа");
      console.log("алдаа гарлаа", error);
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
      console.log("err");
    }
  };

  const changeUserData = async ({ userData }: any) => {
    try {
      await MyAxios.post("/auth/signup", {
        userData,
      });
      await Swal.fire({
        position: "center",
        title: "Хэрэглэгчийн мэдээлэлийг амжилттай өөрчиллөө",
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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    getUserFromLocalStrorage();
    if (loggedToken) {
      getOrders();
    }
  }, [loggedToken]);

  return (
    <UserContext.Provider
      value={{
        logout,
        user,
        login,
        signup,
        orders,
        loggedUser,
        loggedToken,
        checkPassword,
        changeUserData,
        getUserFromLocalStrorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
