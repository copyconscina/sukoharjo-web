import { supabase } from "./supabase";
import { supabaseServer } from "./supabase-server";
import { Umkm, Berita, GaleriItem, Potensi } from "./data";

// UMKM DB Operations
export async function getUmkmList(): Promise<Umkm[]> {
  const { data, error } = await supabase
    .from("umkm")
    .select("*")
    .order("id", { ascending: true });
    
  if (error) {
    console.error("Error fetching UMKM list:", error);
    return [];
  }
  return data as Umkm[];
}

export async function getUmkmById(id: number): Promise<Umkm | undefined> {
  const { data, error } = await supabase
    .from("umkm")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching UMKM with id ${id}:`, error);
    return undefined;
  }
  return data as Umkm;
}

export async function saveUmkm(item: Omit<Umkm, "id"> & { id?: number }): Promise<Umkm> {
  const payload = {
    name: item.name,
    owner: item.owner,
    category: item.category,
    year: item.year,
    product: item.product,
    desc: item.desc,
    address: item.address,
    wa: item.wa,
    social: item.social || null,
    grad: item.grad || "",
    image: item.image || null,
  };

  if (item.id) {
    const { data, error } = await supabaseServer
      .from("umkm")
      .update(payload)
      .eq("id", item.id)
      .select()
      .single();
      
    if (error) throw error;
    return data as Umkm;
  } else {
    const { data, error } = await supabaseServer
      .from("umkm")
      .insert(payload)
      .select()
      .single();
      
    if (error) throw error;
    return data as Umkm;
  }
}

export async function deleteUmkm(id: number): Promise<boolean> {
  const { error } = await supabaseServer
    .from("umkm")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting UMKM ${id}:`, error);
    return false;
  }
  return true;
}

// Berita DB Operations
export async function getBeritaList(): Promise<Berita[]> {
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching Berita list:", error);
    return [];
  }

  return data.map((b) => ({
    tag: b.tag,
    cls: b.cls || "",
    title: b.title,
    desc: b.desc || "",
    date: new Date(b.published_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  })) as Berita[];
}

export async function addBerita(item: Omit<Berita, "date"> & { date?: string }): Promise<Berita> {
  const { data, error } = await supabaseServer
    .from("berita")
    .insert({
      tag: item.tag,
      cls: item.cls || "",
      title: item.title,
      desc: item.desc,
      published_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  
  return {
    tag: data.tag,
    cls: data.cls || "",
    title: data.title,
    desc: data.desc || "",
    date: new Date(data.published_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
}

export async function deleteBerita(title: string): Promise<boolean> {
  const { error } = await supabaseServer
    .from("berita")
    .delete()
    .eq("title", title);

  if (error) {
    console.error(`Error deleting Berita "${title}":`, error);
    return false;
  }
  return true;
}

// Galeri DB Operations
export async function getGaleriList(): Promise<GaleriItem[]> {
  const { data, error } = await supabase
    .from("galeri")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching Galeri list:", error);
    return [];
  }
  return data as GaleriItem[];
}

export async function addGaleri(item: GaleriItem): Promise<GaleriItem> {
  const { data, error } = await supabaseServer
    .from("galeri")
    .insert({
      label: item.label,
      cat: item.cat,
      grad: item.grad || "",
      image: item.image || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as GaleriItem;
}

export async function deleteGaleri(label: string): Promise<boolean> {
  const { error } = await supabaseServer
    .from("galeri")
    .delete()
    .eq("label", label);

  if (error) {
    console.error(`Error deleting Galeri "${label}":`, error);
    return false;
  }
  return true;
}

// Potensi DB Operations
export async function getPotensiList(): Promise<Potensi[]> {
  const { data, error } = await supabase
    .from("potensi")
    .select("*")
    .order("num", { ascending: true });

  if (error) {
    console.error("Error fetching Potensi list:", error);
    return [];
  }
  return data as Potensi[];
}

export async function updatePotensi(num: string, title: string, desc: string): Promise<boolean> {
  const { error } = await supabaseServer
    .from("potensi")
    .update({ title, desc, updated_at: new Date().toISOString() })
    .eq("num", num);

  if (error) {
    console.error(`Error updating Potensi ${num}:`, error);
    return false;
  }
  return true;
}
