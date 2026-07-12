import { Metadata } from "next";
import { beritaData } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Berita & Pengumuman — Desa Sukoharjo",
  description: "Kegiatan, agenda, dan pengumuman resmi dari Pemerintah Desa Sukoharjo, Kecamatan Tirtomoyo, Wonogiri.",
};

export default function BeritaPage() {
  return (
    <div className="font-sans">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="terraces" aria-hidden="true" style={{ opacity: 0.5 }}>
          <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
            <polygon points="0,300 0,240 1200,280 1200,300" fill="#2d4425" />
            <polygon points="0,240 0,190 1200,230 1200,280" fill="#39542f" />
          </svg>
        </div>
        <div className="wrap">
          <p className="eyebrow on-dark">Berita &amp; Pengumuman</p>
          <h1>Kegiatan, agenda, dan pengumuman resmi desa</h1>
        </div>
      </div>

      {/* FULL BERITA GRID */}
      <section className="block">
        <div className="wrap">
          <div className="grid cols-3">
            {beritaData.map((b, idx) => (
              <Card key={idx} className="card info-card shadow-none border border-[color:var(--line)]">
                <Badge className={`tag ${b.cls} border-none w-fit inline-flex justify-center`} variant="default" style={{ height: "auto" }}>
                  {b.tag}
                </Badge>
                <h3 className="font-heading" style={{ marginTop: "14px" }}>{b.title}</h3>
                <p style={{ marginTop: "6px" }}>{b.desc}</p>
                <div className="date">{b.date}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
