import { getBeritaList, getGaleriList, getUmkmList, getPotensiList } from "@/lib/db";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const newsList = await getBeritaList();
  const galleryList = await getGaleriList();
  const umkmList = await getUmkmList();
  const potentialsList = await getPotensiList();

  const newsCount = newsList.length;
  const galleryCount = galleryList.length;
  const umkmCount = umkmList.length;
  const potentialsCount = potentialsList.length;

  const stats = [
    {
      label: "Berita Terbaru",
      value: newsCount,
      desc: "Agenda, pengumuman & kegiatan desa",
      href: "/admin/dashboard/berita",
      color: "border-l-4 border-l-[color:var(--forest)]",
      ic: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--forest)" width="28" height="28">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: "Galeri Terbaru",
      value: galleryCount,
      desc: "Foto dokumentasi & momen desa",
      href: "/admin/dashboard/galeri",
      color: "border-l-4 border-l-[color:var(--padi)]",
      ic: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--padi)" width="28" height="28">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      label: "Database UMKM",
      value: umkmCount,
      desc: "Profil usaha warga terdaftar",
      href: "/admin/dashboard/umkm",
      color: "border-l-4 border-l-[color:var(--clay)]",
      ic: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--clay)" width="28" height="28">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      ),
    },
    {
      label: "Potensi Desa",
      value: potentialsCount,
      desc: "Sektor unggulan teridentifikasi",
      href: "/admin/dashboard/potensi",
      color: "border-l-4 border-l-[color:var(--sawah)]",
      ic: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--sawah)" width="28" height="28">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
          <line x1="12" y1="22" x2="12" y2="15.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div>
        <p className="eyebrow">Ringkasan Panel</p>
        <h1 className="text-3xl font-heading mt-2" style={{ color: "var(--forest-deep)" }}>
          Selamat Datang, Administrator
        </h1>
        <p className="text-sm text-[color:var(--ink-soft)] mt-1">
          Gunakan panel ini untuk memperbarui informasi terbaru, mengunggah dokumentasi galeri, mengelola database pelaku usaha (UMKM) desa, serta memperbarui deskripsi potensi pembangunan desa.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Link href={stat.href} key={idx} className="no-underline group">
            <Card className={`bg-[color:var(--card)] p-6 border border-[color:var(--line)] shadow-sm hover:shadow-md transition-all duration-300 flex items-start justify-between ${stat.color} h-full`}>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase font-mono tracking-wider text-[color:var(--ink-soft)]">
                  {stat.label}
                </span>
                <span className="text-3xl font-bold font-heading my-1 text-[color:var(--ink)]">
                  {stat.value}
                </span>
                <span className="text-xs text-[color:var(--ink-soft)] group-hover:text-[color:var(--forest)] transition-colors duration-200">
                  {stat.desc} →
                </span>
              </div>
              <div className="p-2 bg-[color:var(--parchment-2)] rounded-lg">
                {stat.ic}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Helpful Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <Card className="border border-[color:var(--line)] shadow-sm p-6 bg-[color:var(--card)] flex flex-col gap-4">
          <h3 className="font-heading text-lg" style={{ color: "var(--forest-deep)" }}>
            Panduan Pengelolaan Website
          </h3>
          <ul className="text-sm text-[color:var(--ink-soft)] flex flex-col gap-3 pl-4 list-disc">
            <li>
              <strong>Berita Desa</strong>: Tambahkan informasi seputar agenda desa, pengumuman, dan berita terkini. Berita dengan tag "Pengumuman" akan otomatis diberi penanda merah di halaman depan.
            </li>
            <li>
              <strong>Galeri Foto</strong>: Tambahkan dokumentasi foto kegiatan desa, UMKM, dan panorama desa. Anda dapat memilih gradasi warna latar belakang representatif untuk memperindah visual galeri.
            </li>
            <li>
              <strong>Database UMKM</strong>: Lengkapi profil UMKM desa agar warga, investor, dan pembeli luar daerah dapat menghubungi pelaku usaha secara langsung via tombol WhatsApp otomatis.
            </li>
            <li>
              <strong>Potensi Desa</strong>: Sesuaikan deskripsi 5 sektor utama potensi desa agar data pembangunan dan kekayaan alam desa selalu termutakhirkan.
            </li>
          </ul>
        </Card>

        <Card className="border border-[color:var(--line)] shadow-sm p-6 bg-[color:var(--card)] flex flex-col gap-4">
          <h3 className="font-heading text-lg" style={{ color: "var(--forest-deep)" }}>
            Akses Cepat Pengunjung
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-3 rounded-lg border border-[color:var(--line)] hover:bg-[color:var(--parchment)] transition-colors duration-200 text-sm no-underline font-medium text-[color:var(--ink)]"
            >
              <span>Beranda Website</span>
              <span className="text-xs text-[color:var(--ink-soft)]">Buka Website Utama →</span>
            </Link>
            <Link
              href="/umkm"
              target="_blank"
              className="flex items-center justify-between p-3 rounded-lg border border-[color:var(--line)] hover:bg-[color:var(--parchment)] transition-colors duration-200 text-sm no-underline font-medium text-[color:var(--ink)]"
            >
              <span>Daftar UMKM Warga</span>
              <span className="text-xs text-[color:var(--ink-soft)]">Lihat Etalase Digital →</span>
            </Link>
            <Link
              href="/berita"
              target="_blank"
              className="flex items-center justify-between p-3 rounded-lg border border-[color:var(--line)] hover:bg-[color:var(--parchment)] transition-colors duration-200 text-sm no-underline font-medium text-[color:var(--ink)]"
            >
              <span>Berita Resmi Desa</span>
              <span className="text-xs text-[color:var(--ink-soft)]">Buka Kabar Balai Desa →</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
