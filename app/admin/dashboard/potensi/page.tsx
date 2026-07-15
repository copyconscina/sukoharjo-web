import { getPotensiList } from "@/lib/db";
import PotensiClientPage from "./PotensiClientPage";

export const dynamic = "force-dynamic";

export default function PotensiPage() {
  const potentials = getPotensiList();

  return <PotensiClientPage initialPotentials={potentials} />;
}
