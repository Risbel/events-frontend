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
      {userId && !discoData.subscription && <SubscribeNow userId={userId} discoId={discoData.disco.id} />}
      <div className="relative flex items-end z-10 h-screen">
        <div className="mb-4 lg:mb-8 md:pl-12">
          <div className="flex flex-col items-center md:items-baseline w-full">
            <h1
              className="font-bold text-4xl md:text-5xl lg:text-7xl text-center md:text-start"
              style={{ color: `${discoData.disco.discoDetail.discoColor.h1BannerColor}` }}
            >
              {(discoData?.disco.name).toUpperCase()}
            </h1>

            <p
              style={{
                color: discoData.disco.discoDetail.discoColor.h1BannerColor,
                borderTopColor: discoData.disco.discoDetail.discoColor.h1BannerColor,
              }}
            >
              Miercoles 14 - Jueves 22 de febrero.
            </p>
          </div>

          <p
            style={{ color: `${discoData.disco.discoDetail.discoColor.bannerDescriptionColor}` }}
            className="text-xl md:text-3xl text-center md:text-left py-4 md:py-8 md:w-2/3"
          >
            {discoData?.disco.discoDetail.bannerDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Head;
