import { DataDisco } from "@/services/getDisco";
import Image from "next/image";
import React from "react";
import BannerImages from "./BannerImages";

const Head = ({ disco }: { disco: DataDisco }) => {
  return (
    <div className="relative h-screen">
      <BannerImages discoDetailsId={disco.discoDetail.id} />
      <div className="grid grid-rows-4 h-full">
        <div className="row-start-3">
          <h1
            className="px-8 font-bold text-3xl md:text-7xl text-center md:text-start"
            style={{ color: `#${disco.discoDetail.discoColor.textColor}` }}
          >
            {(disco?.name).toUpperCase()}
          </h1>

          <p className="text-white text-sm md:text-2xl text-center md:text-left p-8">
            {disco?.discoDetail.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Head;
