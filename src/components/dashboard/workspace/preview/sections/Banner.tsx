import { cn } from "@/lib/shadcnUtils";
import { format, addDays } from "date-fns";
import Image from "next/image";
import { AddDiscoSchema } from "../../schemas/addDiscoSchema";

const Banner = ({ values }: { values: AddDiscoSchema }) => {
  const variants = {
    variantA: [
      "items-center md:items-start col-span-full md:col-span-10 lg:col-span-12 lg:col-span-8",
      "",
      "",
      "text-center md:text-start",
    ],
    variantB: [
      "items-center md:items-start justify-center col-span-full md:col-span-10 lg:col-span-8",
      "",
      "",
      "text-center md:text-start",
    ],
    variantC: [
      "items-center md:items-start justify-end col-span-full md:col-span-10 lg:col-span-8",
      "",
      "",
      "text-center md:text-start",
    ],
    variantD: ["col-start-2 items-center col-span-10", "", "", "text-center"],
    variantE: ["col-start-2 items-center justify-center col-span-10", "", "", "text-center"],
    variantF: ["col-start-2 items-center justify-end col-span-10", "", "", "text-center"],
  };

  return (
    <div id="1" className="relative h-screen w-full">
      <div className="absolute flex justify-center items-center overflow-hidden -z-20 w-full">
        {values && (
          <Image
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

      <div className={cn("relative grid grid-cols-12 z-10 h-screen bottom-6 lg:bottom-0")}>
        <div
          className={cn(
            "flex flex-col mb-4 lg:mb-16 px-2 md:px-6 lg:px-10 w-full pt-24 gap-2",
            variants[values.layoutTextBanner][0]
          )}
        >
          <h1
            className={cn(`${values.h1Weight}`, `${values.h1BannerHeight}`, variants[values.layoutTextBanner][3])}
            style={{ color: `${values.h1BannerColor}` }}
          >
            {values.h1Banner}
          </h1>

          <p
            className={cn(
              "pl-1",
              variants[values.layoutTextBanner][3],
              values.dateDescriptionHeight,
              values.dateDescriptionWeight
            )}
            style={{ color: values.dateDescriptionColor }}
          >
            {values.startDate && values.endDate && !values.dateDescription ? (
              <span>
                From {format(addDays(new Date(values.startDate), 1), "MMMM-d/yy")}
                {" to "}
                {format(addDays(new Date(values.endDate), 1), "MMMM-d/yy")}
              </span>
            ) : (
              <span>{values.dateDescription}</span>
            )}
          </p>

          <p
            style={{ color: `${values.bannerDescriptionColor}` }}
            className={cn(
              "mb-4 pl-1",
              variants[values.layoutTextBanner][3],
              values.bannerDescriptionHeight,
              values.bannerDescriptionWeight
            )}
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
  );
};

export default Banner;
