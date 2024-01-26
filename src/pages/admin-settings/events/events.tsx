import TargetDisco from "@/components/home/TargetDisco";
import EventLayout from "@/components/layouts/EventLayout";
import Spinner from "@/components/loaders/Spinner";
import { useGetDiscos } from "@/hooks/useGetDiscos";
import React from "react";

const Events = () => {
  const { data, isLoading, isFetched, isError } = useGetDiscos();

  if (isLoading) {
    return (
      <EventLayout>
        <div className="flex justify-center pt-20">
          <Spinner diameter={8} />
        </div>
      </EventLayout>
    );
  }

  return (
    <EventLayout>
      <main className="flex flex-col items-center py-20 ">
        <div className="flex flex-col gap-4 px-2 md:w-2/3">
          {!isError && isFetched && data && data?.map((disco) => <TargetDisco key={disco.id} disco={disco} />)}
        </div>

        {isError && <span className="text-white px-2">Error conection o: please try later \: </span>}
      </main>
    </EventLayout>
  );
};

export default Events;
