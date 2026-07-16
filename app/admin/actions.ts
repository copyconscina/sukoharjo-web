"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addBerita,
  deleteBerita,
  addGaleri,
  deleteGaleri,
  updatePotensi,
  saveUmkm,
  deleteUmkm,
} from "@/lib/db";
import { Umkm, Berita, GaleriItem } from "@/lib/data";
import { supabaseServer } from "@/lib/supabase-server";

const ADMIN_USER = "admin";
const ADMIN_PASS = "desaSukoharjo2026";
const SESSION_COOKIE = "admin_session";
const SESSION_TOKEN = "desasukoharjo_authenticated_token_2026";

// Auth Actions
export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "lax",
    });
    return { success: true };
  }

  return { success: false, error: "Username atau password salah!" };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function checkAuthAction(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return token === SESSION_TOKEN;
}

// Berita Actions
export async function addBeritaAction(tag: string, title: string, desc: string) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  // Format date to: "DD MMM YYYY" (e.g. "15 Jul 2026")
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Date().toLocaleDateString("id-ID", options);

  const newBerita: Omit<Berita, "date"> & { date?: string } = {
    tag,
    cls: tag.toLowerCase() === "pengumuman" ? "pengumuman" : tag.toLowerCase() === "pembangunan" ? "pembangunan" : "",
    title,
    desc,
  };

  await addBerita(newBerita);
  
  revalidatePath("/");
  revalidatePath("/berita");
  return { success: true };
}

export async function deleteBeritaAction(title: string) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  await deleteBerita(title);

  revalidatePath("/");
  revalidatePath("/berita");
  return { success: true };
}

// Galeri Actions
export async function addGaleriAction(label: string, cat: string, grad: string, image?: string) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  const newItem: GaleriItem = {
    label,
    cat,
    grad,
    image,
  };

  await addGaleri(newItem);

  revalidatePath("/");
  revalidatePath("/galeri");
  return { success: true };
}

export async function deleteGaleriAction(label: string) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  await deleteGaleri(label);

  revalidatePath("/");
  revalidatePath("/galeri");
  return { success: true };
}

// Potensi Actions
export async function updatePotensiAction(num: string, title: string, desc: string) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  await updatePotensi(num, title, desc);

  revalidatePath("/");
  revalidatePath("/potensi");
  return { success: true };
}

// UMKM Actions
export async function saveUmkmAction(itemData: Omit<Umkm, "id"> & { id?: number }) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  const saved = await saveUmkm(itemData);

  revalidatePath("/");
  revalidatePath("/umkm");
  if (itemData.id) {
    revalidatePath(`/umkm/${itemData.id}`);
  }
  return { success: true, item: saved };
}

export async function deleteUmkmAction(id: number) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  await deleteUmkm(id);

  revalidatePath("/");
  revalidatePath("/umkm");
  revalidatePath(`/umkm/${id}`);
  return { success: true };
}

export async function uploadImageAction(formData: FormData) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { success: false, error: "Tidak ada file yang diunggah." };
  }

  // Basic validation (only images)
  if (!file.type.startsWith("image/")) {
    return { success: false, error: "File harus berupa gambar (JPG, PNG, WebP, dll)." };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;

    // Upload to Supabase Storage bucket 'sukoharjo-assets'
    const { data: uploadData, error: uploadError } = await supabaseServer.storage
      .from("sukoharjo-assets")
      .upload(uniqueFilename, buffer, {
        contentType: file.type,
        duplex: "half", // standard option for node streams
      } as any);

    if (uploadError) {
      console.error("Supabase Storage upload error:", uploadError);
      return { success: false, error: `Gagal mengunggah foto ke storage: ${uploadError.message}` };
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabaseServer.storage
      .from("sukoharjo-assets")
      .getPublicUrl(uniqueFilename);

    return { success: true, url: publicUrlData.publicUrl };
  } catch (err) {
    console.error("Failed to upload image to Supabase Storage:", err);
    return { success: false, error: "Gagal menyimpan gambar di cloud storage." };
  }
}
