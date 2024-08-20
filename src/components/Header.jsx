import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggleButton from "./DarkModeToggleButton";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { href: "/work", label: "work" },
    { href: "/about", label: "about" },
    { href: "/contact", label: "contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(
    function () {
      if (isOpen) {
        document.addEventListener("click", handleClickOutside);
      } else {
        document.removeEventListener("click", handleClickOutside);
      }
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [isOpen]
  );

  return (
    <header className="header">
      <Link className="header-title hover:scale-50 duration-200" href="/work">
        yoav hainebach
      </Link>
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-secondaryGray outline-none"
        >
          ☰
        </button>
      </div>
      <nav className="hidden md:flex space-x-2">
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
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-16 right-4 bg-backgroundColor shadow-md rounded-lg p-4 z-50 md:hidden"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                className={`nav-link hover:font-semibold ${
                  router.pathname === href
                    ? "text-gray-300 pointer-events-none cursor-default"
                    : ""
                }`}
                href={href}
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {label}
              </Link>
            ))}
            <DarkModeToggleButton />
          </nav>
        </div>
      )}
    </header>
  );
}
