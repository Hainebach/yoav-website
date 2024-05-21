import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link className="header-title" href="/work">
        yoav hainebach
      </Link>
      <nav>
        <Link className="nav-link" href="/work">
          Work
        </Link>
        <Link className="nav-link" href="/contact">
          Contact
        </Link>
        <Link className="nav-link" href="/about">
          About
        </Link>
      </nav>
    </header>
  );
}
