# Instructions — Website Profil Desa Sukoharjo

Dokumen ini berisi spesifikasi lengkap untuk mengisi tampilan (UI) website profil Desa Sukoharjo, Kec. Tirtomoyo, Kab. Wonogiri. Project, routing, dan file halaman **sudah dibuat** — tugas AI di sini hanya **mengisi konten & tampilan tiap page**, bukan setup project baru.

## 1. Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **shadcn/ui** untuk komponen interaktif (Dialog, Sheet, Input, Badge, Card, dll)
- Font: `Fraunces` (display/heading, serif), `Public Sans` (body), `JetBrains Mono` (label/eyebrow/mono) — load via `next/font/google`

## 2. Design Tokens

Gunakan warna berikut sebagai custom color di `tailwind.config.ts` (map ke variabel shadcn juga bila memungkinkan):

| Token | Hex | Kegunaan |
|---|---|---|
| `forest-deep` | `#212f1c` | background gelap (hero, page-header, footer, vm-card) |
| `forest` | `#39542f` | aksen utama, tombol gelap, active state |
| `forest-mid` | `#4d6b40` | hover state elemen forest |
| `sawah` | `#8ba368` | aksen hijau muda, hover border card |
| `sawah-light` | `#c3d19f` | badge/kategori terang |
| `clay` | `#8b4226` | aksen eyebrow, warna teks penting (harga/label) |
| `clay-light` | `#b0623d` | variasi clay |
| `padi` | `#d8a83a` | tombol primary (CTA emas) |
| `padi-light` | `#eec96e` | hover primary, teks di background gelap |
| `parchment` | `#f1eee0` | background utama halaman |
| `parchment-2` | `#e9e4d0` | background section alternate |
| `card` | `#faf8ef` | background card |
| `ink` | `#23291c` | teks utama |
| `ink-soft` | `#5b6350` | teks sekunder/deskripsi |
| `line` | `#d8d2ba` | border |
| `wa` | `#3f7d55` | tombol WhatsApp |

Radius standar: `14px` (card besar), tombol pakai `rounded-full`.

## 3. Struktur Halaman (REVISI)

> ⚠️ Ini adalah struktur **final setelah revisi** — bukan struktur awal. Page **Potensi Desa** dan **Kontak** dihapus sebagai page terpisah, isinya digabung ke page lain.

| Route | Nama Page | Isi |
|---|---|---|
| `/` | Beranda | Hero, statistik, profil singkat, **potensi desa (baru)**, **preview galeri (baru)**, preview berita |
| `/profil` | Profil Desa | Sejarah, visi-misi, struktur pemerintahan, data kependudukan, **kontak & lokasi kantor desa (baru, digabung dari page Kontak)** |
| `/berita` | Berita | Daftar lengkap berita & pengumuman |
| `/umkm` | Database UMKM | Search + filter kategori + grid + detail (modal/halaman detail) |
| `/umkm/[id]` | Detail UMKM | Detail satu UMKM + tombol WhatsApp |
| `/galeri` | Galeri | Grid dokumentasi foto dengan filter kategori |

Navbar & footer link disesuaikan: **hapus** link "Potensi Desa" dan "Kontak", sisakan Beranda, Profil, Berita, UMKM, Galeri.

---

## 4. Detail Per Halaman

### 4.1 `/` — Beranda

Urutan section dari atas ke bawah:

1. **Hero**
   - Background gelap (`forest-deep`) dengan ilustrasi terasering sawah (SVG bertumpuk, opsional dekorasi)
   - Eyebrow: "Website Resmi Pemerintah Desa"
   - H1: "Sukoharjo, desa yang tumbuh dari *sawah, karya, dan usaha warganya.*" (bagian italic pakai warna `padi-light`)
   - Lead paragraph singkat tentang desa
   - 2 tombol CTA: **"Jelajahi Database UMKM"** (primary, ke `/umkm`) dan **"Kenali Desa Kami"** (ghost/outline, ke `/profil`)

2. **Stat strip** — 4 angka horizontal dengan border pemisah:
   - 4 Dusun · 1.632 Jiwa Penduduk · 27+ UMKM Terdaftar · 6 Kategori Usaha

3. **Profil Singkat** (2 kolom)
   - Kolom kiri: teks singkat tentang letak geografis & mata pencaharian warga
   - Kolom kanan: 2 mini-card UMKM unggulan (thumbnail gradient + nama + deskripsi 1 baris) + tombol **"Lihat Semua UMKM Unggulan"** ke `/umkm`

4. **🆕 Potensi Desa (ringkas)** — section baru, pindahan dari page Potensi yang dihapus
   - Section head: eyebrow "Potensi Desa", judul misalnya "Kekayaan alam dan usaha yang bisa dikembangkan"
   - Tampilkan **3–4 potensi utama saja** (bukan semua 6 — cukup ringkasan/highlight, karena tujuan section ini adalah pembuktian, bukan daftar lengkap), format card grid atau list bernomor, contoh:
     1. Pertanian Lahan Kering
     2. Perkebunan Mete
     3. Kerajinan Bambu & Pandan
     4. Batik Tulis Lokal
   - **Wajib ada tombol di bawah section ini**: *"Lihat Bukti Nyata: Database UMKM Desa →"* mengarah ke `/umkm`. Ini tombol kunci — tujuannya membuktikan potensi yang disebutkan benar-benar terwujud lewat UMKM yang terdaftar (bukan cuma klaim di atas kertas).

