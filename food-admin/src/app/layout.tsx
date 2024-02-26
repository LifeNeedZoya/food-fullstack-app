import ThemeProvider from "@/theme";
import "./globals.css";
import UserProvider from "@/context/userContext";
import FoodProvider from "@/context/foodContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryProvider from "@/context/CategoryContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <UserProvider>
            <FoodProvider>
              <CategoryProvider>
                {children} <ToastContainer />
              </CategoryProvider>
            </FoodProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
