import { DataDisco } from "@/services/getDisco";
import Image from "next/image";
import React from "react";
import BannerImages from "./BannerImages";

const Head = ({ disco }: { disco: DataDisco }) => {
  return (
    <div className="relative h-screen">
      <BannerImages discoDetails={disco.discoDetail} />
      <div
        style={{
          background: `linear-gradient(to top, #${disco.discoDetail.discoColor.bgColor}, #${disco.discoDetail.discoColor.bgColor}80 , transparent)`,
        }}
        className="grid grid-rows-4 h-full"
      >
        <div className="row-start-3 ">
          <h1
            className="px-8 font-bold text-3xl md:text-7xl text-center md:text-start"
            style={{ color: `#${disco.discoDetail.discoColor.textColor}` }}
          >
            {(disco?.name).toUpperCase()}
          </h1>

          <p className="text-white text-xl md:text-3xl font-thin text-center md:text-left px-8 py-4 md:py-8">
            {disco?.discoDetail.description}
          </p>
        </div>
      </div>
      <div
        style={{ borderColor: `#${disco.discoDetail.discoColor.brandColor}` }}
        className="border-4 w-3/4 rounded-r-full"
      />
    </div>
  );
};

export default Head;
