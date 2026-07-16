import { NextRequest, NextResponse } from "next/server";
import { getUmkmList, saveUmkm } from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(_: NextRequest) {
  try {
    const umkmList = await getUmkmList();
    return NextResponse.json(umkmList);
  } catch (error) {
    console.error("Failed to fetch UMKM list:", error);
    return NextResponse.json({ error: "Failed to fetch UMKM list" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const itemData = await req.json();

    // Basic validation
    if (
      !itemData.name ||
      !itemData.owner ||
      !itemData.category ||
      !itemData.product ||
      !itemData.desc ||
      !itemData.address ||
      !itemData.wa
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const saved = await saveUmkm(itemData);

    revalidatePath("/");
    revalidatePath("/umkm");
    if (itemData.id) {
      revalidatePath(`/umkm/${itemData.id}`);
    }

    return NextResponse.json({ success: true, item: saved });
  } catch (error) {
    console.error("Failed to save UMKM via API:", error);
    return NextResponse.json({ error: "Failed to save UMKM" }, { status: 500 });
  }
}
