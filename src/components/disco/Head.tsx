import { DataDisco } from "@/services/getDisco";
import Image from "next/image";
import React from "react";
import BannerImages from "./BannerImages";

const Head = ({ disco }: { disco: DataDisco }) => {
  return (
    <div className="relative">
      <BannerImages discoDetailsId={disco.discoDetail.id} />
      <div className="flex flex-col md:flex-row items-center md:gap-8 p-8">
        {disco && (
          <Image
            className="rounded-full h-25 w-25 md:h-36 md:w-36"
            src={disco?.logo}
            alt={disco?.name}
            height={100}
            width={100}
          />
        )}
        <h1 className="py-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 font-bold text-3xl md:text-7xl">
          {(disco?.name).toUpperCase()}
        </h1>
      </div>

      <p className="text-white text-xl md:text-2xl text-center md:text-left p-8">{disco?.discoDetail.description}</p>
    </div>
  );
};

export default Head;
