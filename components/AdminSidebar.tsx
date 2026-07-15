"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Ringkasan",
      href: "/admin/dashboard",
      activeRule: (path: string) => path === "/admin/dashboard",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" width="18" height="18">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      ),
    },
    {
      name: "Kelola Berita",
      href: "/admin/dashboard/berita",
      activeRule: (path: string) => path.startsWith("/admin/dashboard/berita"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" width="18" height="18">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      name: "Kelola Galeri",
      href: "/admin/dashboard/galeri",
      activeRule: (path: string) => path.startsWith("/admin/dashboard/galeri"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" width="18" height="18">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      name: "Kelola Potensi",
      href: "/admin/dashboard/potensi",
      activeRule: (path: string) => path.startsWith("/admin/dashboard/potensi"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" width="18" height="18">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
          <line x1="12" y1="22" x2="12" y2="15.5" />
          <polyline points="22 8.5 12 15.5 2 8.5" />
          <polyline points="2 15.5 12 15.5 22 15.5" />
          <line x1="12" y1="2" x2="12" y2="15.5" />
        </svg>
      ),
    },
    {
      name: "Kelola UMKM",
      href: "/admin/dashboard/umkm",
      activeRule: (path: string) => path.startsWith("/admin/dashboard/umkm"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" width="18" height="18">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 bg-[color:var(--forest-deep)] text-white flex flex-col h-screen sticky top-0 font-sans border-r border-white/10">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[color:var(--padi-light)] flex items-center justify-center text-[color:var(--forest-deep)] font-bold text-sm">
            SU
          </div>
          <span className="font-heading font-semibold text-lg text-white">
            Admin Desa
          </span>
        </div>
        <span className="text-[10px] uppercase font-mono tracking-widest text-[color:var(--sawah-light)]">
          Sukoharjo, Wonogiri
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {links.map((link) => {
          const isActive = link.activeRule(pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200",
                isActive
                  ? "bg-[color:var(--forest)] text-white font-medium shadow-md"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 text-xs text-white/50 hover:text-white py-2 rounded transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" width="14" height="14">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Lihat Website
        </Link>
        <button
          onClick={() => logoutAction()}
          className="w-full flex items-center justify-center gap-2 bg-[color:var(--clay)]/80 hover:bg-[color:var(--clay)] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors duration-200 border-none cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" width="14" height="14">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}
