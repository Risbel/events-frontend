import { DataDisco } from "@/services/getDisco";
import { IMyEvents } from "@/services/getMyEvents";
import { Divide } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TargetEvent = ({ event }: { event: IMyEvents }) => {
  return (
    <div className="flex items-center rounded-2xl bg-primary/95 p-2 md:p-3">
      <Image
        className="rounded-full h-25 w-25 md:h-24 md:w-24"
        placeholder="blur"
        blurDataURL={event.logo}
        src={event.logo}
        alt="image-next-auth"
        width={80}
        height={80}
      />

      <div className="flex flex-col relative z-20 w-full">
        <div className="px-2 md:px-4">
          <h1 className="font-bold text-base md:text-2xl text-white">{event.name.toUpperCase()}</h1>
          <p className="text-gray-100 font-extralight text-xs md:text-sm -translate-y-2 line-clamp-1">
            {(event?.discoDetail?.description).toUpperCase()}
          </p>
        </div>
        <div className="border border-white w-2/3 md:w-1/2" />

        <div className="flex gap-1 md:gap-2 px-2 md:px-4 py-2">
          <Image width={15} height={15} alt="position location icon" src={"/position-location.svg"} />
          <p className="text-xs font-light text-gray-100 md:text-md line-clamp-1">{event.discoDetail?.address}</p>
        </div>

        <div className="flex px-2 md:px-4 justify-end">
          <Link
            href={`/disco/${event.slug}`}
            className="flex items-center bg-gray-200 hover:bg-gray-200/90 px-4 py-0.5 md:py-1 rounded-xl"
          >
            <span className="text-xs md:text-sm">access</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TargetEvent;
