import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Mantra App",
  description: "Face Recognition Absen App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <SessionProviderWrapper>
          <Header />
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
