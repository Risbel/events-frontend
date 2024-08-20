import { DataDisco, Subscription } from "@/services/getDisco";
import Image from "next/image";
import React from "react";
import BannerImages from "./BannerImages";
import SubscribeNow from "./SubscribeNow";
import { useSession } from "next-auth/react";
import { addDays, format } from "date-fns";
import Link from "next/link";
import useHandleScroll from "@/hooks/useHandlerScroll";
import { cn } from "@/lib/shadcnUtils";

const Head = ({ discoData }: { discoData: { disco: DataDisco; subscription: Subscription } }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleClickScroll = useHandleScroll();

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
    <div className="relative h-screen">
      <BannerImages discoDetails={discoData.disco.discoDetail} />
      <div className="relative grid grid-cols-12 z-10 h-screen bottom-6 lg:bottom-0 pt-16">
        <div
          className={cn(
            "flex flex-col mb-4 lg:mb-16 px-2 md:px-6 lg:px-10 w-full pt-24 gap-2",
            variants[discoData.disco.discoDetail.layoutTextBanner][0]
          )}
        >
          <h1
            className={cn(
              `${discoData.disco.discoDetail.h1Weight}`,
              `${discoData.disco.discoDetail.h1BannerHeight}`,
              `${variants[discoData.disco.discoDetail.layoutTextBanner][3]}`
            )}
            style={{ color: `${discoData.disco.discoDetail.discoColor.h1BannerColor}` }}
          >
            {discoData?.disco.discoDetail.h1Banner}
          </h1>
          <p
            className={cn(
              "pl-1",
              variants[discoData.disco.discoDetail.layoutTextBanner][3],
              discoData.disco.discoDetail.dateDescriptionHeight,
              discoData.disco.discoDetail.dateDescriptionWeight
            )}
            style={{
              color: discoData.disco.discoDetail.discoColor.dateDescriptionColor,
            }}
          >
            {discoData.disco.startDate && discoData.disco.endDate && (
              <span>{discoData.disco.discoDetail.dateDescription}</span>
            )}
          </p>
          <p
            style={{ color: `${discoData.disco.discoDetail.discoColor.bannerDescriptionColor}` }}
            className={cn(
              "mb-4 pl-1",
              variants[discoData.disco.discoDetail.layoutTextBanner][3],
              discoData.disco.discoDetail.bannerDescriptionHeight,
              discoData.disco.discoDetail.bannerDescriptionWeight
            )}
          >
            {discoData?.disco.discoDetail.bannerDescription}
          </p>
          <Link
            style={{
              background: discoData.disco.discoDetail.discoColor.bgNavbarColor,
              color: discoData.disco.discoDetail.discoColor.navbarForeground,
              border: `2px solid ${discoData.disco.discoDetail.discoColor.navbarForeground}`,
            }}
            onClick={(event) => handleClickScroll(event, "#tickets")}
            href={"#tickets"}
            className="px-6 py-2 hover:opacity-95 rounded-lg font-semibold text-lg md:text-xl hover:-translate-y-1 shadow-2xl hover:shadow-white transition-transform"
          >
            RESERVE NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Head;
