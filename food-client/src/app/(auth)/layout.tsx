import "../scss/globals.scss";

import Header from "@/components/navbar/Header";
import Footer from "@/components/navbar/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
