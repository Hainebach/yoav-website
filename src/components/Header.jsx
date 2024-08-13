import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggleButton from "./DarkModeToggleButton";
import { color } from "framer-motion";

export default function Header() {
  const router = useRouter();

  return (
    <header className="header">
      <Link className="header-title hover:scale-75 duration-200" href="/">
        yoav hainebach
      </Link>
      <nav>
        <Link
          className={`nav-link hover:font-semibold ${
            router.pathname === "/work" ? "text-gray-300" : ""
          }`}
          href="/work"
        >
          Work
        </Link>
        <Link
          className={`nav-link hover:font-semibold ${
            router.pathname === "/about" ? "text-gray-300" : ""
          }`}
          href="/about"
        >
          About
        </Link>
        <Link
          className={`nav-link hover:font-semibold ${
            router.pathname === "/contact" ? "text-gray-300" : ""
          }`}
          href="/contact"
        >
          Contact
        </Link>
        <DarkModeToggleButton className="toggleButton" />
      </nav>
    </header>
  );
}
