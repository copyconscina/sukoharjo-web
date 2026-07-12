export interface Umkm {
  id: number
  name: string
  owner: string
  category: string
  year: number
  product: string
  desc: string
  address: string
  wa: string
  social?: string
  grad: string
}

export interface Berita {
  tag: string
  cls: string
  title: string
  desc: string
  date: string
}

export interface GaleriItem {
  label: string
  cat: string
  grad: string
}

export interface Potensi {
  num: string
  title: string
  desc: string
}

export interface PopData {
  label: string
  val: number
}

export const umkmData: Umkm[] = [
  {
    id: 1,
    name: "Tiwul & Gaplek Bu Sarmi",
    owner: "Ibu Sarmi",
    category: "Kuliner",
    year: 2005,
    product: "Tiwul instan, gaplek goreng",
    desc: "Usaha olahan singkong turun-temurun khas Wonogiri, memproduksi tiwul instan siap saji dan gaplek goreng renyah dari singkong pilihan hasil kebun warga sekitar.",
    address: "Dusun Sukorejo RT 02/RW 01, Desa Sukoharjo",
    wa: "6281234500001",
    social: "@tiwulbusarmi",
    grad: "linear-gradient(135deg,#8b4226,#b0623d)"
  },
  {
    id: 2,
    name: "Batik Tulis Sukoharjo Asri",
    owner: "Bpk. Wagiman",
    category: "Fashion & Batik",
    year: 2012,
    product: "Kain batik tulis motif parang lereng",
    desc: "Sanggar batik rumahan yang melestarikan motif parang lereng khas Sukoharjo, dikerjakan dengan teknik tulis tangan oleh kelompok perajin ibu-ibu dusun.",
    address: "Dusun Ngrancah RT 01/RW 02, Desa Sukoharjo",
    wa: "6281234500002",
    social: "@batiksukoharjoasri",
    grad: "linear-gradient(135deg,#39542f,#8ba368)"
  },
  {
    id: 3,
    name: "Kerajinan Bambu Pak Darmo",
    owner: "Bpk. Darmo",
    category: "Kerajinan",
    year: 1998,
    product: "Besek, tampah, kap lampu bambu",
    desc: "Bengkel kerajinan bambu keluarga yang memproduksi besek, tampah, dan kap lampu hias dari bambu wulung lokal, dipasarkan hingga luar kecamatan.",
    address: "Dusun Karangnongko RT 03/RW 01, Desa Sukoharjo",
    wa: "6281234500003",
    social: "",
    grad: "linear-gradient(135deg,#8b4226,#d8a83a)"
  },
  {
    id: 4,
    name: "Keripik Ketela Mbok Jum",
    owner: "Ibu Jumini",
    category: "Kuliner",
    year: 2010,
    product: "Keripik singkong aneka rasa",
    desc: "Produsen keripik singkong rumahan dengan varian rasa balado, keju, dan original, menggunakan singkong segar dari kebun sendiri.",
    address: "Dusun Tanggulangin RT 02/RW 03, Desa Sukoharjo",
    wa: "6281234500004",
    social: "@keripikmbokjum",
    grad: "linear-gradient(135deg,#b0623d,#eec96e)"
  },
  {
    id: 5,
    name: "Madu Hutan Gunung Gandul",
    owner: "Kelompok Tani Lestari",
    category: "Pertanian",
    year: 2015,
    product: "Madu hutan murni",
    desc: "Hasil budidaya lebah oleh kelompok tani hutan, menghasilkan madu murni tanpa campuran yang dipanen langsung dari kawasan hutan sekitar desa.",
    address: "Dusun Sukorejo RT 04/RW 01, Desa Sukoharjo",
    wa: "6281234500005",
    social: "",
    grad: "linear-gradient(135deg,#d8a83a,#39542f)"
  },
  {
    id: 6,
    name: "Anyaman Pandan Ibu Wati",
    owner: "Ibu Wati",
    category: "Kerajinan",
    year: 2008,
    product: "Tikar & tas anyaman pandan",
    desc: "Usaha anyaman pandan rumahan yang menghasilkan tikar dan tas dengan motif khas, dikerjakan bersama kelompok PKK dusun.",
    address: "Dusun Ngrancah RT 02/RW 02, Desa Sukoharjo",
    wa: "6281234500006",
    social: "@anyamanibuwati",
    grad: "linear-gradient(135deg,#4d6b40,#c3d19f)"
  },
  {
    id: 7,
    name: "Jamu Gendong Sehat Alami",
    owner: "Ibu Painem",
    category: "Kuliner",
    year: 2000,
    product: "Beras kencur, kunyit asam",
    desc: "Usaha jamu tradisional keliling dan kemasan botol, mempertahankan resep turun-temurun beras kencur dan kunyit asam tanpa bahan pengawet.",
    address: "Dusun Karangnongko RT 01/RW 02, Desa Sukoharjo",
    wa: "6281234500007",
    social: "",
    grad: "linear-gradient(135deg,#8ba368,#8b4226)"
  },
  {
    id: 8,
    name: "Ternak Kambing Etawa Berkah Tani",
    owner: "Kelompok Ternak Berkah",
    category: "Peternakan",
    year: 2018,
    product: "Susu & bibit kambing etawa",
    desc: "Kelompok ternak yang mengembangkan kambing etawa untuk produksi susu segar dan penjualan bibit unggul ke wilayah sekitar Wonogiri.",
    address: "Dusun Tanggulangin RT 01/RW 01, Desa Sukoharjo",
    wa: "6281234500008",
    social: "@berkahtaniewata",
    grad: "linear-gradient(135deg,#212f1c,#8b4226)"
  }
]

