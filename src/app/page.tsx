"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BlankPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home"); // Arahkan ke /home jika sudah login
    } else if (status === "unauthenticated") {
      router.push("/login"); // Arahkan ke /login jika belum login
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return null; // Tidak ada konten yang ditampilkan
}
