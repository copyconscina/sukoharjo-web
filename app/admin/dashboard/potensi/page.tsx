import { getPotensiList } from "@/lib/db";
import PotensiClientPage from "./PotensiClientPage";

export const dynamic = "force-dynamic";

export default async function PotensiPage() {
  const potentials = await getPotensiList();

  return <PotensiClientPage initialPotentials={potentials} />;
}
