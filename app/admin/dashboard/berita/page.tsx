import { getBeritaList } from "@/lib/db";
import BeritaClientPage from "./BeritaClientPage";

export const dynamic = "force-dynamic";

export default function BeritaPage() {
  const newsList = getBeritaList();

  return <BeritaClientPage initialNews={newsList} />;
}
