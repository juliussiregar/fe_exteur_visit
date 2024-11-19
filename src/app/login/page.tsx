"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      toast.error("Invalid username or password");
    } else {
      toast.success("Login successful");
      router.push("/home");
    }
   
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === "a") {
        event.preventDefault();
        event.currentTarget.select();
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={120} height={120} />
        </div>
        <h1 className="text-center text-2xl font-bold text-secondary mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button type="submit" className="w-full bg-primary text-white hover:opacity-80">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
