import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";

export async function GET(_: NextRequest) {
  try {
    const authenticated = await checkAuth();
    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error("Auth check API error:", error);
    return NextResponse.json({ authenticated: false, error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
