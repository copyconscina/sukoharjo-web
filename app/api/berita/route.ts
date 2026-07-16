import { NextRequest, NextResponse } from "next/server";
import { getBeritaList, addBerita, deleteBerita } from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Berita } from "@/lib/data";

export async function GET(_: NextRequest) {
  try {
    const beritaList = await getBeritaList();
    return NextResponse.json(beritaList);
  } catch (error) {
    console.error("Failed to fetch berita list:", error);
    return NextResponse.json({ error: "Failed to fetch berita list" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { tag, title, desc, images } = await req.json();

    if (!tag || !title || !desc) {
      return NextResponse.json({ error: "Missing required fields: tag, title, desc" }, { status: 400 });
    }

    const newBerita: Omit<Berita, "date"> & { date?: string } = {
      tag,
      cls: tag.toLowerCase() === "pengumuman" ? "pengumuman" : tag.toLowerCase() === "pembangunan" ? "pembangunan" : "",
      title,
      desc,
      images,
    };

    const saved = await addBerita(newBerita);

    revalidatePath("/");
    revalidatePath("/berita");

    return NextResponse.json({ success: true, item: saved });
  } catch (error) {
    console.error("Failed to add berita via API:", error);
    return NextResponse.json({ error: "Failed to add berita" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    let title = url.searchParams.get("title");

    if (!title) {
      // Fallback: check request body
      try {
        const body = await req.json();
        title = body.title;
      } catch (e) {
        // Body was empty or invalid JSON
      }
    }

    if (!title) {
      return NextResponse.json({ error: "Missing required field: title" }, { status: 400 });
    }

    const success = await deleteBerita(title);
    if (!success) {
      return NextResponse.json({ error: "Failed to delete berita" }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/berita");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete berita via API:", error);
    return NextResponse.json({ error: "Failed to delete berita" }, { status: 500 });
  }
}
