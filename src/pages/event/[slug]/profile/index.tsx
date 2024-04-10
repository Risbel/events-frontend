import EventLayout from "@/components/layouts/EventLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/router";

import NavbarEvent from "@/components/navigation/NavbarEvent";
import Subscriptions from "./components/Subscriptions";
import useGetDisco from "@/hooks/useGetDisco";
import useGetMe from "@/hooks/useGetMe";
import { useListMonths } from "@/hooks/useListMonths";

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

  const { user, isLoading } = useGetMe();

  const months = useListMonths();

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });
  const discoColors = discoData?.disco.discoDetail.discoColor;

  if (!session || !discoColors || isLoading) {
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
      <div className="flex flex-col gap-8 pt-24">
        <div
          style={{ background: `${discoColors.bgNavbarColor}90` }}
          className="py-4 md:py-10 px-4 md:px-12 mx-2 md:mx-8 rounded-3xl shadow-md flex flex-col md:flex-row gap-4"
        >
          <div className="rounded-full overflow-hidden md:float-left">
            {session?.user.image ? (
              <Image
                className="rounded-full"
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
          <div>
            <p className="text-xl" style={{ color: `${discoColors.navbarForeground}` }}>
              {user.name} {user.lastName}
            </p>
            <p className="text-lg" style={{ color: `${discoColors.navbarForeground}` }}>
              {user.email}
            </p>

            <p style={{ color: `${discoColors.navbarForeground}` }}>{user.phone}</p>
            <p style={{ color: `${discoColors.navbarForeground}` }}>
              Joined on {new Date(user.createdAt).getDate()}-{months[new Date(user.createdAt).getMonth()].slice(0, 3)}-
              {new Date(user.createdAt).getFullYear()}
            </p>
          </div>
        </div>

        {session?.user.id && <Subscriptions discoColors={discoColors} userId={session?.user.id} />}
      </div>
    </EventLayout>
  );
};

export default Profile;
