import { Metadata } from "next";
import { popData } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Profil Desa Sukoharjo — Tirtomoyo, Wonogiri",
  description: "Sejarah, visi-misi, struktur pemerintahan, data kependudukan, dan kontak kantor Desa Sukoharjo.",
};

export default function ProfilPage() {
  const popMax = Math.max(...popData.map((d) => d.val));

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
          <p className="eyebrow on-dark">Profil Desa</p>
          <h1>Sejarah, arah, dan struktur pemerintahan Sukoharjo</h1>
        </div>
      </div>

      {/* SEJARAH & VISI MISI */}
      <section className="block">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Sejarah Desa</p>
            <h2 style={{ marginTop: "10px", marginBottom: "24px" }}>
              Dari padukuhan tani menjadi desa mandiri
            </h2>
            <div className="timeline">
              <div>
                <div className="yr">Sebelum 1945</div>
                <p>
                  Kawasan Sukoharjo mulanya berupa padukuhan tani di lereng perbukitan Tirtomoyo, dihuni beberapa keluarga yang membuka lahan sawah berundak.
                </p>
              </div>
              <div>
                <div className="yr">1946–1970</div>
                <p>
                  Padukuhan berkembang menjadi desa definitif, dengan empat dusun terbentuk mengikuti aliran sungai kecil dan jalur ladang.
                </p>
              </div>
              <div>
                <div className="yr">1980-an</div>
                <p>
                  Mulai tumbuh usaha rumahan pengolahan singkong dan jamu gendong sebagai penopang ekonomi warga di musim paceklik sawah.
                </p>
              </div>
              <div>
                <div className="yr">2000-an – kini</div>
                <p>
                  Diversifikasi usaha berkembang: batik tulis, kerajinan bambu, hingga peternakan kambing etawa, menjadikan UMKM tulang punggung ekonomi desa.
                </p>
              </div>
            </div>
          </div>
          <Card className="vm-card border-none shadow-none text-white">
            <h3 className="text-white">Visi</h3>
            <p className="text-[#e7e6d6]">
              Mewujudkan Desa Sukoharjo yang mandiri, sejahtera, dan berdaya saing melalui optimalisasi potensi pertanian dan UMKM berbasis kearifan lokal.
            </p>
            <h3 className="text-white" style={{ marginTop: "20px" }}>Misi</h3>
            <ul className="text-[#e7e6d6]">
              <li>Meningkatkan tata kelola pemerintahan desa yang transparan dan partisipatif.</li>
              <li>Mendorong digitalisasi promosi produk UMKM warga.</li>
              <li>Memperkuat sektor pertanian dan peternakan berkelanjutan.</li>
              <li>Meningkatkan kualitas infrastruktur dan pelayanan publik desa.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* STRUKTUR PEMERINTAHAN */}
      <section className="block on-parchment2">
        <div className="wrap">
          <div className="section-head" style={{ margin: "0 auto 40px", textAlign: "center" }}>
            <p className="eyebrow" style={{ textAlign: "center" }}>
              Struktur Pemerintahan
            </p>
            <h2>Perangkat Desa Sukoharjo</h2>
          </div>
          <div className="org-chart">
            <div className="org-node top">
              Kepala Desa
              <small>Bpk. Sutrisno, S.Sos.</small>
            </div>
            <div className="org-node">
              Sekretaris Desa
              <small>Ibu Wahyu Ningsih</small>
            </div>
            <div className="org-row">
              <div className="org-node">
                Kaur Keuangan
                <small>Staf Keuangan</small>
              </div>
              <div className="org-node">
                Kaur Perencanaan
                <small>Staf Perencanaan</small>
              </div>
              <div className="org-node">
                Kaur Tata Usaha
                <small>Staf Umum & TU</small>
              </div>
            </div>
            <div className="org-row">
              <div className="org-node">
                Kasi Pemerintahan
                <small>Staf Pemerintahan</small>
              </div>
              <div className="org-node">
                Kasi Kesejahteraan
                <small>Staf Kesejahteraan</small>
              </div>
              <div className="org-node">
                Kasi Pelayanan
                <small>Staf Pelayanan</small>
              </div>
            </div>
            <div className="org-row">
              <div className="org-node">
                Kadus Sukorejo
                <small>Kepala Dusun</small>
              </div>
              <div className="org-node">
                Kadus Ngrancah
                <small>Kepala Dusun</small>
              </div>
              <div className="org-node">
                Kadus Karangnongko
                <small>Kepala Dusun</small>
              </div>
              <div className="org-node">
                Kadus Tanggulangin
                <small>Kepala Dusun</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DATA KEPENDUDUKAN & RINGKASAN POTENSI */}
      <section className="block">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">Data Kependudukan</p>
            <h2 style={{ margin: "10px 0 24px" }}>Sebaran penduduk per dusun</h2>
            <div id="pop-chart">
              {popData.map((d, idx) => (
                <div key={idx} className="pop-bar-row">
                  <div className="pop-bar-label">{d.label}</div>
                  <div className="pop-bar-track">
                    <div
                      className="pop-bar-fill"
                      style={{ width: `${((d.val / popMax) * 100).toFixed(0)}%` }}
                    />
                  </div>
                  <div className="pop-bar-num">{d.val} jiwa</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Potensi Desa (ringkas)</p>
            <h2 style={{ margin: "10px 0 24px" }}>Tiga sektor utama</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Card className="card border border-[color:var(--line)] shadow-none" style={{ padding: "20px" }}>
                <h3 className="font-heading">Pertanian &amp; Perkebunan</h3>
                <p>Padi ladang, singkong, and mete sebagai komoditas utama lahan kering.</p>
              </Card>
              <Card className="card border border-[color:var(--line)] shadow-none" style={{ padding: "20px" }}>
                <h3 className="font-heading">UMKM Olahan &amp; Kerajinan</h3>
                <p>Tiwul, keripik, batik tulis, dan anyaman bambu/pandan.</p>
              </Card>
              <Card className="card border border-[color:var(--line)] shadow-none" style={{ padding: "20px" }}>
                <h3 className="font-heading">Peternakan</h3>
                <p>Kambing etawa dan unggas sebagai usaha sampingan rumah tangga.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK & LOKASI KANTOR DESA */}
      <section className="block on-parchment2">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Kontak</p>
            <h2>Hubungi Kantor Desa Sukoharjo</h2>
          </div>
          <div className="contact-grid" style={{ marginTop: "24px" }}>
            <div>
              <div className="contact-item">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3>Alamat Kantor Desa</h3>
                  <p>
                    Jl. Raya Tirtomoyo–Baturetno KM 5, Dusun Sukorejo, Desa Sukoharjo, Kec. Tirtomoyo, Kab. Wonogiri, Jawa Tengah 57672
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3>Telepon</h3>
                  <p>(0273) 741-xxx</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16v16H4z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>desasukoharjo.tirtomoyo@wonogirikab.go.id</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <div>
                  <h3>Jam Layanan</h3>
                  <p>Senin–Jumat, 08.00–15.00 WIB</p>
                </div>
              </div>
            </div>
            <Card className="map-box border-none shadow-none text-white">
              <svg className="pin" viewBox="0 0 24 24" fill="none" stroke="#eec96e" strokeWidth="1.6">
                <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <h3 style={{ color: "#fff" }}>Kantor Desa Sukoharjo</h3>
                <p style={{ color: "#cfd3bd", fontSize: "14px", marginTop: "6px" }}>
                  Tirtomoyo, Wonogiri, Jawa Tengah
                </p>
              </div>
              <Button asChild className="btn btn-primary border-none">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Desa+Sukoharjo+Tirtomoyo+Wonogiri"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buka di Google Maps
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
