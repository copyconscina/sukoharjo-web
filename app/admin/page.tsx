import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = await checkAuth();
  if (isAuth) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}
