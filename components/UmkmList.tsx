"use client";

import { useState } from "react";
import Link from "next/link";
import { Umkm } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Props {
  initialUmkmData: Umkm[];
}

export default function UmkmList({ initialUmkmData }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", ...Array.from(new Set(initialUmkmData.map((u) => u.category)))];

  const filteredUmkm = initialUmkmData.filter((u) => {
    const term = searchTerm.trim().toLowerCase();
    const matchCat = activeCategory === "Semua" || u.category === activeCategory;
    const matchTerm =
      !term ||
      [u.name, u.product, u.owner].join(" ").toLowerCase().includes(term);
    return matchCat && matchTerm;
  });

  return (
    <div className="wrap">
      <div className="umkm-toolbar">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-muted-foreground">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <Input
            type="text"
            id="umkmSearch"
            placeholder="Cari nama UMKM, produk, atau pemilik…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-[42px] pr-4 py-3 rounded-full border border-[color:var(--line)] bg-[color:var(--card)] text-sm font-sans"
            style={{ height: "46px" }}
          />
        </div>
      </div>

      <div className="filter-chips" id="umkmFilters" style={{ marginBottom: "20px" }}>
        {categories.map((c) => (
          <Button
            key={c}
            variant={activeCategory === c ? "default" : "outline"}
            className={`chip ${activeCategory === c ? "active" : ""}`}
            style={{ display: "inline-flex", height: "auto", border: "1px solid var(--line)" }}
            onClick={() => setActiveCategory(c)}
          >
            {c}
          </Button>
        ))}
      </div>

      <p className="result-count" id="umkmResultCount">
        {filteredUmkm.length} UMKM ditemukan
      </p>

      <div className="grid cols-4" id="umkmGrid">
        {filteredUmkm.length > 0 ? (
          filteredUmkm.map((u) => (
            <Link href={`/umkm/${u.id}`} key={u.id} className="umkm-card" style={{ textDecoration: "none" }}>
              <Card className="umkm-card border border-[color:var(--line)] shadow-none flex flex-col h-full" style={{ borderRadius: "var(--radius)" }}>
                <div className="cover" style={u.image ? { backgroundImage: `url(${u.image})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: u.grad }}>
                  <Badge className="cat-badge border-none" style={{ background: "rgba(33, 47, 28, 0.75)", color: "#fff" }}>{u.category}</Badge>
                </div>
                <div className="body">
                  <h3 className="font-heading">{u.name}</h3>
                  <div className="owner">
                    {u.owner} · sejak {u.year}
                  </div>
                  <div className="product">
                    <b>Produk:</b> {u.product}
                  </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: "1/-1" }}>
            Tidak ada UMKM yang cocok dengan pencarian atau filter ini.
          </div>
        )}
      </div>
    </div>
  );
}
