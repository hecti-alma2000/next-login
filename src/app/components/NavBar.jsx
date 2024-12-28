import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-zinc-900 shadow-md">
      <h1 className="text-2xl text-white font-bold">NextAuth</h1>
      <ul className="flex space-x-4 text-lg text-white">
        <li>
          <Link
            href="/"
            className="hover:text-zinc-400 transition-colors duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/auth/login"
            className="hover:text-zinc-400 transition-colors duration-300"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/auth/register"
            className="hover:text-zinc-400 transition-colors duration-300"
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
