import EventLayout from "@/components/layouts/EventLayout";
import Spinner from "@/components/loaders/Spinner";
import NavbarEvent from "@/components/navigation/NavbarEvent";
import useGetDisco from "@/hooks/useGetDisco";
import { useGetMyReservations } from "@/hooks/useGetMyReservations";
import { useListDays } from "@/hooks/useListDays";
import { useListMonths } from "@/hooks/useListMonths";
import { IReservationByUserId } from "@/services/getMyReservations";
import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Reservations = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });

  const weekdays = useListDays();
  const months = useListMonths();
  const { data } = useSession();

  const { data: myReservationsData, isLoading } = useGetMyReservations(data?.user.id);

  const discoColors = discoData?.disco.discoDetail.discoColor;

  if (isLoading || !myReservationsData || !discoColors || !data) {
    return (
      <EventLayout>
        <NavbarEvent />
        <div className="flex justify-center pt-20 bg-primary h-screen">
          <Spinner diameter={8} stroke={"white"} />
        </div>
      </EventLayout>
    );
  }

  const sortedReservations = [...myReservationsData].sort((a: IReservationByUserId, b: IReservationByUserId) => {
    return (
      Number(new Date(b.ticketsReservations[0]?.DiscoTicket.expDate)) -
      Number(new Date(a.ticketsReservations[0]?.DiscoTicket.expDate))
    );
  });

  return (
    sortedReservations && (
      <EventLayout background={`${discoColors.bgNavbarColor}30`}>
        <NavbarEvent />
        <div className="pt-16 h-full">
          <Link
            style={{ color: discoColors.navbarForeground, background: `${discoColors.bgNavbarColor}` }}
            className="fixed z-20 flex items-center left-0 top-8 bg-secondary rounded-r-3xl pr-2 md:pr-4 py-1 mt-8"
            href={`/event/${slug}`}
          >
            <ChevronLeft width={20} /> Go back
          </Link>
          <div className="flex justify-center">
            <h1
              style={{ color: discoColors.navbarForeground, background: `${discoColors.bgNavbarColor}` }}
              className="text-center text-xl mb-2 p-2 rounded-xl"
            >
              {sortedReservations.length === 0 ? "You don't have any reservations yet" : "My reservations:"}
            </h1>
          </div>

          <div
            style={{ color: discoColors.navbarForeground, background: `${discoColors.bgNavbarColor}30` }}
            className="flex flex-col items-center p-8 gap-4 md:mx-16 lg:mx-32 mb-32 rounded-3xl shadow-md"
          >
            {sortedReservations.length > 0 &&
              sortedReservations.map(
                (reservation) =>
                  reservation.ticketsReservations[0].DiscoTicket.Disco.slug === slug && (
                    <div
                      style={{ background: `${discoColors.bgNavbarColor}` }}
                      className="flex flex-col md:flex-row justify-between gap-8 rounded-2xl p-6 w-full relative overflow-hidden shadow-md"
                      key={reservation.id}
                    >
                      <Image
                        className="object-cover absolute z-0 rounded-full opacity-25 bottom-1"
                        src={discoData.disco.logo}
                        alt="event image logo"
                        width={200}
                        height={200}
                      />
                      <div className="relative z-20">
                        <p style={{ color: discoColors.navbarForeground }} className="font-semibold text-2xl">
                          {reservation.ticketsReservations.length &&
                            reservation.ticketsReservations[0]?.DiscoTicket.Disco.name}
                        </p>
                        <div>
                          <p style={{ color: discoColors.navbarForeground }}>
                            <span>Invoice:</span>
                            <span className="font-light"> {reservation.id.slice(0, 13)}</span>
                          </p>
                          <div>
                            <p style={{ color: discoColors.navbarForeground }}>
                              <span>To use: </span>
                              {reservation.ticketsReservations.length && (
                                <span>
                                  {weekdays[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDay()]}-
                                  {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate()}-
                                  {months[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getMonth()]}
                                </span>
                              )}
                            </p>
                          </div>
                          <p style={{ color: discoColors.navbarForeground }}>
                            <span>Reserved: </span>
                            <span className="font-light">
                              {weekdays[new Date(reservation.createdAt).getDay()].slice(0, 3)}-
                              {new Date(reservation.createdAt).getDate()}-
                              {months[new Date(reservation.createdAt).getMonth()]}-{reservation.createdAt.slice(0, 4)}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <p style={{ color: discoColors.navbarForeground }} className="mb-1 text-2xl">
                          Purchases:
                        </p>
                        <div className="flex flex-col lg:flex-row gap-2">
                          {reservation.ticketsReservations.map((ticket) => (
                            <div
                              style={{ border: `solid 2px ${discoColors.navbarForeground}` }}
                              className="relative overflow-hidden flex flex-col rounded-md px-2 py-1"
                              key={ticket.id}
                            >
                              <p style={{ color: discoColors.navbarForeground }} className="text-sm lg:text-xl">
                                {ticket.quantity} {ticket.DiscoTicket.category}{" "}
                                {Number(ticket.quantity) > 1 ? "tickets" : "ticket"}
                              </p>

                              <p style={{ color: discoColors.navbarForeground }} className="text-sm lg:text-xl">
                                {Number(ticket.DiscoTicket.price) >= 1
                                  ? `Price: ${ticket.DiscoTicket.price} each`
                                  : "free"}
                              </p>
                            </div>
                          ))}
                          <div>
                            {reservation.ticketsReservations[0].ticketReservationCombos.map((combo) => (
                              <div
                                style={{ border: `solid 2px ${discoColors.navbarForeground}` }}
                                className="relative overflow-hidden flex flex-col rounded-md px-2 py-1"
                                key={combo.id}
                              >
                                <p style={{ color: discoColors.navbarForeground }} className="text-sm lg:text-xl">
                                  {combo.quantity} {combo.Combo.category}{" "}
                                  {Number(combo.quantity) > 1 ? "combos" : "combo"}
                                </p>

                                <p style={{ color: discoColors.navbarForeground }} className="text-sm lg:text-xl">
                                  {Number(combo.Combo.price) >= 1 ? `Price: ${combo.Combo.price} each` : "free"}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-2xl">Companions</p>
                        {reservation.ticketsReservations[0].companions.length ? (
                          <ul>
                            {reservation.ticketsReservations[0].companions.map((compa) => {
                              return (
                                <li key={compa.id}>
                                  {compa.firstName} {compa.lastName}
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <p>No companions</p>
                        )}
                      </div>

                      <div className="flex flex-col justify-between items-end font-light text-xl">
                        <div className="absolute right-4 top-4 md:right-0 md:top-0 md:relative">
                          {reservation.ticketsReservations.length &&
                            (new Date(reservation.ticketsReservations[0]?.DiscoTicket.expDate).getDate() ==
                            new Date().getDate() ? (
                              <p className="bg-black/70 px-2 rounded-full text-green-500 text-xs md:text-lg flex items-center gap-2">
                                active{" "}
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                              </p>
                            ) : new Date(reservation?.ticketsReservations[0]?.DiscoTicket?.expDate).toISOString() <
                              new Date().toISOString() ? (
                              <p style={{ color: `${discoColors.navbarForeground}90` }} className="text-xs md:text-lg">
                                expired
                              </p>
                            ) : (
                              <p style={{ color: `${discoColors.navbarForeground}90` }} className="text-xs md:text-lg">
                                pending
                              </p>
                            ))}
                        </div>
                        <p style={{ color: discoColors.navbarForeground }}>
                          <span>Total: </span>
                          <span className="font-semibold text-3xl">
                            $
                            {reservation.ticketsReservations
                              .map((tiket) => {
                                return Number(tiket.quantity) * Number(tiket.DiscoTicket.price);
                              })
                              .reduce((acc, curr) => acc + Number(curr), 0) +
                              reservation.ticketsReservations[0].ticketReservationCombos
                                .map((combo) => {
                                  return Number(combo.quantity) * Number(combo.Combo.price);
                                })
                                .reduce((acc, curr) => acc + Number(curr), 0)}
                          </span>
                        </p>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      </EventLayout>
    )
  );
};

export default Reservations;
