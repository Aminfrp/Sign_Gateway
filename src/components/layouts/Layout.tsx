import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <>
      <Header />
      <main dir="rtl" className="flex flex-col flex-1 bg-[#FAFBFC]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
