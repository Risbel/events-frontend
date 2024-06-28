import { useListDays } from "@/hooks/useListDays";
import { useListMonths } from "@/hooks/useListMonths";
import { cn } from "@/lib/shadcnUtils";

import ComboInReservation from "./ComboInReservationCard";
import { Reservation } from "@/services/getReservationsByDiscoSlug";

const ReservationCard = ({
  reservation,
  label,
  color,
}: {
  reservation: Reservation;
  label?: string;
  color: "green" | "red" | "blue" | "slate";
}) => {
  const days = useListDays();
  const months = useListMonths();

  return (
    <div
      key={reservation.id}
      className={cn(
        "flex flex-col gap-2 p-2 border shadow-md rounded-md justify-between min-w-80",
        color === "red" && "shadow-red-600",
        color === "blue" && "shadow-blue-500",
        color === "green" && "shadow-green-600",
        color === "slate" && "shadow-slate-500"
      )}
    >
      <div
        className={cn(
          "flex justify-around py-2 rounded-md",
          color === "red" && "bg-red-400",
          color === "blue" && "bg-blue-400",
          color === "green" && "bg-green-400",
          color === "slate" && "bg-slate-300"
        )}
      >
        {label && <p className="text-xs font-bold">{label}</p>}
        <p className="text-xs font-bold">
          {days[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDay()]}-
          {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate()}-
          {months[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getMonth()]}
        </p>
      </div>

      <div className="flex justify-between">
        <p className="font-semibold">
          {reservation.User.name} {reservation.User.lastName}
        </p>
        <p className="font-light">{reservation.User.phone}</p>
      </div>
      <div>
        <p>
          <span className="bg-secondary p-1 rounded-md">Invoice:</span> {reservation.id.slice(0, 13)}
        </p>
      </div>
      <div className="grid flex-col gap-2">
        {reservation.ticketsReservations.map((ticket) => (
          <div className="flex flex-col gap-2 " key={ticket.id}>
            <div className="bg-secondary p-2 rounded-md">
              <div className="flex justify-between items-center">
                <p className=" text-sm">
                  {ticket.quantity} {ticket.DiscoTicket.category} {Number(ticket.quantity) > 1 ? "tickets" : "ticket"}
                </p>
                <p className=" text-sm">{ticket.DiscoTicket.price} Each</p>
              </div>
              <p className=" text-xs font-light">{ticket.DiscoTicket.shortDescription}</p>
            </div>
            <ComboInReservation ticket={ticket} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationCard;
