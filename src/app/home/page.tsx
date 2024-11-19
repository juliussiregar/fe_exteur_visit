"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ClientLayout from "@/components/ClientLayout";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };



  return (
    <ClientLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary">
            Welcome, {session?.user?.name || "User"}!
          </h1>
          <Button
            onClick={handleLogout}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </Button>
        </div>
        <p className="text-text mb-6">Here are some features of our app:</p>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {["Feature 1", "Feature 2", "Feature 3"].map((feature, index) => (
            <div
              key={index}
              className="p-4 bg-light rounded-lg shadow hover:shadow-lg transition focus:outline-none focus:ring focus:ring-secondary"
            >
              <h2 className="text-xl font-bold text-primary">{feature}</h2>
              <p className="text-text">
                Details about {feature.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold text-secondary">Session Token</h2>
          <pre className="mt-2 p-2 bg-gray-200 rounded text-sm overflow-auto">
            {session?.user?.accessToken
              ? JSON.stringify(session.user.accessToken, null, 2)
              : "No token available"}
          </pre>
        </div>
      </div>
    </ClientLayout>
  );
}
