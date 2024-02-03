import EventLayout from "@/components/layouts/EventLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/router";
import Subscriptions from "@/pages/profile/components/Subscriptions";
import Cards from "@/pages/profile/components/Cards";

import NavbarEvent from "@/components/navigation/NavbarEvent";

const SkeletonAvatar = () => {
  return (
    <div className="flex items-center gap-2 md:gap-4 px-14 ">
      <div>
        <Skeleton className="h-16 w-16 md:h-24 md:w-24 rounded-full" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24 md:h-6 md:w-32" />
        <Skeleton className=" h-3 w-32 md:h-4 md:w-44" />
      </div>
    </div>
  );
};

const Profile = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session } = useSession();

  return (
    <EventLayout>
      <NavbarEvent />
      <Link
        href={`/event/${slug}`}
        className="absolute flex items-center left-0 top-8 bg-secondary rounded-r-3xl pr-4 py-2 mt-10"
      >
        <ChevronLeftIcon /> Go back
      </Link>
      <div className="pt-20 bg-primary">
        {session ? (
          <div className="flex md:px-12 lg:px-16 gap-2 md:gap-4 justify-center items-center text-white">
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
                <div className="flex items-center justify-center bg-violet-800 h-16 w-16 md:w-24 md:h-24 text-2xl md:text-5xl text-white font-semibold">
                  {session?.user?.name[0]}
                </div>
              )}
            </div>
            <div className="md:txt-md text-sm">
              <p className="text-xl font-semibold">{session.user.name}</p>
              <p>{session.user.email}</p>
            </div>
          </div>
        ) : (
          <SkeletonAvatar />
        )}

        {session?.user.id && <Subscriptions userId={session?.user.id} />}

        {session?.user.id && <Cards userId={session.user.id} />}
      </div>
    </EventLayout>
  );
};

export default Profile;
