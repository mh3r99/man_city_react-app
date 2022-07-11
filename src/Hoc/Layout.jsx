import React from "react";
import Footer from "../components/Header_Footer/Footer";
import Header from "../components/Header_Footer/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
