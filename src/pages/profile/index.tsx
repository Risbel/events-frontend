import Unsubscribe from "@/pages/profile/components/Unsubscribe";
import HomeLayout from "@/components/layouts/HomeLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSubscriptionsByUserId } from "@/hooks/useGetSubscriptionsByUserId";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Subscriptions from "./components/Subscriptions";
import Cards from "./components/Cards";

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

const Profile = () => {
  const { data: session, status } = useSession();

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

        {session?.user.id && <Subscriptions userId={session?.user.id} />}

        {session?.user.id && <Cards userId={session.user.id} />}
      </div>
    </HomeLayout>
  );
};

export default Profile;
