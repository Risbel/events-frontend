import useGetDisco from "@/hooks/useGetDisco";
import { useSession } from "next-auth/react";

import Head from "./Head";
import AboutUs from "./AboutUs";
import Experiences from "./Experiences";
import { SkeletonAboutUs, SkeletonExperiences, SkeletonHead } from "./Skeleton";

import useGetMyPermissions from "@/hooks/useGetMyPermissions";
import { useGetDiscoTicketsByIdDisco } from "@/hooks/useGetDiscoTicketsByIdDisco";
import DiscoTickets from "./disco-tickets/DiscoTickets";

import NavSidebarEventMobile from "../navbar/NavSidebarMobile";
import NavbarEvent from "../navbar/NavbarEvent";
import FooterDisco from "./FooterDisco";

const DiscoEnviroment = ({ slug }: { slug: any }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });
  const discoId = discoData?.disco?.id;

  const { data: myPermissions } = useGetMyPermissions(userId, discoId);

  const { data: discotickets } = useGetDiscoTicketsByIdDisco(discoId);

  if (isErrordisco) {
    return (
      <div className="flex gap-4 w-full h-screen justify-center items-center bg-black">
        <span className="text-white text-5xl md:text-8xl font-semibold">{error?.response?.status}</span>
        <div className="flex flex-col gap-2">
          <span className="text-white text-md md:text-xl">{error?.response?.data?.message}</span>
        </div>
      </div>
    );
  }

  if (!discoData || !discoId || !discotickets) {
    return (
      <div className="flex flex-col gap-4 md:gap-8 h-full w-full bg-black overscroll-none pt-20 px-4">
        <SkeletonHead />
        <SkeletonAboutUs />
        <SkeletonExperiences />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <NavbarEvent />
      <div className="fixed z-50 top-[60px] left-1 md:hidden">
        <NavSidebarEventMobile disco={discoData.disco} />
      </div>
      <section id="hero">{loadingDisco ? null : <Head discoData={discoData} />}</section>
      <section id="about">
        {loadingDisco ? null : discoData && <AboutUs discoDetails={discoData?.disco?.discoDetail} />}
      </section>
      <section id="experiences">
        {loadingDisco ? null : discoData && <Experiences discoDetail={discoData?.disco.discoDetail} />}
      </section>
      <section id="tickets">
        <div style={{ background: `${discoData.disco.discoDetail.discoColor.bgTicketsSection}` }} className="pb-12">
          <DiscoTickets
            name={slug}
            myPermissions={myPermissions}
            discoDetail={discoData?.disco.discoDetail}
            discoId={discoId}
            discoTickets={discotickets}
          />
        </div>
      </section>
      <FooterDisco discoData={discoData.disco} />
    </div>
  );
};

export default DiscoEnviroment;
