import { getUmkmList } from "@/lib/db";
import UmkmClientPage from "./UmkmClientPage";

export const dynamic = "force-dynamic";

export default async function UmkmPage() {
  const umkmList = await getUmkmList();

  return <UmkmClientPage initialUmkm={umkmList} />;
}