5. **🆕 Galeri (preview)** — section baru
   - Section head: eyebrow "Dokumentasi", judul misalnya "Momen dari Desa Sukoharjo"
   - Tampilkan **3 gambar/tile galeri** saja (ambil 3 pertama atau 3 pilihan representatif dari `galeriData`), grid 3 kolom
   - Tombol di bawah grid: **"Lihat Galeri Lengkap"** → `/galeri`

6. **Informasi Terbaru (preview berita)**
   - Section head: "Kabar dari Balai Desa"
   - Grid 3 kolom berisi 3 berita terbaru (card dengan tag kategori, judul, deskripsi, tanggal)
   - (Opsional tapi disarankan: tambahkan tombol "Lihat Semua Berita" → `/berita`, konsisten dengan pola tombol di section lain)

### 4.2 `/profil` — Profil Desa

Section yang sudah ada (tidak berubah):
1. Page header: "Sejarah, arah, dan struktur pemerintahan Sukoharjo"
2. Sejarah Desa (timeline 4 periode) + Visi Misi (card gelap)
3. Struktur Pemerintahan (org chart: Kepala Desa → Sekretaris Desa → 3 Kaur → 3 Kasi → 4 Kadus)
4. Data Kependudukan (bar chart sebaran penduduk per dusun) + 3 card ringkasan sektor potensi

**🆕 Section tambahan (pindahan dari page Kontak yang dihapus)** — taruh di paling bawah, sebelum footer:
- Section head: eyebrow "Kontak", judul misalnya "Hubungi Kantor Desa Sukoharjo"
- Layout 2 kolom:
  - Kiri: 4 contact item dengan ikon (Alamat, Telepon, Email, Jam Layanan)
  - Kanan: `map-box` — kotak gelap dengan pin lokasi + nama kantor + tombol "Buka di Google Maps" (link ke Google Maps search)
- Data kontak:
  - Alamat: Jl. Raya Tirtomoyo–Baturetno KM 5, Dusun Sukorejo, Desa Sukoharjo, Kec. Tirtomoyo, Kab. Wonogiri, Jawa Tengah 57672
  - Telepon: (0273) 741-xxx
  - Email: desasukoharjo.tirtomoyo@wonogirikab.go.id
  - Jam Layanan: Senin–Jumat, 08.00–15.00 WIB

### 4.3 `/berita` — Berita

- Page header: "Berita & Pengumuman"
- Grid 3 kolom, semua item dari `beritaData`, tiap card: tag kategori (Kegiatan/Pengumuman/Agenda — beda warna tag khusus Pengumuman pakai `clay`), judul, deskripsi, tanggal

### 4.4 `/umkm` — Database UMKM

- Page header + deskripsi singkat
- Toolbar: search box (cari nama/produk/pemilik) + filter chip kategori (state: `activeCategory`, `searchTerm`)
- Result count text
- Grid 4 kolom card UMKM (cover gradient + badge kategori, nama, pemilik+tahun, produk unggulan)
- Klik card → ke `/umkm/[id]` (halaman detail, bisa dibuat sebagai intercepting route/modal agar terasa seperti overlay — opsional)

### 4.5 `/umkm/[id]` — Detail UMKM

- Cover gradient + badge kategori
- Nama, pemilik, tahun berdiri, deskripsi lengkap
- Detail rows: Produk Unggulan, Alamat, Tahun Berdiri, Media Sosial (jika ada)
- Tombol sticky di bawah: **"Hubungi via WhatsApp"** → `https://wa.me/{wa}?text=...` dengan pesan template otomatis

### 4.6 `/galeri` — Galeri

- Page header: "Dokumentasi kegiatan, UMKM, dan potensi desa"
- Filter chip kategori (Semua, Kegiatan, UMKM, Potensi)
- Grid 4 kolom, tile aspect-ratio 1:1 dengan gradient background, label di bawah, ikon zoom di pojok

---

## 5. Data Models (referensi tipe data)

```ts
interface Umkm {
  id: number;
  name: string;
  owner: string;
  category: string; // Kuliner, Fashion & Batik, Kerajinan, Pertanian, Peternakan
  year: number;
  product: string;
  desc: string;
  address: string;
  wa: string; // nomor tanpa "+", format 62...
  social?: string;
  grad: string; // css gradient string, sementara pengganti foto asli
}

interface Berita {
  tag: "Kegiatan" | "Pengumuman" | "Agenda";
  title: string;
  desc: string;
  date: string;
}

interface GaleriItem {
  label: string;
  cat: "Kegiatan" | "UMKM" | "Potensi";
  grad: string; // sementara pengganti foto asli
}

interface Potensi {
  num: string; // "01".."06"
  title: string;
  desc: string;
}
```

Semua data dummy (nama UMKM, berita, galeri, potensi) sudah ada di HTML lama sebelumnya — bisa dipindah langsung ke `lib/data.ts` tanpa perlu dikarang ulang.

## 6. Catatan untuk Instruksi ke AI

Saat meminta AI mengisi tampilan per halaman, sertakan:
1. Section mana dari dokumen ini yang sedang dikerjakan (mis. "isi `/app/page.tsx` sesuai bagian 4.1")
2. Tegaskan **jangan bikin ulang page Potensi atau Kontak sebagai route terpisah** — kontennya sudah dipindah sesuai bagian 4.1 dan 4.2
3. Ingatkan AI pakai token warna dari bagian 2, bukan warna default shadcn
4. Untuk gambar (UMKM cover, galeri, foto profil), karena belum ada foto asli, gunakan CSS gradient placeholder dulu (sudah tersedia di data) — jangan generate gambar AI kecuali diminta eksplisit
