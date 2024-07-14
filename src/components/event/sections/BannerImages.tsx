import { useGetBannerImages } from "@/hooks/useGetBannerImages";
import { DiscoDetail } from "@/services/getDisco";
import { useEffect, useState } from "react";

const BannerImages = ({ discoDetails }: { discoDetails: DiscoDetail }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { data } = useGetBannerImages(discoDetails.id);

  useEffect(() => {
    if (!data) {
      return;
    }
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % data.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [currentImage, data]);

  const changeImage = (index: number) => {
    setCurrentImage(index);
  };

  if (!data) {
    return;
  }

  return (
    <div>
      <div className="absolute items-center overflow-hidden z-10">
        {data &&
          data?.map(
            (img, index) =>
              img?.image && (
                <img
                  className={`h-screen w-screen object-cover ${
                    index === currentImage ? "opacity-100" : "opacity-0 absolute"
                  } transition-opacity duration-1000`}
                  src={img.image}
                  alt="Banner image"
                  key={img.id}
                  width={1000}
                  height={300}
                />
              )
          )}
        <div
          style={{
            background: `linear-gradient(to top, ${discoDetails.discoColor.bannerGradientColor}, ${discoDetails.discoColor.bannerGradientColor}80 , transparent, transparent)`,
          }}
          className="absolute h-5/6 w-screen bottom-0"
        ></div>
      </div>
      <div className="absolute z-50 flex justify-center items-center space-x-4 bottom-4 w-full">
        {data &&
          data.map((_, index) => (
            <button
              style={{ background: discoDetails.discoColor.h1BannerColor }}
              key={index}
              onClick={() => changeImage(index)}
              className={`w-3 h-3 rounded-full cursor-pointer hover:scale-110 ${
                index === currentImage ? "opacity-100" : "opacity-50"
              }`}
            ></button>
          ))}
      </div>
    </div>
  );
};

export default BannerImages;
