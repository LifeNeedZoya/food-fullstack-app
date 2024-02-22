"use client";

import "./scss/globals.scss";
import { ThemeProvider } from "@/theme";
import Header from "@/components/navbar/Header";
import Footer from "@/components/navbar/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "@/context/AuthProvider";
import FoodProvider from "@/context/FoodProvider";
import CategoryProvider from "@/context/CategoryContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <UserProvider>
            <FoodProvider>
              <CategoryProvider>
                <Header />
                {children}
                <ToastContainer />
                <Footer />
              </CategoryProvider>
            </FoodProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
