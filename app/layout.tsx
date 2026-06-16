import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "ChorvaBozor.uz - Chorva mollari savdo platformasi",
  description: "O'zbekistondagi eng yirik chorva mollari savdo platformasi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Provider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" />
        </Provider>
      </body>
    </html>
  );
}
