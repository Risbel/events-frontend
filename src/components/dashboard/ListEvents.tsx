import { useGetMyEvents } from "@/hooks/useGetMyEvents";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ListEvents = () => {
  const { data } = useSession();
  const { data: dataMyEvents } = useGetMyEvents(data?.user.id);

  return (
    <>
      {dataMyEvents?.map((event) => {
        return (
          <li className="cursor-pointer hover:translate-x-2 hover:transition-transform duration-300" key={event.id}>
            <Link href={`/event/${event.slug}`}>{event.name}</Link>
          </li>
        );
      })}
    </>
  );
};

export default ListEvents;
