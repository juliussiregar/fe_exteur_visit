"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <header className="bg-primary text-primary-foreground p-4 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold text-white">Mantra App</h1>
                <nav className="flex items-center gap-4">
                    <ul className="flex gap-4">
                        <li>
                            <Link
                                href="/home"
                                className="hover:text-secondary transition focus:outline-none focus:ring focus:ring-secondary text-white"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="hover:text-secondary transition focus:outline-none focus:ring focus:ring-secondary text-white"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="hover:text-secondary transition focus:outline-none focus:ring focus:ring-secondary text-white"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    {session && (
                        <button
                            onClick={handleLogout}
                            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-primary transition"
                        >
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>


    );
}
