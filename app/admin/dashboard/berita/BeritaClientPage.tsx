"use client";

import { useState } from "react";
import { Berita } from "@/lib/data";
import { addBeritaAction, deleteBeritaAction } from "@/app/admin/actions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Props {
  initialNews: Berita[];
}

export default function BeritaClientPage({ initialNews }: Props) {
  const [news, setNews] = useState<Berita[]>(initialNews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("Kegiatan");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !desc.trim()) {
      setError("Semua field wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await addBeritaAction(tag, title.trim(), desc.trim());
      if (res.success) {
        // Optimistically calculate current date format
        const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
        const dateStr = new Date().toLocaleDateString("id-ID", options);
        
        const newArticle: Berita = {
          tag,
          cls: tag.toLowerCase() === "pengumuman" ? "pengumuman" : "",
          title: title.trim(),
          desc: desc.trim(),
          date: dateStr,
        };

        setNews([newArticle, ...news]);
        setTitle("");
        setDesc("");
        setSuccess("Berita berhasil ditambahkan!");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal menambahkan berita.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (targetTitle: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus berita "${targetTitle}"?`)) {
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const res = await deleteBeritaAction(targetTitle);
      if (res.success) {
        setNews(news.filter((b) => b.title !== targetTitle));
        setSuccess("Berita berhasil dihapus!");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus berita.");
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div>
        <p className="eyebrow">Pengelolaan</p>
        <h1 className="text-3xl font-heading mt-2" style={{ color: "var(--forest-deep)" }}>
          Kelola Berita & Pengumuman
        </h1>
        <p className="text-sm text-[color:var(--ink-soft)] mt-1">
          Tambahkan pengumuman resmi desa, agenda rapat, kegiatan pembangunan, atau warta lainnya di balai desa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Add News */}
        <div className="lg:col-span-5">
          <Card className="border border-[color:var(--line)] p-6 bg-[color:var(--card)] shadow-sm">
            <h2 className="text-lg font-heading mb-4 text-[color:var(--forest-deep)]">
              Tambah Berita Baru
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[color:var(--ink-soft)] mb-1">
                  Kategori / Tag
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full h-10 px-3 border border-[color:var(--line)] bg-[color:var(--parchment)] rounded-xl text-sm font-sans outline-none focus:border-[color:var(--forest)]"
                >
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Agenda">Agenda</option>
                  <option value="Pembangunan">Pembangunan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[color:var(--ink-soft)] mb-1">
                  Judul Berita
                </label>
                <Input
                  type="text"
                  placeholder="Contoh: Kerja Bakti Dusun Ngrancah..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[color:var(--line)] bg-[color:var(--parchment)] rounded-xl"
                  style={{ height: "40px" }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[color:var(--ink-soft)] mb-1">
                  Isi / Ringkasan Berita
                </label>
                <textarea
                  placeholder="Tuliskan isi berita di sini..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-[color:var(--line)] bg-[color:var(--parchment)] rounded-xl text-sm font-sans outline-none focus:border-[color:var(--forest)] resize-none"
                />
              </div>

              {error && (
                <div className="p-3 text-xs bg-[color:var(--clay)]/10 text-[color:var(--clay)] border border-[color:var(--clay)]/20 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">
                  {success}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full border-none text-white font-medium"
                style={{
                  height: "40px",
                  background: "var(--forest)",
                  borderRadius: "20px"
                }}
              >
                {loading ? "Menyimpan..." : "Simpan Berita"}
              </Button>
            </form>
          </Card>
        </div>

        {/* News List */}
        <div className="lg:col-span-7">
          <Card className="border border-[color:var(--line)] p-6 bg-[color:var(--card)] shadow-sm">
            <h2 className="text-lg font-heading mb-4 text-[color:var(--forest-deep)]">
              Daftar Berita Aktif ({news.length})
            </h2>

            {news.length === 0 ? (
              <div className="text-center py-8 text-sm text-[color:var(--ink-soft)]">
                Belum ada berita yang ditambahkan.
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1">
                {news.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[color:var(--line)] bg-[color:var(--parchment-2)] flex items-start justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <Badge className={`tag ${item.cls} border-none w-fit inline-flex justify-center`} variant="default" style={{ height: "auto", fontSize: "10px" }}>
                          {item.tag}
                        </Badge>
                        <span className="text-[11px] font-mono text-[color:var(--ink-soft)]">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="font-heading text-sm text-[color:var(--ink)]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[color:var(--ink-soft)] line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(item.title)}
                      className="p-2 hover:bg-[color:var(--clay)]/10 text-[color:var(--clay)] rounded-lg transition-colors border-none bg-transparent cursor-pointer flex-shrink-0"
                      title="Hapus berita"
                    >
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" width="16" height="16">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
