import EventLayout from "@/components/layouts/EventLayout";
import Spinner from "@/components/loaders/Spinner";
import { useGetDiscos } from "@/hooks/useGetDiscos";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

const Permissions = () => {
  const { data: discos, isLoading, isFetched } = useGetDiscos();

  return (
    <EventLayout>
      <div className="pt-24 px-4 md:px-8">
        {isLoading && (
          <div className="w-full flex justify-center">
            <Spinner diameter={10} />
          </div>
        )}

        {discos && isFetched && (
          <>
            <h1 className="text-2xl text-white pb-4">Permissions:</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {discos?.map((disco) => (
                <Link
                  href={`/admin-settings/permissions/${disco.slug}`}
                  className="flex gap-2 items-center hover:bg  hover:bg-white/10 rounded-l-full"
                  key={disco.id}
                >
                  <Avatar className="rounded-full overflow-hidden">
                    <AvatarImage height={50} width={50} src={disco.logo} />
                  </Avatar>
                  <div>
                    <h1 className="text-white text-xl">{disco.name}</h1>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </EventLayout>
  );
};

export default Permissions;
