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
    <div className="relative overflow-hidden">
      <BannerImages discoDetails={discoData.disco.discoDetail} />

      <div className="absolute z-10 h-screen w-screen top-[60%]">
        <h1
          className="relative px-8 font-bold text-4xl md:text-5xl lg:text-7xl text-center md:text-start"
          style={{ color: `${discoData.disco.discoDetail.discoColor.h1Color}` }}
        >
          {(discoData?.disco.name).toUpperCase()}
        </h1>

        <p
          style={{ color: `${discoData.disco.discoDetail.discoColor.h1Color}` }}
          className="text-xl md:text-3xl text-center md:text-left px-8 py-4 md:py-8"
        >
          {discoData?.disco.discoDetail.description}
        </p>
      </div>
      {userId && !discoData.subscription && <SubscribeNow userId={userId} discoId={discoData.disco.id} />}
    </div>
  );
};

export default Head;
