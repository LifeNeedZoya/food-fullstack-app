import "./scss/globals.scss";
import { ThemeProvider } from "@/theme";
import Header from "@/components/navbar/Header";
import Footer from "@/components/navbar/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/context/authContext";

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
            <Header />
            {children}
            <ToastContainer />
            <Footer />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
