"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Provider } from 'react-redux';
import { Store } from '@/store/Store';

const inter = Inter({ subsets: ["latin"] });

 const metadata = {
  title: "Employee Management",
  description: "Employee Management App",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <Provider store={Store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>

  );
}

