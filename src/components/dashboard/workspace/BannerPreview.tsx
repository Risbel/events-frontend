import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";
import { format, addDays } from "date-fns";
import Image from "next/image";

const BannerPreview = ({ values }: { values: any }) => {
  return (
    <div id="1" className="relative h-screen w-full">
      <div className="absolute flex justify-center items-center overflow-hidden -z-20 w-full">
        {values && (
          <img
            className="h-screen w-full object-cover"
            src={
              values?.bannerImage && values?.bannerImage?.[0]?.name
                ? URL.createObjectURL(values?.bannerImage?.[0])
                : "/img-random.png"
            }
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
              {values.h1Banner}
            </h1>

            <p style={{ color: values.h1BannerColor }}>
              {values.startDate && values.endDate && (
                <span className="font-thin">
                  From {format(addDays(new Date(values.startDate), 1), "MMMM-d/yy")}
                  {" to "}
                  {format(addDays(new Date(values.endDate), 1), "MMMM-d/yy")}
                </span>
              )}
            </p>

            <p
              style={{ color: `${values.bannerDescriptionColor}` }}
              className="text-xl md:text-3xl text-center md:text-left py-4 md:w-2/3"
            >
              {values.bannerDescription}
            </p>

            <a
              href="#4"
              style={{
                background: values.bgNavbarColor,
                color: values.navbarForeground,
                border: `2px solid ${values.navbarForeground}`,
              }}
              className="px-6 py-2 hover:opacity-95 rounded-lg font-semibold text-lg md:text-xl hover:-translate-y-1  shadow-2xl hover:shadow-white transition-transform cursor-pointer"
            >
              RESERVE NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPreview;
