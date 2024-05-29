import DashboardLayout from "@/components/layouts/DashboardLayout";
import Spinner from "@/components/loaders/Spinner";
import { useGetMyEvents } from "@/hooks/useGetMyEvents";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Permissions = () => {
  const { data } = useSession();
  const { data: dataEvents, isFetched, isLoading } = useGetMyEvents(data?.user?.id);

  return (
    <DashboardLayout>
      <div className="pt-24 px-4 md:px-8 h-full">
        {isLoading && (
          <div className="w-full flex justify-center">
            <Spinner diameter={10} stroke="black" />
          </div>
        )}

        {dataEvents && isFetched && (
          <>
            <h1 className="text-2xl text-primary font-semibold pb-4">Permissions:</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {dataEvents?.map((disco) => (
                <Link
                  href={`/dashboard/permissions/${disco.slug}`}
                  className="flex gap-2 items-center hover:bg-secondary group p-2 rounded-md"
                  key={disco.id}
                >
                  <p className="text-primary text-xl group-hover:translate-x-3 transition-transform duration-300">
                    ▪️ {disco.name}
                  </p>
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
