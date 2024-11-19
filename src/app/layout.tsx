import React from "react";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mantra App",
  description: "Face Recognition Absen App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        {/* Wrapper untuk semua konten */}
        <SessionProviderWrapper>
          <div className="flex-1 flex flex-col">
            {/* Area konten */}
            {children}
          </div>
        </SessionProviderWrapper>

        {/* Footer di bagian bawah */}
        <footer className="w-full">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
