import { redirect } from "next/navigation";
import { checkAuthAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = await checkAuthAction();
  if (isAuth) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}
