"use client";

import { useState } from "react";
import { GaleriItem } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface Props {
  initialGaleriData: GaleriItem[];
}

export default function GaleriList({ initialGaleriData }: Props) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", ...Array.from(new Set(initialGaleriData.map((g) => g.cat)))];

  const filteredGaleri = initialGaleriData.filter(
    (g) => activeCategory === "Semua" || g.cat === activeCategory
  );

  const icZoom = (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" width="20" height="20">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  return (
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
          <div key={idx} className="gal-tile" style={g.image ? { backgroundImage: `url(${g.image})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: g.grad }}>
            {icZoom}
            <span>{g.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
