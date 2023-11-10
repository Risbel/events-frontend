import { useGetSubscriptionsByUserId } from "@/hooks/useGetSubscriptionsByUserId";
import Unsubscribe from "./Unsubscribe";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonSubs = () => {
  return (
    <div className="px-4 pt-20">
      <Skeleton className="h-8 w-36 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  );
};

const Subscriptions = ({ userId }: { userId: string }) => {
  const { data } = useGetSubscriptionsByUserId(userId);

  return (
    <div>
      {" "}
      {data ? (
        <div className="py-10 px-4 md:px-12 text-white">
          <h1 className="text-xl font-semibold my-4">My Subscriptions:</h1>
          <div className="grid md:grid-cols-3 gap-2 md:gap-4">
            {data.map((sub) => (
              <div className="flex items-center justify-between border rounded-md overflow-hidden pr-2" key={sub.id}>
                <div className="flex items-center gap-2">
                  <Image src={sub.Disco.logo} alt="logo sub" height={50} width={50} />
                  <p>{sub.Disco.name}</p>
                </div>

                <Unsubscribe id={sub.id} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SkeletonSubs />
      )}
    </div>
  );
};

export default Subscriptions;
