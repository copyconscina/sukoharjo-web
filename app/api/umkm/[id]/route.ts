import { NextRequest, NextResponse } from "next/server";
import { getUmkmById, deleteUmkm } from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  if (Number.isNaN(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid UMKM id" }, { status: 400 });
  }

  try {
    const umkm = await getUmkmById(id);
    if (!umkm) {
      return NextResponse.json({ error: "UMKM not found" }, { status: 404 });
    }
    return NextResponse.json(umkm);
  } catch (error) {
    console.error(`Failed to fetch UMKM by id ${id}:`, error);
    return NextResponse.json({ error: "Failed to fetch UMKM" }, { status: 500 });
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
    return NextResponse.json({ error: "Invalid UMKM id" }, { status: 400 });
  }

  try {
    const success = await deleteUmkm(id);
    if (!success) {
      return NextResponse.json({ error: "Failed to delete UMKM" }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/umkm");
    revalidatePath(`/umkm/${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Failed to delete UMKM with id ${id}:`, error);
    return NextResponse.json({ error: "Failed to delete UMKM" }, { status: 500 });
  }
}
