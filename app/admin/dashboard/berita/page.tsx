import { getBeritaList } from "@/lib/db";
import BeritaClientPage from "./BeritaClientPage";

export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  const newsList = await getBeritaList();

  return <BeritaClientPage initialNews={newsList} />;
}
