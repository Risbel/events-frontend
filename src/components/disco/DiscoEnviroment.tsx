import useGetDisco from "@/hooks/useGetDisco";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useGetAdmisionsByIdDisco } from "@/hooks/useGetAdmisionsByIdDisco";
import FooterDisco from "./FooterDisco";
import Head from "./Head";
import SubscribeNow from "./SubscribeNow";
import AboutUs from "./AboutUs";
import Experiencies from "./Experiencies";
import { SkeletonAboutUs, SkeletonExperiences, SkeletonHead } from "./Skeleton";
import Navbar from "../navigation/Navbar";
import useGetMyPermissions from "@/hooks/useGetMyPermissions";

const DiscoEnviroment = ({ name }: { name: string }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco } = useGetDisco({ name, userId });
  const discoId = discoData?.disco?.id;

  const { data: myPermissions } = useGetMyPermissions(userId, discoId);

  const { data: admisions } = useGetAdmisionsByIdDisco(discoId);

  if (isErrordisco) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-black">
        <span className="text-white">Bad conection, please try later...</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-black">
      <style>
        {`
          ::-webkit-scrollbar {
            width: 0.1rem;
          }
          ::-webkit-scrollbar-button {
            display: none;
          }
        `}
      </style>
      <Navbar />
      {loadingDisco || !discoData ? (
        <div className="flex flex-col gap-4 md:gap-8 h-full w-screen bg-black overscroll-none pt-20 px-8">
          <SkeletonHead />
          <SkeletonAboutUs />
          <SkeletonExperiences />
        </div>
      ) : (
        <Image
          className="absolute h-full object-cover"
          src={discoData?.disco?.discoDetail?.bgImage}
          width={1800}
          height={800}
          alt="Picture of the author"
          placeholder="blur"
          blurDataURL={discoData?.disco?.discoDetail?.bgImage}
        />
      )}

      <div className="pt-24 px-4 md:px-8">
        <div className="flex -translate-y-4">
          <div className="flex flex-col gap-4 md:gap-8">
            {loadingDisco ? null : <Head disco={discoData?.disco} />}

            {loadingDisco
              ? null
              : discoData &&
                discoId &&
                userId && // just return it if discoData & discoId exist
                !discoData?.subscription && <SubscribeNow userId={userId} discoId={discoId} />}

            <>
              {loadingDisco
                ? null
                : discoData && <AboutUs largeDescription={discoData?.disco.discoDetail.largeDescription} />}
            </>
            {loadingDisco
              ? null
              : discoData && <Experiencies permissions={myPermissions} discoDetail={discoData?.disco.discoDetail} />}
          </div>
        </div>
        <>
          {loadingDisco ? null : (
            <div className="grid grid-flow-row md:grid-flow-col md:grid-cols-3 gap-4 py-9">
              {admisions &&
                admisions?.map((admision) => (
                  <div
                    className="flex justify-between gap-2 border-2 bg-slate-800 rounded-md p-2 relative hover:scale-[102%]"
                    key={admision.id}
                  >
                    <div className="text-white">
                      <p>Entrada {admision.category}</p>
                      <p>Price: {admision.price}</p>
                      <p>{admision.description}</p>
                    </div>
                    <div className="flex items-start absolute right-2">
                      {admision.category === "vip" ? (
                        <Image
                          className="object-cover"
                          src="/icons8-vip-94.png"
                          height={50}
                          width={50}
                          alt="vip icon"
                          placeholder="blur"
                          blurDataURL={"icons8-vip-94.png"}
                        />
                      ) : (
                        admision.category === "simple" && (
                          <Image
                            className="object-cover"
                            src="/icons8-movie-ticket-96.png"
                            height={50}
                            width={50}
                            alt="simple icon"
                            placeholder="blur"
                            blurDataURL={"icons8-movie-ticket-96.png"}
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      </div>
      {loadingDisco ? null : discoData && <FooterDisco phone={discoData?.disco.discoDetail.phone} />}
    </div>
  );
};

export default DiscoEnviroment;
