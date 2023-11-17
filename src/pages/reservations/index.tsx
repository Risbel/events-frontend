import HomeLayout from "@/components/layouts/HomeLayout";
import Spinner from "@/components/loaders/Spinner";
import { useGetMyReservations } from "@/hooks/useGetMyReservations";
import { useListDays } from "@/hooks/useListDays";
import { useListMonths } from "@/hooks/useListMonths";
import { useSession } from "next-auth/react";

const Reservations = () => {
  const weekdays = useListDays();
  const months = useListMonths();
  const { data } = useSession();

  const { data: myReservationsData, isLoading } = useGetMyReservations(data?.user.id);

  if (isLoading || !myReservationsData) {
    return (
      <HomeLayout>
        <div className="flex justify-center pt-20">
          <Spinner diameter={8} />
        </div>
      </HomeLayout>
    );
  }

  const sortedReservations = [...myReservationsData].sort((a: any, b: any) => {
    return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
  });

  return (
    <HomeLayout>
      <div className="pt-20 px-4">
        <h1 className="text-white text-xl mb-2">My Reservations:</h1>

        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {sortedReservations &&
            sortedReservations.map((reservation) => (
              <div className="border rounded-md p-2 bg-gradient-to-l from-white/10 to-black/40" key={reservation.id}>
                <div>
                  <div className="flex justify-between">
                    <p className="text-white font-semibold">
                      {reservation.ticketsReservations[0].DiscoTicket.Disco.name}
                    </p>

                    <p>
                      {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate() ==
                      new Date().getDate() ? (
                        <p className="text-green-500 text-xs flex items-center gap-2">
                          Active{" "}
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                        </p>
                      ) : (
                        <p className="text-gray-400 text-xs">Desabled</p>
                      )}
                    </p>
                  </div>
                  <p className="text-white">
                    <span className="bg-black/20">Invoice:</span>
                    <span className="font-light"> {reservation.id.slice(0, 13)}</span>
                  </p>
                  <p className="text-white">
                    To use:{" "}
                    <span className="font-light">
                      {weekdays[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDay()]}-
                      {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate()}-
                      {months[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getMonth()]}
                    </span>
                  </p>

                  <p className="text-white">
                    <span className="bg-black/20">Reserved:</span>{" "}
                    <span className="font-light">
                      {weekdays[new Date(reservation.createdAt).getDay()]}-{new Date(reservation.createdAt).getDate()}-
                      {months[new Date(reservation.createdAt).getMonth()]}-{reservation.createdAt.slice(0, 4)}
                    </span>
                  </p>
                  <p className="text-white bg-black/20 mb-1">Purchases: </p>
                  <div className="flex gap-2 flex-wrap">
                    {reservation.ticketsReservations.map((ticket) => (
                      <div className="border rounded-md px-2 py1 bg-black/40" key={ticket.id}>
                        <p className="text-white text-sm">
                          {ticket.quantity} {ticket.DiscoTicket.category}{" "}
                          {Number(ticket.quantity) > 1 ? "tickets" : "ticket"}
                        </p>

                        <p className="text-white text-sm">Price: ${ticket.DiscoTicket.price} c/u</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center text-white font-light">
                    Total: $
                    <p className="font-semibold">
                      {reservation.ticketsReservations
                        .map((tiket) => {
                          return Number(tiket.quantity) * Number(tiket.DiscoTicket.price);
                        })
                        .reduce((acc, curr) => acc + Number(curr), 0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Reservations;
