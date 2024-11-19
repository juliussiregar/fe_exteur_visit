import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import {Toaster} from "react-hot-toast";

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
            <main>
              {children}
            </main>
        </SessionProviderWrapper>

        {/* Notifikasi */}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
