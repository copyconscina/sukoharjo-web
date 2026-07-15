import fs from "fs";
import path from "path";
import { umkmData, beritaData, galeriData, potensiData, Umkm, Berita, GaleriItem, Potensi } from "./data";

const DB_FILE = path.join(process.cwd(), "lib", "db.json");

interface DbData {
  umkmData: Umkm[];
  beritaData: Berita[];
  galeriData: GaleriItem[];
  potensiData: Potensi[];
}

function initDb(): DbData {
  if (!fs.existsSync(DB_FILE)) {
    const initialData: DbData = {
      umkmData,
      beritaData,
      galeriData,
      potensiData,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw) as DbData;
  } catch (err) {
    console.error("Failed to parse db.json, resetting to defaults", err);
    const initialData: DbData = {
      umkmData,
      beritaData,
      galeriData,
      potensiData,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }
}

function saveDb(data: DbData) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

// UMKM CRUD
export function getUmkmList(): Umkm[] {
  const db = initDb();
  return db.umkmData;
}

export function getUmkmById(id: number): Umkm | undefined {
  const list = getUmkmList();
  return list.find((u) => u.id === id);
}

export function saveUmkm(item: Omit<Umkm, "id"> & { id?: number }): Umkm {
  const db = initDb();
  let savedItem: Umkm;

  if (item.id) {
    // Edit existing
    const idx = db.umkmData.findIndex((u) => u.id === item.id);
    if (idx !== -1) {
      savedItem = { ...item, id: item.id } as Umkm;
      db.umkmData[idx] = savedItem;
    } else {
      // Fallback: treat as new or error
      const newId = db.umkmData.length > 0 ? Math.max(...db.umkmData.map((u) => u.id)) + 1 : 1;
      savedItem = { ...item, id: newId } as Umkm;
      db.umkmData.push(savedItem);
    }
  } else {
    // Add new
    const newId = db.umkmData.length > 0 ? Math.max(...db.umkmData.map((u) => u.id)) + 1 : 1;
    savedItem = { ...item, id: newId } as Umkm;
    db.umkmData.push(savedItem);
  }

  saveDb(db);
  return savedItem;
}

export function deleteUmkm(id: number): boolean {
  const db = initDb();
  const initialLength = db.umkmData.length;
  db.umkmData = db.umkmData.filter((u) => u.id !== id);
  if (db.umkmData.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// Berita CRUD
export function getBeritaList(): Berita[] {
  const db = initDb();
  return db.beritaData;
}

export function addBerita(item: Berita): Berita {
  const db = initDb();
  db.beritaData.unshift(item); // Add to the beginning of the list
  saveDb(db);
  return item;
}

export function deleteBerita(title: string): boolean {
  const db = initDb();
  const initialLength = db.beritaData.length;
  db.beritaData = db.beritaData.filter((b) => b.title !== title);
  if (db.beritaData.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// Galeri CRUD
export function getGaleriList(): GaleriItem[] {
  const db = initDb();
  return db.galeriData;
}

export function addGaleri(item: GaleriItem): GaleriItem {
  const db = initDb();
  db.galeriData.unshift(item); // Add to the beginning of the list
  saveDb(db);
  return item;
}

export function deleteGaleri(label: string): boolean {
  const db = initDb();
  const initialLength = db.galeriData.length;
  db.galeriData = db.galeriData.filter((g) => g.label !== label);
  if (db.galeriData.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// Potensi CRUD
export function getPotensiList(): Potensi[] {
  const db = initDb();
  return db.potensiData;
}

export function updatePotensi(num: string, title: string, desc: string): boolean {
  const db = initDb();
  const idx = db.potensiData.findIndex((p) => p.num === num);
  if (idx !== -1) {
    db.potensiData[idx] = { num, title, desc };
    saveDb(db);
    return true;
  }
  return false;
}
