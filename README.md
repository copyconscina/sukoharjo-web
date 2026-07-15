# 🌾 Website Resmi & Portal UMKM Desa Sukoharjo, Kecamatan Tirtomoyo, Wonogiri

Website ini merupakan platform digital resmi Pemerintah Desa Sukoharjo, Kecamatan Tirtomoyo, Kabupaten Wonogiri. Dibangun khusus sebagai media informasi desa, visualisasi data kependudukan, dokumentasi potensi wilayah, serta etalase digital (directory/database) untuk produk-produk unggulan UMKM warga setempat.

Platform ini mengintegrasikan profil desa yang transparan dengan fitur penghubung bisnis langsung ke pelaku UMKM via WhatsApp untuk mendukung digitalisasi ekonomi desa.

---

## 🚀 Fitur Utama

Website ini dirancang secara modular dan responsif dengan fitur-fitur berikut:

1. **Beranda (Landing Page)**
   - Desain visual premium bertema alam (sawah berundak) menggunakan SVG dinamis.
   - Panel Statistik Desa (`STAT`): Menampilkan jumlah Dusun (4), Penduduk (1.632 jiwa), UMKM Terdaftar (27+), dan Kategori Usaha (6).
   - Profil singkat geografis dan mata pencaharian warga.
   - Sorotan/Preview UMKM unggulan dan galeri dokumentasi kegiatan desa.

2. **Profil Desa (`/profil`)**
   - **Sejarah Desa**: Garis waktu (*timeline*) perkembangan desa dari padukuhan tani hingga menjadi desa mandiri.
   - **Visi & Misi**: Dokumen visi pembangunan desa yang sejahtera dan berbasis kearifan lokal.
   - **Struktur Pemerintahan**: Diagram organogram perangkat desa yang dipimpin oleh Kepala Desa (Bpk. Sutrisno, S.Sos.) dan Sekretaris Desa (Ibu Wahyu Ningsih).
   - **Data Kependudukan**: Grafik sebaran penduduk per-dusun (Sukorejo, Karangnongko, Ngrancah, Tanggulangin) secara interaktif.
   - **Kontak & Lokasi**: Informasi jam operasional kantor desa, alamat lengkap, email resmi, dan tautan integrasi langsung ke Google Maps.

3. **Database & Etalase UMKM (`/umkm`)**
   - **Pencarian Dinamis**: Menyaring UMKM berdasarkan nama usaha, nama pemilik, maupun produk unggulan secara *real-time*.
   - **Kategori Filter**: Navigasi cepat menggunakan chip filter (Kuliner, Fashion & Batik, Kerajinan, Pertanian, Peternakan).
   - **Detail UMKM (`/umkm/[id]`)**: Halaman khusus tiap produk dengan deskripsi usaha lengkap, alamat spesifik, tahun berdiri, dan akun media sosial.
   - **Integrasi WhatsApp (*Direct to WhatsApp*)**: Tombol pesanan/tanya langsung yang otomatis menyusun pesan teks terformat ke nomor WhatsApp pelaku usaha.

4. **Galeri Dokumentasi (`/galeri`)**
   - Galeri multimedia dokumentasi kegiatan desa, panorama alam, dan proses produksi UMKM.
   - Fitur filter berdasarkan kategori (Kegiatan, UMKM, Potensi).

---

## 🛠️ Spesifikasi Teknologi (Tech Stack)

Aplikasi dibangun menggunakan teknologi modern untuk menjamin kecepatan, performa, dan optimasi SEO:

