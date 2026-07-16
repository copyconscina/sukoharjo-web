import { getGaleriList } from "@/lib/db";
import GaleriClientPage from "./GaleriClientPage";

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  const galleryList = await getGaleriList();

  return <GaleriClientPage initialGallery={galleryList} />;
}
