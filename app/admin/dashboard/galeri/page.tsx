import { getGaleriList } from "@/lib/db";
import GaleriClientPage from "./GaleriClientPage";

export const dynamic = "force-dynamic";

export default function GaleriPage() {
  const galleryList = getGaleriList();

  return <GaleriClientPage initialGallery={galleryList} />;
}
