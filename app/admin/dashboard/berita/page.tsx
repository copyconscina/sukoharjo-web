import { fetchBeritaList } from "@/lib/beritaApi";
import BeritaClientPage from "./BeritaClientPage";

export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  const newsList = await fetchBeritaList();

  return <BeritaClientPage initialNews={newsList} />;
}
