import Spinner from "@/components/loaders/Spinner";
import { useGetMyEvents } from "@/hooks/useGetMyEvents";
import { useSession } from "next-auth/react";
import TargetEvent from "./TargetEvent";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

const MyEventsList = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data, isLoading } = useGetMyEvents(userId);

  if (isLoading) {
    return (
      <div className="flex pt-24 justify-center">
        <Spinner diameter={8} stroke={"black"} />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4 items-center relative">
      {data?.length ? (
        data?.map((event) => {
          return (
            <div key={event.id}>
              <TargetEvent event={event} />
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center gap-4 justify-center bg-secondary text-xl col-span-2 py-6 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center">
            <p className="text-sm">Do you have a few free minutes?</p>
            <p>Let&apos;s create a new event now!</p>
          </div>
          <Link
            href="/dashboard/workspace"
            className="flex gap-4 hover:bg-muted rounded-xl p-2 justify-center items-center bg-primary group transition-colors duration-300"
          >
            <span className="group-hover:text-primary pl-2 text-primary-foreground">New event</span>
            <PlusCircleIcon className="stroke-primary-foreground group-hover:stroke-primary" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyEventsList;