export const beritaData: Berita[] = [
  {
    tag: "Kegiatan",
    cls: "",
    title: "Panen Raya Bersama Kelompok Tani Sukorejo",
    date: "28 Jun 2026",
    desc: "Warga Dusun Sukorejo menggelar panen raya padi ladang sekaligus syukuran hasil tani tahun ini."
  },
  {
    tag: "Pengumuman",
    cls: "pengumuman",
    title: "Pendataan Ulang UMKM Desa 2026",
    desc: "Seluruh pelaku UMKM diminta memperbarui data usaha melalui perangkat dusun paling lambat akhir Juli.",
    date: "20 Jun 2026"
  },
  {
    tag: "Agenda",
    cls: "",
    title: "Pelatihan Kemasan Produk UMKM",
    desc: "Dinas Koperasi Kab. Wonogiri akan mengadakan pelatihan kemasan produk di Balai Desa Sukoharjo.",
    date: "5 Jul 2026"
  },
  {
    tag: "Kegiatan",
    cls: "",
    title: "Kerja Bakti Perbaikan Jalan Dusun Ngrancah",
    date: "1 Jul 2026",
    desc: "Kegiatan gotong royong memperbaiki akses jalan menuju sentra batik tulis di Dusun Ngrancah."
  },
  {
    tag: "Pengumuman",
    cls: "pengumuman",
    title: "Jadwal Posyandu Bulan Juli",
    date: "3 Jul 2026",
    desc: "Jadwal posyandu balita dan lansia untuk seluruh dusun telah ditetapkan, cek papan pengumuman dusun."
  },
  {
    tag: "Agenda",
    cls: "",
    title: "Musyawarah Desa Rencana Pembangunan",
    date: "15 Jul 2026",
    desc: "Musdes membahas prioritas pembangunan infrastruktur dan dukungan UMKM tahun anggaran berikutnya."
  }
]

export const galeriData: GaleriItem[] = [
  { label: "Panen Raya Sukorejo", cat: "Kegiatan", grad: "linear-gradient(135deg,#39542f,#8ba368)" },
  { label: "Produksi Batik Tulis", cat: "UMKM", grad: "linear-gradient(135deg,#8b4226,#d8a83a)" },
  { label: "Sawah Berundak Sukoharjo", cat: "Potensi", grad: "linear-gradient(135deg,#212f1c,#4d6b40)" },
  { label: "Anyaman Bambu Pak Darmo", cat: "UMKM", grad: "linear-gradient(135deg,#b0623d,#eec96e)" },
  { label: "Kerja Bakti Dusun Ngrancah", cat: "Kegiatan", grad: "linear-gradient(135deg,#4d6b40,#c3d19f)" },
  { label: "Kebun Mete Warga", cat: "Potensi", grad: "linear-gradient(135deg,#8ba368,#39542f)" },
  { label: "Kambing Etawa Berkah Tani", cat: "UMKM", grad: "linear-gradient(135deg,#212f1c,#8b4226)" },
  { label: "Musyawarah Desa", cat: "Kegiatan", grad: "linear-gradient(135deg,#d8a83a,#8b4226)" }
]

export const potensiData: Potensi[] = [
  { num: "01", title: "Pertanian Lahan Kering", desc: "Padi gogo, jagung, dan singkong ditanam memanfaatkan pola tadah hujan di lahan berundak, dengan hasil singkong menjadi bahan baku utama UMKM olahan pangan desa." },
  { num: "02", title: "Perkebunan Mete", desc: "Pohon mete tumbuh di lereng-lereng bukit, hasilnya sebagian dijual mentah dan sebagian diolah menjadi kacang mete kemasan oleh kelompok tani." },
  { num: "03", title: "Kerajinan Bambu & Pandan", desc: "Rumpun bambu dan pandan yang melimpah dimanfaatkan menjadi besek, tampah, tikar, hingga tas anyaman bernilai jual." },
  { num: "04", title: "Batik Tulis Lokal", desc: "Motif parang lereng khas Sukoharjo diproduksi terbatas oleh perajin rumahan, berpotensi menjadi produk unggulan bernilai ekonomi tinggi." },
  { num: "05", title: "Peternakan Kambing Etawa", desc: "Kelompok ternak mengembangkan susu dan bibit kambing etawa sebagai sumber pendapatan tambahan warga." },
  { num: "06", title: "Wisata Alam Perbukitan", desc: "Pemandangan sawah berundak dan udara sejuk berpotensi dikembangkan menjadi jalur wisata trekking dan agrowisata." }
]

export const popData: PopData[] = [
  { label: "Dusun Sukorejo", val: 512 },
  { label: "Dusun Karangnongko", val: 450 },
  { label: "Dusun Ngrancah", val: 380 },
  { label: "Dusun Tanggulangin", val: 290 }
]

export const STAT = {
  dusun: 4,
  population: "1.632",
  umkm: 27,
  categories: 6
}
