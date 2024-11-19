// src/app/page.tsx
"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold">Welcome to the App</h1>
      {session ? (
        <>
          <p className="text-center mt-4">Hello, {session.user.name}</p>
          <pre className="mt-4">{JSON.stringify(session.user, null, 2)}</pre>
        </>
      ) : (
        <p className="text-center mt-4">Please log in to see your information.</p>
      )}
    </div>
  );
}
