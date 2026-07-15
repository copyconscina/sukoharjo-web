"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
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

  const newBerita: Berita = {
    tag,
    cls: tag.toLowerCase() === "pengumuman" ? "pengumuman" : "",
    title,
    desc,
    date: formattedDate,
  };

  addBerita(newBerita);
  
  revalidatePath("/");
  revalidatePath("/berita");
  return { success: true };
}

export async function deleteBeritaAction(title: string) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  deleteBerita(title);

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

  addGaleri(newItem);

  revalidatePath("/");
  revalidatePath("/galeri");
  return { success: true };
}

export async function deleteGaleriAction(label: string) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  deleteGaleri(label);

  revalidatePath("/");
  revalidatePath("/galeri");
  return { success: true };
}

// Potensi Actions
export async function updatePotensiAction(num: string, title: string, desc: string) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  updatePotensi(num, title, desc);

  revalidatePath("/");
  revalidatePath("/potensi");
  return { success: true };
}

// UMKM Actions
export async function saveUmkmAction(itemData: Omit<Umkm, "id"> & { id?: number }) {
  const isAuth = await checkAuthAction();
  if (!isAuth) throw new Error("Unauthorized");

  const saved = saveUmkm(itemData);

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

  deleteUmkm(id);

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

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(path.join(uploadDir, uniqueFilename), buffer);
    return { success: true, url: `/uploads/${uniqueFilename}` };
  } catch (err) {
    console.error("Failed to upload image:", err);
    return { success: false, error: "Gagal menyimpan gambar di server." };
  }
}
