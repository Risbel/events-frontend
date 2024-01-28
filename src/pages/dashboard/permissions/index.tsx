import DashboardLayout from "@/components/layouts/DashboardLayout";
import EventLayout from "@/components/layouts/EventLayout";
import Spinner from "@/components/loaders/Spinner";
import { useGetDiscos } from "@/hooks/useGetDiscos";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

const Permissions = () => {
  const { data: discos, isLoading, isFetched } = useGetDiscos();

  return (
    <DashboardLayout>
      <div className="pt-24 px-4 md:px-8 h-full">
        {isLoading && (
          <div className="w-full flex justify-center">
            <Spinner diameter={10} stroke="black" />
          </div>
        )}

        {discos && isFetched && (
          <>
            <h1 className="text-2xl text-primary font-semibold pb-4">Permissions:</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {discos?.map((disco) => (
                <Link
                  href={`/dashboard/permissions/${disco.slug}`}
                  className="flex gap-2 items-center hover:bg  hover:bg-secondary rounded-l-full"
                  key={disco.id}
                >
                  <Avatar className="rounded-full overflow-hidden">
                    <AvatarImage height={50} width={50} src={disco.logo} />
                  </Avatar>
                  <div>
                    <h1 className="text-primary text-xl">{disco.name}</h1>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Permissions;
