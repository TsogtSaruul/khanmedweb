import React from "react";
// import { Helmet } from "react-helmet";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import ScrollUp from "../ScrollUp";


const Layout = ({ title, description, keywords, author, children }) => {
  
  return (
    <HelmetProvider>    
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <ScrollUp />      
      <Header />

      <main>
        <Toaster />
        {children}
      </main>

      <Footer />
    </HelmetProvider>
  );
};

Layout.defaultProps = {
  title: "Khan Med Hospital",
  description: "South Korean medicine in Mongolia",
  keywords: "Korea, Mongolia, Medicine",
  author: "Khan Med Hospital",
};

export default Layout;
