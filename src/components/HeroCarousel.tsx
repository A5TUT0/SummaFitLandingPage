import { Iphone } from "./ui/iphone";

const HERO_VIDEO = "/summafit-app-preview.mp4";
const HERO_VIDEO_POSTER = "/summafit-app-preview-poster.jpg";

export default function HeroCarousel() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <Iphone
        className="hero-product-image"
        videoSrc={HERO_VIDEO}
        videoPoster={HERO_VIDEO_POSTER}
      />
    </div>
  );
}
