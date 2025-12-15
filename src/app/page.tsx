import HeroVideo from "@/components/hero/HeroVideo";
import Hakkimizda from "@/components/home/Hakkimizda";
import Hizmetler from "@/components/home/Hizmetler";
import Iletisim from "@/components/home/Iletisim";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <HeroVideo videoUrl={site.heroVideoUrl} posterUrl={site.heroPosterUrl} />
      <Hakkimizda />
      <Hizmetler />
      <Iletisim />
    </>
  );
}
