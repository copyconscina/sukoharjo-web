import { NextRequest, NextResponse } from "next/server";
import { clearAuthSession } from "@/lib/auth";

export async function POST(_: NextRequest) {
  try {
    await clearAuthSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json({ success: false, error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
