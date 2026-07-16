import { Metadata } from "next";
import Link from "next/link";
import { STAT } from "@/lib/data";
import { getUmkmList, getBeritaList, getGaleriList, getPotensiList } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Selamat Datang di Desa Sukoharjo — Tirtomoyo, Wonogiri",
  description: "Website Resmi Pemerintah Desa Sukoharjo, Kecamatan Tirtomoyo, Kabupaten Wonogiri — media informasi desa dan etalase digital UMKM warga.",
};

export default async function Home() {
  const umkmData = await getUmkmList();
  const beritaData = await getBeritaList();
  const galeriData = await getGaleriList();
  const potensiData = await getPotensiList();
  return (
    <div className="font-sans">
      {/* HERO SECTION */}
      <div className="hero">
        <div className="terraces" aria-hidden="true">
          <svg viewBox="0 0 1200 520" preserveAspectRatio="none">
            <polygon points="0,520 0,420 1200,470 1200,520" fill="#2d4425" />
            <polygon points="0,420 0,340 1200,400 1200,470" fill="#39542f" />
            <polygon points="0,340 0,270 1200,330 1200,400" fill="#44603a" />
            <polygon points="0,270 0,210 1200,260 1200,330" fill="#4d6b40" opacity="0.9" />
          </svg>
        </div>
        <div className="hero-inner">
          <p className="eyebrow on-dark">Website Resmi Pemerintah Desa</p>
          <h1>
            Sukoharjo, desa yang tumbuh dari <em>sawah, karya, dan usaha warganya.</em>
          </h1>
          <p className="lead">
            Terletak di lereng Tirtomoyo, Wonogiri — Sukoharjo menghubungkan cerita desa, potensi usaha, dan peluang wisata alam perbukitan. Website ini menjadi pintu informasi bagi warga, investor, dan pendamping desa.
          </p>
          <div className="hero-cta">
            <Button asChild className="btn btn-primary border-none">
              <Link href="/umkm">Jelajahi Database UMKM</Link>
            </Button>
            <Button asChild className="btn btn-ghost border border-white/35">
              <Link href="/profil">Kenali Desa Kami</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="terrace-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <polygon points="0,60 0,30 300,55 600,20 900,50 1200,10 1200,60" fill="#fbfaf5" />
        </svg>
      </div>

      {/* STAT STRIP */}
      <div className="stat-strip wrap" style={{ borderTop: "none" }}>
        <div className="stat">
          <div className="num">{STAT.dusun}</div>
          <div className="lbl">Dusun</div>
        </div>
        <div className="stat">
          <div className="num">{STAT.population}</div>
          <div className="lbl">Jiwa Penduduk</div>
        </div>
        <div className="stat">
          <div className="num">{STAT.umkm}+</div>
          <div className="lbl">UMKM Terdaftar</div>
        </div>
      </div>

      {/* PROFIL SINGKAT */}
      <section className="block">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Profil Singkat</p>
            <h2 style={{ marginTop: "10px" }}>Desa berbukit di jalur Tirtomoyo–Baturetno</h2>
            <p style={{ marginTop: "16px" }}>Desa Sukoharjo merupakan salah satu desa yang berada di Kecamatan Tirtomoyo, Kabupaten Wonogiri, Provinsi Jawa Tengah. Desa ini memiliki luas wilayah sekitar 837,77 hektare, yang didominasi oleh lahan kering seluas 637,31 hektare dan lahan sawah seluas 101,29 hektare. Secara administratif, Desa Sukoharjo berbatasan dengan Desa Girirejo (Kecamatan Jatiroto) di sebelah utara, Desa Hargosari (Kecamatan Karangtengah) di sebelah selatan, Desa Hargorejo (Kecamatan Nawangan) di sebelah timur, serta Desa Wiroko (Kecamatan Nguntoronadi) di sebelah barat.
            </p>
            <p style={{ marginTop: "12px" }}>
              Melalui website ini, pemerintah desa ingin menghadirkan satu pintu informasi: profil desa yang transparan, dan etalase digital UMKM sekaligus berita terbaru yang ada di Desa Sukoharjo.
            </p>
          </div>
          <div className="umkm-mini" style={{ flexDirection: "column", gap: "14px" }}>
            {umkmData.slice(0, 2).map((u) => (
              <Card key={u.id} className="umkm-mini border border-[color:var(--line)] shadow-none" style={{ width: "100%" }}>
                <div className="thumb" style={u.image ? { backgroundImage: `url(${u.image})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: u.grad }} />
                <div>
                  <div className="cat">{u.category}</div>
                  <h3 className="font-heading">{u.name}</h3>
                  <p style={{ fontSize: "13px" }}>
                    {u.id === 1
                      ? "Olahan singkong khas Wonogiri sejak 2005."
                      : "Motif parang lereng, diwariskan tiga generasi."}
                  </p>
                </div>
              </Card>
            ))}
            <Button asChild className="btn btn-dark border-none" style={{ alignSelf: "flex-start" }}>
              <Link href="/umkm">Lihat Semua UMKM Unggulan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* POTENSI DESA */}
      <section className="block on-parchment2 tight">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: "100%" }}>
            <p className="eyebrow">Potensi Desa</p>
            <h2 style={{ marginTop: "10px" }}>Kekayaan Sumber Daya dan Potensinya</h2>
          </div>
          <div className="grid cols-4" style={{ marginTop: "24px" }}>
            {potensiData.slice(0, 4).map((p) => (
              <Card key={p.num} className="card shadow-none border border-[color:var(--line)]" style={{ padding: "20px" }}>
                <div
                  className="eyebrow"
                  style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", fontStyle: "italic", marginBottom: "8px" }}
                >
                  {p.num}
                </div>
                <h3 style={{ marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ fontSize: "13px" }}>{p.desc}</p>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <Button asChild className="btn btn-dark border-none">
              <Link href="/umkm">Lihat Bukti Nyata: Database UMKM Desa →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* GALERI PREVIEW */}
      <section className="block tight">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Dokumentasi</p>
            <h2 style={{ marginTop: "10px" }}>Momen di Desa Sukoharjo</h2>
          </div>
          <div className="gal-grid" style={{ marginTop: "24px" }}>
            {galeriData.slice(0, 4).map((g, idx) => (
              <div key={idx} className="gal-tile" style={g.image ? { backgroundImage: `url(${g.image})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: g.grad }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>{g.label}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <Button asChild className="btn btn-dark border-none">
              <Link href="/galeri">Lihat Galeri Lengkap</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* INFORMASI TERBARU */}
      <section className="block on-parchment2 tight">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Informasi Terbaru</p>
            <h2 style={{ marginTop: "10px" }}>Kabar dari Balai Desa</h2>
          </div>
          <div className="grid cols-3" style={{ marginTop: "24px" }}>
            {beritaData.slice(0, 3).map((b, idx) => (
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
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <Button asChild className="btn btn-dark border-none">
              <Link href="/berita">Lihat Semua Berita</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
