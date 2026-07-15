import { getUmkmList } from "@/lib/db";
import UmkmClientPage from "./UmkmClientPage";

export const dynamic = "force-dynamic";

export default function UmkmPage() {
  const umkmList = getUmkmList();

  return <UmkmClientPage initialUmkm={umkmList} />;
}
