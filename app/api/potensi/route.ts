import { NextRequest, NextResponse } from "next/server";
import { getPotensiList, updatePotensi } from "@/lib/db";
import { checkAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(_: NextRequest) {
  try {
    const list = await getPotensiList();
    return NextResponse.json(list);
  } catch (error) {
    console.error("Failed to fetch potensi list:", error);
    return NextResponse.json({ error: "Failed to fetch potensi list" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { num, title, desc } = await req.json();

    if (!num || !title || !desc) {
      return NextResponse.json({ error: "Missing required fields: num, title, desc" }, { status: 400 });
    }

    const success = await updatePotensi(num, title, desc);
    if (!success) {
      return NextResponse.json({ error: "Failed to update potensi" }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/potensi");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update potensi via API:", error);
    return NextResponse.json({ error: "Failed to update potensi" }, { status: 500 });
  }
}
