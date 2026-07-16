import { NextRequest, NextResponse } from "next/server";
import { getBeritaById, deleteBeritaById } from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  if (Number.isNaN(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid berita id" }, { status: 400 });
  }

  try {
    const berita = await getBeritaById(id);
    if (!berita) {
      return NextResponse.json({ error: "Berita not found" }, { status: 404 });
    }
    return NextResponse.json(berita);
  } catch (error) {
    console.error(`Failed to fetch berita by id ${id}:`, error);
    return NextResponse.json({ error: "Failed to fetch berita" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  if (Number.isNaN(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid berita id" }, { status: 400 });
  }

  try {
    const success = await deleteBeritaById(id);
    if (!success) {
      return NextResponse.json({ error: "Failed to delete berita" }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/berita");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Failed to delete berita by id ${id}:`, error);
    return NextResponse.json({ error: "Failed to delete berita" }, { status: 500 });
  }
}
