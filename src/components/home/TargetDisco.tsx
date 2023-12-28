import { DataDisco } from "@/services/getDisco";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TargetDisco = ({ disco }: { disco: DataDisco }) => {
  return (
    <div className="flex items-center h-full backdrop-blur-2xl bg-black/30 shadow-lg hover:shadow-purple-800/50 transition-shadow duration-300 rounded-xl overflow-hidden border-l-2 border-b-2">
      <Link className="flex w-full" href={`disco/${disco.slug}`}>
        <div className="flex items-center">
          <Image
            className="float-left rounded-full absolute z-20 -translate-x-8 opacity-70"
            placeholder="blur"
            blurDataURL={disco.logo}
            src={disco.logo}
            alt="image-next-auth"
            width={150}
            height={150}
          />
        </div>

        <div className="flex flex-col p-2 relative z-20 w-full">
          <div className="grid grid-cols-2">
            <h1 className="col-start-2 text-center font-bold text-xl text-black bg-gradient-to-r from-transparent via-white/90 to-transparent rounded-md leading-none py-1">
              {disco.name}
            </h1>
          </div>
          <div className="bg-gradient-to-r from-black/60 to-transparent p-2 rounded-xl">
            <p className="text-sm text-gray-100 md:text-md hidden md:block">{disco?.discoDetail?.description}</p>
            <p className="flex items-center gap-2 text-xs font-light text-gray-100 md:text-md">
              <Image width={20} height={20} alt="gps icon" src={"/pin.png"} /> {disco.discoDetail?.address}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TargetDisco;
