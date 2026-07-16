const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const envPath = path.join(__dirname, "..", ".env.local");
let supabaseUrl = "";
let supabaseServiceKey = "";

if (fs.existsSync(envPath)) {
  const envLines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of envLines) {
    const matchUrl = line.match(/^NEXT_PUBLIC_SUPABASE_URL=(.*)$/);
    const matchKey = line.match(/^SUPABASE_SERVICE_ROLE_KEY=(.*)$/);
    if (matchUrl) supabaseUrl = matchUrl[1].trim();
    if (matchKey) supabaseServiceKey = matchKey[1].trim();
  }
}

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: Please provide NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const dbPath = path.join(__dirname, "..", "lib", "db.json");
if (!fs.existsSync(dbPath)) {
  console.error("Error: lib/db.json not found. Run the project locally first to generate it.");
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

function parseIndoDate(dateStr) {
  const months = {
    jan: 0, feb: 1, mar: 2, apr: 3, mei: 4, jun: 5,
    jul: 6, agu: 7, sep: 8, okt: 9, nov: 10, des: 11
  };
  const parts = dateStr.trim().split(" ");
  if (parts.length !== 3) return new Date();
  const day = parseInt(parts[0], 10);
  const monthName = parts[1].toLowerCase();
  const year = parseInt(parts[2], 10);
  
  const month = months[monthName] !== undefined ? months[monthName] : 6;
  return new Date(year, month, day);
}

// Map UMKM
const umkms = db.umkmData.map(u => ({
  name: u.name,
  owner: u.owner,
  category: u.category,
  year: u.year,
  product: u.product,
  desc: u.desc,
  address: u.address,
  wa: u.wa,
  social: u.social || null,
  grad: u.grad,
  image: u.image || null
}));

// Map Berita
const news = db.beritaData.map(b => ({
  tag: b.tag,
  cls: b.cls || "",
  title: b.title,
  desc: b.desc,
  published_at: parseIndoDate(b.date).toISOString()
}));

// Map Galeri
const gallery = db.galeriData.map(g => ({
  label: g.label,
  cat: g.cat,
  grad: g.grad || "",
  image: g.image || null
}));

// Map Potensi
const potentials = db.potensiData.map(p => ({
  num: p.num,
  title: p.title,
  desc: p.desc
}));

async function run() {
  console.log("Migrating local database data to Supabase...");
  
  try {
    // Clear existing data (excluding potensi, since we can just upsert it)
    console.log("Cleaning target tables...");
    await supabase.from("umkm").delete().neq("id", 0);
    await supabase.from("berita").delete().neq("id", 0);
    await supabase.from("galeri").delete().neq("id", 0);
    
    // Insert UMKM
    console.log(`Inserting ${umkms.length} UMKM items...`);
    const { error: umkmErr } = await supabase.from("umkm").insert(umkms);
    if (umkmErr) throw umkmErr;

    // Insert Berita
    console.log(`Inserting ${news.length} news items...`);
    const { error: newsErr } = await supabase.from("berita").insert(news);
    if (newsErr) throw newsErr;

    // Insert Galeri
    console.log(`Inserting ${gallery.length} gallery items...`);
    const { error: galeriErr } = await supabase.from("galeri").insert(gallery);
    if (galeriErr) throw galeriErr;

    // Upsert Potensi
    console.log(`Upserting ${potentials.length} potentials...`);
    const { error: potensiErr } = await supabase.from("potensi").upsert(potentials);
    if (potensiErr) throw potensiErr;

    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

run();
