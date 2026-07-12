"use client";

import { useState } from "react";
import { galeriData } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", ...Array.from(new Set(galeriData.map((g) => g.cat)))];

  const filteredGaleri = galeriData.filter(
    (g) => activeCategory === "Semua" || g.cat === activeCategory
  );

  const icZoom = (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  return (
    <div className="font-sans">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="wrap">
          <p className="eyebrow on-dark">Galeri</p>
          <h1>Dokumentasi kegiatan, UMKM, dan potensi desa</h1>
        </div>
      </div>

      {/* FILTER & GRID */}
      <section className="block tight">
        <div className="wrap">
          <div className="gal-filters" id="galFilters">
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

          <div className="gal-grid" id="galGrid" style={{ marginTop: "24px" }}>
            {filteredGaleri.map((g, idx) => (
              <div key={idx} className="gal-tile" style={{ background: g.grad }}>
                {icZoom}
                <span>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
