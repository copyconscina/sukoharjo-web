import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Potensi Desa — Desa Sukoharjo",
  description: "Kekayaan alam, pertanian, kerajinan, dan sektor usaha Desa Sukoharjo, Kecamatan Tirtomoyo, Wonogiri, yang berpotensi terus dikembangkan.",
};

export default function PotensiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}