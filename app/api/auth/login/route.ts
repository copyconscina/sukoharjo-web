import { NextRequest, NextResponse } from "next/server";
import { ADMIN_USER, ADMIN_PASS, setAuthSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      await setAuthSession();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Username atau password salah!" }, { status: 401 });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ success: false, error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
