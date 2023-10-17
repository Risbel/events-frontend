import { DataDisco } from "@/services/getDisco";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TargetDisco = ({ disco }: { disco: DataDisco }) => {
  return (
    <div className="flex items-center h-full backdrop-blur-2xl bg-white/30 shadow-lg hover:shadow-purple-800/50 rounded-xl mx-2 overflow-hidden">
      <Link className="md:flex" href={`disco/${disco.slug}`}>
        <div className="flex items-center pr-2">
          <Image
            className="float-left rounded-r-full md:rounded-none"
            placeholder="blur"
            blurDataURL={disco.logo}
            src={disco.logo}
            alt="image-next-auth"
            width={80}
            height={80}
          />
          <div className="pl-4 md:hidden">
            <h1 className="w-full justify-center font-semibold text-2xl text-gray-100">{disco.name}</h1>
            <p className="text-sm text-gray-100 md:text-md">{disco.discoDetail.address}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-2">
          <h1 className="font-semibold text-xl text-gray-100 hidden md:block">{disco.name}</h1>
          <p className="text-sm text-gray-100 md:text-md">{disco?.discoDetail?.description}</p>
          <p className="text-sm text-gray-100 md:text-md hidden md:block">{disco.discoDetail.address}</p>
        </div>
      </Link>
    </div>
  );
};

export default TargetDisco;
