"use client";

import React from "react";
import SidebarComponent from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      {/* Sidebar */}
      {/*<SidebarComponent />*/}

      {/* Konten utama */}
      <main>
        {/* Wrapper untuk konten agar rapi */}
        <div>{children}</div>
      </main>

      {/* Notifikasi */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
