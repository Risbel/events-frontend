import { useGetReservationCombosById } from "@/hooks/useGetReservationCombosById";
import { TicketReservation } from "@/services/getReservationsByDiscoSlug";

const ComboInReservationCard = ({ ticket }: { ticket: TicketReservation }) => {
  const { data, isLoading } = useGetReservationCombosById(ticket.id);

  if (isLoading || !data) {
    return <div className="w-full h-8 rounded-md bg-secondary animate-pulse"></div>;
  }

  return (
    <>
      {data?.length > 0 ? (
        <div>
          {data?.map((reservation) => {
            return (
              <div key={reservation.id}>
                <div className="flex justify-between bg-secondary p-2 rounded-md">
                  <p className="text-sm">
                    {reservation.quantity} {reservation.Combo.category} combo
                  </p>
                  <p className="text-sm">{reservation.Combo.price} Each</p>
                </div>
                <div>
                  <p className="text-center">
                    amount:{" "}
                    {Number(ticket.quantity) * Number(ticket.DiscoTicket.price) +
                      reservation.quantity * reservation.Combo.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">amount: {Number(ticket.quantity) * Number(ticket.DiscoTicket.price)}</p>
      )}
    </>
  );
};

export default ComboInReservationCard;
