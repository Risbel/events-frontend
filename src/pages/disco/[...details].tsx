import { LogoCategory } from "@/components/disco/DiscoTickets";
import HomeLayout from "@/components/layouts/HomeLayout";
import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { useGetDiscoTicketById } from "@/hooks/useGetDiscoTicketById";
import Link from "next/link";
import { useRouter } from "next/router";

const DiscoTicketDetails = () => {
  const router = useRouter();
  const { details } = router.query;
  let disco = details && details[0];
  let route = details && details[1];
  let idTicket = details && details[2];

  const { isLoading, data, isError, error } = useGetDiscoTicketById(idTicket);

  if (isLoading) {
    return (
      <HomeLayout>
        <div className="flex gap-4 w-full h-screen justify-center items-center">
          <Spinner diameter={10} />
        </div>
      </HomeLayout>
    );
  }

  if (data && (disco !== data.Disco.slug || route !== "details-ticket" || !idTicket)) {
    return (
      <div className="flex gap-4 w-full h-screen justify-center items-center bg-black">
        <span className="text-white text-5xl font-semibold">404</span>
        <span className="text-white text-xl">Page not found</span>

        <Link href={`/disco/${disco}`}>
          <Button>Go back</Button>
        </Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex gap-4 w-full h-screen justify-center items-center bg-black">
        <span className="text-white text-5xl font-semibold">404</span>
        <span className="text-white text-xl">
          {error?.response?.status === 500 ? <span>This ticket does not exist</span> : error?.response?.data?.message}
        </span>

        <Link href={`/disco/${details[0]}`}>
          <Button>Go back</Button>
        </Link>
      </div>
    );
  }

  if (details) {
    return (
      <HomeLayout>
        <div className="pt-20 px-4 md:px-8">
          <Link href={`/disco/${data.Disco.slug}`}>
            <Button>Go back</Button>
          </Link>

          <div className="grid md:grid-cols-4 mt-4 mb-4">
            <div className="flex items-center justify-between bg-white/20 rounded-md  pl-2 pr-1 py-2 h-12">
              <h1 className="text-xl md:text-2xl text-white">
                Ticket <span className="bg-blue-700/80 rounded-full px-2">{data.category}</span>
              </h1>
              <LogoCategory category={data.category} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-white/10 to-transparent rounded-l-md">
            <h2 className="text-2xl text-white underline-offset-2 underline bg-gradient-to-r from-white/10 via-transparent to-transparent  rounded-l-md py-1 pl-2">
              Details:
            </h2>
            <div className="py-1 pl-2">
              <p className="text-md md:text-xl text-white font-thin">
                <span className="font-normal bg-black/20">Disco:</span> {data.Disco.name}
              </p>
              <p className="text-md md:text-xl text-white font-thin">
                <span className="font-normal bg-black/20">Price:</span> ${data.price}
              </p>
              <p className="text-md md:text-xl text-white font-thin">
                <span className="font-normal bg-black/20">Available ticket quantity:</span> {data.quantity}
              </p>
              {data.description && (
                <p className="md:text-xl text-white font-thin mt-4">
                  <span className="font-normal bg-black/20">More:</span> {data.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </HomeLayout>
    );
  }
};

export default DiscoTicketDetails;
