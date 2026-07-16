import { cookies } from "next/headers";

export const ADMIN_USER = "admin";
export const ADMIN_PASS = "desaSukoharjo2026";
export const SESSION_COOKIE = "admin_session";
export const SESSION_TOKEN = "desasukoharjo_authenticated_token_2026";

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return token === SESSION_TOKEN;
}

export async function setAuthSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    sameSite: "lax",
  });
}

export async function clearAuthSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