* **Framework Utama**: [Next.js 16.2.10](https://nextjs.org/) (App Router)
* **Library UI**: [React 19.2.4](https://react.dev/) & [React DOM 19.2.4](https://react.dev/)
* **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/)
* **Styling & Desain**:
  - [Tailwind CSS v4](https://tailwindcss.com/) untuk utilitas layouting modern.
  - [Vanilla CSS (globals.css)](file:///d:/my%20mine%20things/kkn/sukoharjo-profile-web/app/globals.css) untuk kustomisasi tema warna premium (Forest Deep, Sawah, Clay, Padi, Parchment).
  - Font Google ([Fraunces](https://fonts.google.com/specimen/Fraunces) untuk heading serif yang elegan, [Public Sans](https://fonts.google.com/specimen/Public+Sans) untuk keterbacaan teks body, dan [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) untuk data/monospaced).
* **Komponen & Ikon**:
  - Komponen dasar [Shadcn UI](https://ui.shadcn.com/) (Badge, Button, Card, Dialog, Input) berbasis [Radix UI](https://www.radix-ui.com/).
  - Ikon antarmuka menggunakan [Lucide React](https://lucide.dev/).
* **Animasi**: [tw-animate-css](https://github.com/m-albert/tw-animate-css) untuk transisi mikro-interaksi yang mulus.

---

## 📁 Struktur Direktori Proyek

Berikut adalah peta struktur folder dan berkas utama dalam proyek Next.js ini:

```bash
sukoharjo-profile-web/
├── app/                      # Next.js App Router (Halaman & Layout)
│   ├── galeri/               # Halaman Galeri Dokumentasi (/galeri)
│   ├── profil/               # Halaman Profil & Struktur Desa (/profil)
│   ├── umkm/                 # Halaman Database UMKM
│   │   ├── [id]/             # Dynamic Route Detail UMKM (/umkm/[id])
│   │   ├── layout.tsx        # Layout khusus halaman UMKM
│   │   └── page.tsx          # Halaman utama daftar UMKM
│   ├── favicon.ico           # Favicon website
│   ├── globals.css           # Token warna, variabel font, & CSS kustom
│   ├── layout.tsx            # Root Layout (Navigasi Header & Footer)
│   └── page.tsx              # Halaman Beranda (Landing Page)
├── components/               # Komponen React reusable
│   ├── ui/                   # Komponen atomik UI (Shadcn/Radix)
│   └── Navbar.tsx            # Komponen navigasi header (responsif mobile)
├── lib/                      # Utilitas & Penyimpanan Data
│   ├── data.ts               # Database lokal (UMKM, Berita, Galeri, Potensi)
│   └── utils.ts              # Fungsi pembantu Tailwind Merge (cn)
├── public/                   # Aset statis (Gambar, Lambang Wonogiri, dll)
├── package.json              # Konfigurasi dependensi & skrip npm
├── next.config.ts            # Konfigurasi Next.js
└── tsconfig.json             # Konfigurasi TypeScript
```

---

## 💾 Struktur Data (`lib/data.ts`)

Seluruh data konten bersifat dinamis dan tersentralisasi pada berkas [`lib/data.ts`](file:///d:/my%20mine%20things/kkn/sukoharjo-profile-web/lib/data.ts). Struktur data utama meliputi:

1. **`umkmData`**: Array objek profil UMKM dengan skema:
   ```typescript
   export interface Umkm {
     id: number;
     name: string;
     owner: string;
     category: string;
     year: number;
     product: string;
     desc: string;
     address: string;
     wa: string;       // Format nomor diawali kode negara (misal: 6281234xxx)
     social?: string;  // Username Instagram / media sosial (opsional)
     grad: string;     // Gradasi warna CSS untuk visual kartu
   }
   ```
2. **`beritaData`**: Daftar agenda kegiatan, pengumuman penting, dan kabar berita desa terbaru.
3. **`galeriData`**: Dokumentasi visual desa dengan pemetaan kategori (`Kegiatan`, `UMKM`, `Potensi`).
4. **`potensiData`**: Kekayaan alam dan usaha yang berpotensi dikembangkan (Pertanian, Perkebunan Mete, dsb).
5. **`popData`**: Data sebaran kependudukan riil per-dusun untuk grafik demografi.
6. **`STAT`**: Data statistik ringkas untuk strip angka di Beranda.

---

## ✍️ Cara Memperbarui Konten (Maintenance)

Website ini didesain agar mudah diperbarui tanpa perlu mengubah struktur kode komponen:

* **Menambah/Mengedit UMKM Baru**:
  Buka berkas [`lib/data.ts`](file:///d:/my%20mine%20things/kkn/sukoharjo-profile-web/lib/data.ts) dan tambahkan objek baru ke dalam array `umkmData`. Pastikan nomor WhatsApp ditulis dalam format string angka murni diawali kode negara `62` (contoh: `"6281234500001"`), agar integrasi chat template dapat berfungsi dengan baik.
* **Memperbarui Data Penduduk**:
  Ubah nilai `val` pada objek di dalam array `popData` sesuai dengan hasil sensus terbaru. Grafik batang di halaman `/profil` akan menyesuaikan lebarnya secara otomatis.
* **Mengganti Data Pengumuman/Agenda**:
  Modifikasi data dalam array `beritaData`. Gunakan tag `"Pengumuman"` untuk memberikan sorotan warna merah (*clay*) pada kartu berita.

---

## ⚙️ Panduan Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan server pengembangan di komputer lokal Anda:

### Prerequisites
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi LTS yang direkomendasikan, minimal v18+).

### 1. Kloning & Masuk ke Direktori
```bash
# Masuk ke folder proyek
cd sukoharjo-profile-web
```

### 2. Instal Dependensi
Gunakan package manager pilihan Anda untuk menginstal semua library pendukung:
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Jalankan Server Pengembangan
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```
Setelah berhasil dijalankan, buka peramban Anda dan akses tautan **[http://localhost:3000](http://localhost:3000)** untuk melihat hasilnya.

### 4. Build untuk Produksi
Untuk memeriksa optimasi dan mempersiapkan kode sebelum dideploy ke server produksi, jalankan:
```bash
npm run build
```
Hasil build yang optimal akan disimpan di dalam folder `.next/`. Anda dapat mengujinya secara lokal dengan perintah:
```bash
npm run start
```

---

## 🌐 Panduan Deployment

Aplikasi Next.js ini siap di-deploy ke berbagai layanan cloud. Rekomendasi utama adalah menggunakan **[Vercel](https://vercel.com/)** karena integrasinya yang seamless:

1. Hubungkan repositori GitHub proyek ini dengan akun Vercel Anda.
2. Buat proyek baru di dashboard Vercel, pilih repositori `sukoharjo-profile-web`.
3. Vercel akan mendeteksi framework Next.js secara otomatis. Klik **Deploy**.
4. Website Anda siap diakses secara online dalam beberapa menit!

---
*Dibuat dengan dedikasi untuk kemajuan digitalisasi Desa Sukoharjo, Kecamatan Tirtomoyo, Kabupaten Wonogiri.*
