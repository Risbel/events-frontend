import { DataDisco, Subscription } from "@/services/getDisco";
import Image from "next/image";
import React from "react";
import BannerImages from "./BannerImages";
import SubscribeNow from "./SubscribeNow";
import { useSession } from "next-auth/react";

const Head = ({ discoData }: { discoData: { disco: DataDisco; subscription: Subscription } }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <div className="relative h-screen">
      <BannerImages discoDetails={discoData.disco.discoDetail} />

      <div className="relative flex items-end z-10 h-screen">
        <div className="lg:mb-8">
          <h1
            className="px-8 font-bold text-4xl md:text-5xl lg:text-7xl text-center md:text-start"
            style={{ color: `${discoData.disco.discoDetail.discoColor.h1BannerColor}` }}
          >
            {(discoData?.disco.name).toUpperCase()}
          </h1>

          <p
            style={{ color: `${discoData.disco.discoDetail.discoColor.bannerDescriptionColor}` }}
            className="text-xl md:text-3xl text-center md:text-left px-8 py-4 md:py-8 md:w-2/3"
          >
            {discoData?.disco.discoDetail.bannerDescription}
          </p>
        </div>
      </div>
      {userId && !discoData.subscription && <SubscribeNow userId={userId} discoId={discoData.disco.id} />}
    </div>
  );
};

export default Head;
