import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri Dokumentasi — Desa Sukoharjo",
  description: "Dokumentasi foto kegiatan pemerintah desa, potensi pertanian, dan produk unggulan UMKM Desa Sukoharjo.",
};

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
