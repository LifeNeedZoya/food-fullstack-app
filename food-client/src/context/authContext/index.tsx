"use client";
import { PropsWithChildren, createContext, useState } from "react";

export const UserContext = createContext<IUserContext>({
  user: {
    name: "",
    email: "",
    address: "",
    password: "",
    rePassword: "",
  },
  login: function (): void {},
});

interface IUser {
  name: string;
  email: string;
  address: string;
  password?: string;
  rePassword?: string;
}

interface IUserContext {
  user: IUser;
  login: () => void;
  logout?: () => void;
  signup?: () => void;
}

interface IProps {
  children: any;
}

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    address: "",
    password: "",
    rePassword: "",
  });

  return (
    <UserContext.Provider value={{ user, login: () => {} }}>
      {children}
    </UserContext.Provider>
  );
};
