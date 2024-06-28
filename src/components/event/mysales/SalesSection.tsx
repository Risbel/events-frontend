import { useGetReservationsByDiscoSlug } from "@/hooks/useGetReservationsByDiscoSlug";
import { useParams } from "next/navigation";
import ReservationCard from "./ReservationCard";
import Skeleton from "./Skeleton";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const SalesSection = ({
  selector,
  color,
}: {
  selector: "yesterday" | "today" | "pending" | "expired";
  color: "red" | "blue" | "slate" | "green";
}) => {
  const param = useParams();
  const [filter, setFilter] = useState<string>("");

  const { data, isLoading, isFetching } = useGetReservationsByDiscoSlug(param?.slug, 20, selector);

  if (isLoading || isFetching) {
    return <Skeleton />;
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const filteredData = data?.filter((reservation) =>
    reservation.User.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center mb-4">
        <Input
          className="w-1/4"
          type="text"
          placeholder="Filter by User Name"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <div className="flex justify-center flex-wrap gap-6">
        {filteredData?.length ? (
          filteredData?.map((reservation) => {
            return <ReservationCard color={color} reservation={reservation} key={reservation.id} />;
          })
        ) : (
          <div className="text-xl">No reservations found.</div>
        )}
      </div>
    </>
  );
};

export default SalesSection;
