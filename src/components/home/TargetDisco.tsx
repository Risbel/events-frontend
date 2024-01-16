import { DataDisco } from "@/services/getDisco";
import { Divide } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TargetDisco = ({ disco }: { disco: DataDisco }) => {
  return (
    <div className="flex items-center rounded-2xl bg-gray-700 p-2 md:p-3">
      <Image
        className="rounded-2xl h-25 w-25 md:h-32 md:w-32"
        placeholder="blur"
        blurDataURL={disco.logo}
        src={disco.logo}
        alt="image-next-auth"
        width={100}
        height={100}
      />

      <div className="flex flex-col relative z-20 w-full">
        <div className="px-2 md:px-4">
          <h1 className="font-bold text-base md:text-2xl text-white">{disco.name.toUpperCase()}</h1>
          <p className="text-gray-100 font-extralight text-xs md:text-sm -translate-y-2 line-clamp-1">
            {(disco?.discoDetail?.description).toUpperCase()}
          </p>
        </div>
        <div className="border border-white w-2/3 md:w-1/2" />

        <div className="flex gap-1 md:gap-2 px-2 md:px-4 py-2">
          <Image width={15} height={15} alt="position location icon" src={"/position-location.svg"} />
          <p className="text-xs font-light text-gray-100 md:text-md line-clamp-1">{disco.discoDetail?.address}</p>
        </div>

        <div className="flex px-2 md:px-4 justify-end">
          <Link
            href={`disco/${disco.slug}`}
            className="flex items-center bg-gray-200 hover:bg-gray-200/90 px-4 py-1 rounded-xl"
          >
            <span className="text-xs md:text-sm"> ACCESS</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TargetDisco;
