import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 mb-8">
      <Link className="text-2xl font-bold" href="/work">
        yoav hainebach
      </Link>
      <nav>
        <Link className="mr-4" href="/work">
          Work
        </Link>
        <Link className="mr-4" href="/contact">
          Contact
        </Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
