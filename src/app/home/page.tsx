"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-muted">Loading session...</p>;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-secondary mb-4">
        Welcome, {session.user.name || "User"}
      </h1>
      <p className="text-text mb-6">
        Email: {session.user.email || "No email available"}
      </p>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {["Feature 1", "Feature 2", "Feature 3"].map((feature, index) => (
          <div
            key={index}
            className="p-4 bg-light rounded-lg shadow hover:shadow-lg transition focus:outline-none focus:ring focus:ring-secondary"
          >
            <h2 className="text-xl font-bold text-primary">{feature}</h2>
            <p className="text-text">Details about {feature.toLowerCase()}.</p>
          </div>
        ))}
      </div>
    </div>


  );
}
