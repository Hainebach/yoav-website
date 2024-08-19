import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggleButton from "./DarkModeToggleButton";

export default function Header() {
  const router = useRouter();

  const navLinks = [
    { href: "/work", label: "work" },
    { href: "/about", label: "about" },
    { href: "/contact", label: "contact" },
  ];

  return (
    <header className="header">
      <Link className="header-title hover:scale-50 duration-200" href="/work">
        yoav hainebach
      </Link>
      <nav>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            className={`nav-link hover:font-semibold ${
              router.pathname === href
                ? "text-gray-300 pointer-events-none cursor-default"
                : ""
            }`}
            href={href}
          >
            {label}
          </Link>
        ))}
        <DarkModeToggleButton />
      </nav>
    </header>
  );
}
