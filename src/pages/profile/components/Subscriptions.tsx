import { useGetSubscriptionsByUserId } from "@/hooks/useGetSubscriptionsByUserId";
import Unsubscribe from "./Unsubscribe";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

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

const Subscriptions = ({ userId }: { userId: string }) => {
  const { data } = useGetSubscriptionsByUserId(userId);

  return (
    <>
      {data ? (
        <div className="py-4 md:py-10 px-4 md:px-12 text-white">
          <h1 className="text-xl font-semibold my-4">My Subscriptions:</h1>
          <div className="grid md:grid-cols-3 gap-2 md:gap-4">
            {data.map((sub) => (
              <div
                className="flex items-center justify-between border rounded-md overflow-hidden pr-2 bg-gray-800/30"
                key={sub.id}
              >
                <div className="flex items-center gap-2">
                  <Image src={sub.Disco.logo} alt="logo sub" height={50} width={50} />
                  <p>{sub.Disco.name}</p>
                </div>
                {sub.DiscoRole.name !== "admin" ? (
                  <Unsubscribe id={sub.id} />
                ) : (
                  <div className="bg-white/10 p-1 px-2 rounded-md">
                    <p className="text-white font-light">You are admin</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SkeletonSubs />
      )}
    </>
  );
};

export default Subscriptions;
