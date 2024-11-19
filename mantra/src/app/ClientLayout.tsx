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
      <SidebarComponent />

      {/* Konten utama */}
      <main className="flex-1 p-6 bg-background ml-[250px] pt-[64px]">
        {/* Wrapper untuk konten agar rapi */}
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      {/* Notifikasi */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
