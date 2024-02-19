import ThemeProvider from "@/theme";
import "./globals.css";
import UserProvider from "@/context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <UserProvider>{children}</UserProvider>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
