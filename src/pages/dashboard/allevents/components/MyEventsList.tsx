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
    <div className="grid lg:grid-cols-2 gap-4 items-center">
      {data?.length &&
        data?.map((event) => {
          return (
            <div key={event.id}>
              <TargetEvent event={event} />
            </div>
          );
        })}

      <div className="flex justify-center items-center">
        <Link
          href="/dashboard/workspace"
          className="flex gap-4 bg-muted rounded-xl p-4 justify-center items-center hover:bg-secondary/90 hover:border border-primary group"
        >
          <span className="text-xl text-primary font-semibold">Add new event</span>
          <PlusCircleIcon className="group-hover:scale-110 stroke-primary" />
        </Link>
      </div>
    </div>
  );
};

export default MyEventsList;
