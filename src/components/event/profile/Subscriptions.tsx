import { useGetSubscriptionsByUserId } from "@/hooks/useGetSubscriptionsByUserId";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { IDiscoColors } from "@/services/getDisco";
import Unsubscribe from "./Unsubscribe";

export const SkeletonSubs = () => {
  return (
    <div className="px-4 md:px-12 pt-10 md:pt-20 mb-12">
      <Skeleton className="h-6 w-40 mb-6 md:mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="hidden md:block h-14 w-full" />
        <Skeleton className="hidden md:block h-14 w-full" />
        <Skeleton className="hidden md:block h-14 w-full" />
      </div>
    </div>
  );
};

const Subscriptions = ({ userId, discoColors }: { userId: string; discoColors: IDiscoColors }) => {
  const { data, isLoading } = useGetSubscriptionsByUserId(userId);

  if (isLoading) {
    return <SkeletonSubs />;
  }

  return (
    <div
      style={{ background: `${discoColors.bgNavbarColor}90` }}
      className="py-4 md:py-10 px-4 md:px-12 mx-2 md:mx-8 rounded-3xl shadow-md"
    >
      <h1 style={{ color: `${discoColors.navbarForeground}` }} className="text-xl font-semibold my-4">
        My Subscriptions:
      </h1>
      <div className="grid md:grid-cols-3 gap-2 md:gap-4">
        {data &&
          data.map((sub) => (
            <div
              style={{
                background: "#ffffff",
                border: `solid 2px #000000`,
              }}
              className="flex items-center justify-between rounded-xl overflow-hidden pr-2 shadow-md"
              key={sub.id}
            >
              <div className="flex items-center gap-2">
                <Image src={sub.Disco.logo} alt="logo sub" height={50} width={50} />
                <p className="font-semibold">{sub.Disco.name}</p>
              </div>
              {sub.DiscoRole.name !== "admin" ? (
                <Unsubscribe id={sub.id} />
              ) : (
                <div className="bg-black p-1 px-2 rounded-md cursor-default">
                  <p className="text-white font-light">You are admin</p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Subscriptions;
