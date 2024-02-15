import { DataDisco, Subscription } from "@/services/getDisco";
import Image from "next/image";
import React from "react";
import BannerImages from "./BannerImages";
import SubscribeNow from "./SubscribeNow";
import { useSession } from "next-auth/react";
import { addDays, format } from "date-fns";
import Link from "next/link";
import useHandleScroll from "@/hooks/useHandlerScroll";

const Head = ({ discoData }: { discoData: { disco: DataDisco; subscription: Subscription } }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleClickScroll = useHandleScroll();

  return (
    <div className="relative h-screen">
      <BannerImages discoDetails={discoData.disco.discoDetail} />
      {userId && !discoData.subscription && <SubscribeNow userId={userId} discoId={discoData.disco.id} />}
      <div className="relative flex items-end z-10 h-screen">
        <div className="flex flex-col items-center md:items-start w-full mb-12 md:ml-8">
          <h1
            className="font-bold text-4xl md:text-5xl lg:text-7xl text-center md:text-start"
            style={{ color: `${discoData.disco.discoDetail.discoColor.h1BannerColor}` }}
          >
            {(discoData?.disco.name).toUpperCase()}
          </h1>
          <p
            className="text-center"
            style={{
              color: discoData.disco.discoDetail.discoColor.h1BannerColor,
              borderTopColor: discoData.disco.discoDetail.discoColor.h1BannerColor,
            }}
          >
            {discoData.disco.startDate && discoData.disco.endDate && (
              <span className="font-thin">
                From {format(addDays(new Date(discoData.disco.startDate), 1), "MMMM-d/yy")}
                {" to "}
                {format(addDays(new Date(discoData.disco.endDate), 1), "MMMM-d/yy")}
              </span>
            )}
          </p>
          <p
            style={{ color: `${discoData.disco.discoDetail.discoColor.bannerDescriptionColor}` }}
            className="text-xl md:text-3xl text-center md:text-left py-4 md:pb-8"
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
