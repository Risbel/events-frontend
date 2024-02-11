import useGetDisco from "@/hooks/useGetDisco";
import Image from "next/image";
import { useSession } from "next-auth/react";

import FooterDisco from "./FooterDisco";
import Head from "./Head";
import AboutUs from "./AboutUs";
import Experiences from "./Experiences";
import { SkeletonAboutUs, SkeletonExperiences, SkeletonHead } from "./Skeleton";

import useGetMyPermissions from "@/hooks/useGetMyPermissions";
import { useGetDiscoTicketsByIdDisco } from "@/hooks/useGetDiscoTicketsByIdDisco";
import DiscoTickets from "./DiscoTickets";
import Link from "next/link";

import FormContact from "@/pages/components/FormContact";
import { Button } from "@/components/ui/button";
import NavbarEvent from "@/components/navigation/NavbarEvent";
import NavSidebarEventMobile from "../navigation/NavSidebarMobile";
import useHandleScroll from "@/hooks/useHandlerScroll";

const DiscoEnviroment = ({ slug }: { slug: any }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });
  const discoId = discoData?.disco?.id;

  const { data: myPermissions } = useGetMyPermissions(userId, discoId);

  const { data: discotickets } = useGetDiscoTicketsByIdDisco(discoId);

  const handleClickScroll = useHandleScroll();

  if (isErrordisco) {
    return (
      <div className="flex gap-4 w-full h-screen justify-center items-center bg-black">
        <span className="text-white text-5xl md:text-8xl font-semibold">{error?.response?.status}</span>
        <div className="flex flex-col gap-2">
          <span className="text-white text-md md:text-xl">{error?.response?.data?.message}</span>

          <Link href={"/"}>
            <Button>Back to home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!discoData) {
    return (
      <div className="flex flex-col gap-4 md:gap-8 h-full w-screen bg-black overscroll-none pt-20 px-4">
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

      <div className="absolute flex justify-center items-start translate-y-32 z-40 w-full bg-transparent">
        <Link
          style={{
            background: discoData.disco.discoDetail.discoColor.bgNavbarColor,
            color: discoData.disco.discoDetail.discoColor.navbarForeground,
            border: `2px solid ${discoData.disco.discoDetail.discoColor.navbarForeground}`,
          }}
          onClick={(event) => handleClickScroll(event, "#tickets")}
          href={"#tickets"}
          className="px-6 py-2 hover:opacity-95 rounded-lg font-semibold text-lg md:text-xl hover:-translate-y-1 shadow-2xl hover:shadow-white transition-transform"
        >
          RESERVE NOW
        </Link>
      </div>
      {loadingDisco ||
        (!discoData && (
          <div className="flex flex-col gap-4 md:gap-8 h-full w-screen bg-black overscroll-none pt-20 px-4">
            <SkeletonHead />
            <SkeletonAboutUs />
            <SkeletonExperiences />
          </div>
        ))}
      <section id="hero">{loadingDisco ? null : <Head discoData={discoData} />}</section>
      <section id="about">
        {loadingDisco ? null : discoData && <AboutUs discoDetails={discoData?.disco?.discoDetail} />}
      </section>
      <section id="experiences">
        {loadingDisco
          ? null
          : discoData && <Experiences myPermissions={myPermissions} discoDetail={discoData?.disco.discoDetail} />}
      </section>
      <section id="tickets">
        <div style={{ background: `${discoData.disco.discoDetail.discoColor.bgTicketsSection}` }} className="pb-12">
          {loadingDisco
            ? null
            : discoId &&
              discotickets && (
                <DiscoTickets
                  name={slug}
                  myPermissions={myPermissions}
                  discoDetail={discoData?.disco.discoDetail}
                  discoId={discoId}
                  discoTickets={discotickets}
                />
              )}
        </div>
      </section>
      <section id="contact">
        <div className="relative bg-foreground pb-16">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="flex flex-wrap px-6 md:p-12 gap-8 md:w-1/2 lg:w-3/4">
              <div>
                <h3 className="text-white text-2xl font-semibold">Company Info:</h3>
                <ol>
                  <li className="text-primary-foreground/60">MyAiPeople</li>
                  <li className="text-primary-foreground/60">123 Street, Cityville, State, ZIP</li>
                  <li className="text-primary-foreground/60">© 2024 Your Company.</li>
                </ol>
                <div>
                  <h3 className="text-white text-2xl font-semibold mt-6">Social:</h3>
                  <div className="flex gap-4 items-center py-2">
                    <Link href={"/#"} className="hover:scale-105">
                      <Image src={"/facebook-icon.svg"} height={30} width={30} alt="facebook icon" />
                    </Link>

                    <Link href={"/#"} className="hover:scale-105">
                      <Image src={"/instagram-icon.svg"} height={30} width={30} alt="instagram icon" />
                    </Link>

                    <Link href={"/#"} className="hover:scale-105">
                      <Image src={"/twitter-icon.svg"} height={30} width={30} alt="twitter icon" />
                    </Link>

                    <Link href={"/#"} className="hover:scale-105">
                      <Image src={"/youtube-icon.svg"} height={30} width={30} alt="youtube icon" />
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white text-2xl font-semibold">Quick Links:</h3>
                <ul>
                  <li className="text-primary-foreground/60">Terms of Service</li>
                  <li className="text-primary-foreground/60">Privacy Policy</li>
                  <li className="text-primary-foreground/60">FAQ</li>
                  <li className="text-primary-foreground/60">Careers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white text-2xl font-semibold">Contacts:</h3>
                <ol>
                  <li className="text-primary-foreground/60">Email: info@example.com</li>
                  <li className="text-primary-foreground/60">Phone: +1 (555) 123-4567</li>
                </ol>
              </div>
            </div>

            <div className="relative p-8 bg-foreground w-full md:w-1/2">
              <FormContact />
            </div>
          </div>
        </div>
      </section>

      {/* {loadingDisco ? null : discoData && <FooterDisco phone={discoData?.disco?.discoDetail?.phone} />} */}
    </div>
  );
};

export default DiscoEnviroment;
