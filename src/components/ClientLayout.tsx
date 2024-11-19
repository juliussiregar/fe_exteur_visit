"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <SidebarProvider>
      <div className={`flex flex-1 ${isLoginPage ? "" : "flex-row"}`}>
        {/* Sidebar hanya muncul jika bukan halaman login */}
        {!isLoginPage && <AppSidebar />}
        {/* Konten Utama */}
        
        <main className="flex-1 p-4 bg-white">
            <SidebarTrigger/>
            {children}
            </main>
      </div>

      {/* Notifikasi */}
      <Toaster position="top-right" reverseOrder={false} />
    </SidebarProvider>
  );
}
