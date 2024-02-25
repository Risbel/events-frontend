import EventLayout from "@/components/layouts/EventLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/router";

import NavbarEvent from "@/components/navigation/NavbarEvent";
import Subscriptions from "./components/Subscriptions";
import Cards from "./components/Cards";
import useGetDisco from "@/hooks/useGetDisco";

const SkeletonAvatar = () => {
  return (
    <div className="flex items-center gap-2 md:gap-4 px-14 h-screen bg-primary overflow-hidden">
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
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });
  const discoColors = discoData?.disco.discoDetail.discoColor;

  if (!session || !discoColors) {
    return <SkeletonAvatar />;
  }

  return (
    <EventLayout background={`${discoColors.bgNavbarColor}90`}>
      <NavbarEvent />
      <Link
        style={{ background: discoColors.bgNavbarColor }}
        href={`/event/${slug}`}
        className="absolute z-20 flex items-center left-0 top-8 bg-secondary rounded-r-3xl pr-2 md:pr-4 py-1 mt-8"
      >
        <ChevronLeftIcon stroke={discoColors.navbarForeground} />
        <span className="hidden md:block" style={{ color: discoColors.navbarForeground }}>
          Go back
        </span>
      </Link>
      <div className="flex flex-col gap-8 pt-14">
        <div className="flex pt-4 md:px-12 lg:px-16 gap-2 md:gap-4 justify-center items-center text-white">
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
            <p style={{ color: `${discoColors.navbarForeground}` }} className="text-2xl font-bold">
              {session.user.name}
            </p>
            <p className="text-xl" style={{ color: `${discoColors.navbarForeground}` }}>
              {session.user.email}
            </p>
          </div>
        </div>

        {session?.user.id && <Subscriptions discoColors={discoColors} userId={session?.user.id} />}

        {session?.user.id && <Cards discoColors={discoColors} userId={session.user.id} />}
      </div>
    </EventLayout>
  );
};

export default Profile;
