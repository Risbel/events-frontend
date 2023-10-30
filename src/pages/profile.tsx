import Unsubscribe from "@/components/buttons/Unsubscribe";
import HomeLayout from "@/components/layouts/HomeLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSubscriptionsByUserId } from "@/hooks/useGetSubscriptionsByUserId";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SkeletonAvatar = () => {
  return (
    <div className="flex items-center gap-4 px-14 ">
      <div>
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-44" />
      </div>
    </div>
  );
};

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

const Profile = () => {
  const { data: session, status } = useSession();
  const { data } = useGetSubscriptionsByUserId(session?.user.id);

  if (!status) {
    return;
  }

  return (
    <HomeLayout>
      <div className="pt-20">
        {session ? (
          <div className="flex md:px-12 lg:px-16 gap-4 justify-center md:justify-start items-center text-white">
            <div className="rounded-full overflow-hidden float-left">
              {session?.user.image ? (
                <Image
                  src={session?.user.image}
                  alt="image-next-auth"
                  width={100}
                  height={100}
                  placeholder="blur"
                  blurDataURL={session?.user.image}
                />
              ) : (
                <div className="flex items-center justify-center bg-violet-800 h-16 w-16 md:w-24 md:h-24 font-bold text-2xl md:text-5xl text-white">
                  {session?.user?.name[0]}
                </div>
              )}
            </div>
            <div className="md:txt-md text-sm">
              <p className="text-xl">{session.user.name}</p>
              <p>{session.user.email}</p>
            </div>
          </div>
        ) : (
          <SkeletonAvatar />
        )}
        {data ? (
          <div className="py-10 px-4 md:px-12 text-white">
            <h1 className="text-2xl font-semibold my-4">My Subscriptions:</h1>
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
    </HomeLayout>
  );
};

export default Profile;
