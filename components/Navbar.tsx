"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import WonogiriLogo from "@/components/WonogiriLogo";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", href: "/", activeRule: (path: string) => path === "/" },
    { name: "Profil Desa", href: "/profil", activeRule: (path: string) => path.startsWith("/profil") },
    { name: "Berita", href: "/berita", activeRule: (path: string) => path.startsWith("/berita") },
    { name: "UMKM", href: "/umkm", activeRule: (path: string) => path.startsWith("/umkm") },
    { name: "Potensi Desa", href: "/potensi", activeRule: (path: string) => path.startsWith("/potensi") },
    { name: "Galeri", href: "/galeri", activeRule: (path: string) => path.startsWith("/galeri") },
  ];

  return (
    <div className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <WonogiriLogo className="brand-mark" />
          <span className="brand-text">
            Desa Sukoharjo
            <span>Kec. Tirtomoyo · Kab. Wonogiri</span>
          </span>
        </Link>
        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="Buka menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
        <ul className={cn("nav-links", isOpen && "open")} id="navLinks">
          {navLinks.map((link) => {
            const isActive = link.activeRule(pathname);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(isActive && "active")}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
