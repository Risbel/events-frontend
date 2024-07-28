import DashboardLayout from "@/components/layouts/DashboardLayout";
import MyEventsList from "../../../components/dashboard/allevents/MyEventsList";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

const AllEvents = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center col-span-2 mt-16 mx-8 mb-4">
        <h1 className="text-xl md:text-2xl text-primary font-bold pb-4">My Events:</h1>
        <Link
          href="/dashboard/workspace"
          className="flex gap-4 bg-muted rounded-xl p-2 transition-all justify-center items-center hover:bg-secondary/90 hover:border border-primary group"
        >
          <span className="text-primary font-semibold pl-2">Add new event</span>
          <PlusCircleIcon className="group-hover:scale-110 stroke-primary" />
        </Link>
      </div>
      <div className="px-4 md:px-8 pb-10">
        <MyEventsList />
      </div>
    </DashboardLayout>
  );
};

export default AllEvents;
