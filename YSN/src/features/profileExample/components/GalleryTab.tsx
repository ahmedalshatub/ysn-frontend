import GalleryViewer from "../../../shared/components/media/GalleryViewer";
import { mockGalleryImages } from "../types/profileData";

const GalleryTab = () => (
  <GalleryViewer
    images={mockGalleryImages.map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.title,
    }))}
    columns={3}
    gap="md"
    rounded
  />
);

export default GalleryTab;
