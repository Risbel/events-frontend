import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";
import Image from "next/image";

const BannerPreview = ({ values }: { values: AddDiscoSchema }) => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute flex justify-center items-center overflow-hidden -z-20 w-full">
        {values && (
          <Image
            className="h-screen w-full object-cover"
            src={values?.bannerImage ? values?.bannerImage : "/"}
            alt="Banner image"
            width={1000}
            height={500}
          />
        )}
        <div
          style={{
            background: `linear-gradient(to top, ${values.bannerGradientColor}, ${values.bannerGradientColor}80 , transparent, transparent)`,
          }}
          className="absolute h-5/6 w-full bottom-0"
        ></div>
      </div>

      <div className="relative flex items-end z-10 h-screen">
        <div className="flex flex-col gap-2 items-baseline mb-4 lg:mb-8 px-2 md:px-6 lg:px-10 w-full">
          <div className="flex flex-col items-center md:items-baseline w-full">
            <h1
              className="font-bold text-3xl md:text-4xl lg:text-6xl text-center md:text-start"
              style={{ color: `${values.h1BannerColor}` }}
            >
              {values.h1Banner?.toUpperCase()}
            </h1>

            <p style={{ color: values.h1BannerColor }}>Miercoles 14 - Jueves 22 de febrero.</p>
          </div>

          <p
            style={{ color: `${values.bannerDescriptionColor}` }}
            className="text-xl md:text-3xl text-center md:text-left py-4 md:w-2/3"
          >
            {values.bannerDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerPreview;
