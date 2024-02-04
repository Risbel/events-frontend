import { useGetBannerImages } from "@/hooks/useGetBannerImages";
import { DiscoDetail } from "@/services/getDisco";
import Image from "next/image";

const BannerImages = ({ discoDetails }: { discoDetails: DiscoDetail }) => {
  const { data } = useGetBannerImages(discoDetails.id);

  return (
    <div className="absolute flex justify-center items-center overflow-hidden -z-20">
      {data &&
        data?.map((img) => (
          <Image
            className="h-screen w-screen object-cover"
            src={img.image}
            alt="Banner image"
            key={img.id}
            width={1000}
            height={300}
          />
        ))}
      <div
        style={{
          background: `linear-gradient(to top, ${discoDetails.discoColor.bannerGradientColor}, ${discoDetails.discoColor.bannerGradientColor}80 , transparent, transparent)`,
        }}
        className="absolute h-5/6 w-screen bottom-0"
      ></div>
    </div>
  );
};

export default BannerImages;
