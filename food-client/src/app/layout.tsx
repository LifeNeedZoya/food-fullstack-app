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
import BasketProvider from "@/context/BasketProvider";

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
              <BasketProvider>
                <CategoryProvider>
                  <Header />
                  {children}
                  <ToastContainer />
                  <Footer />
                </CategoryProvider>
              </BasketProvider>
            </FoodProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
