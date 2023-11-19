import { LogoCategory } from "@/components/disco/DiscoTickets";
import HomeLayout from "@/components/layouts/HomeLayout";
import Spinner from "@/components/loaders/Spinner";
import { useGetReservationsByDiscoSlug } from "@/hooks/useGetReservationsByDiscoSlug";
import { useListDays } from "@/hooks/useListDays";
import { useListMonths } from "@/hooks/useListMonths";
import { IReservationsByDiscoSlug } from "@/services/getReservationsByDiscoSlug";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import SearchReservationsForm from "./components/SearchReservationsBar";

const MySales = () => {
  const days = useListDays();
  const months = useListMonths();
  const param = useParams();

  const [searchParams, setSearchParams] = useState("");

  const { data, isLoading } = useGetReservationsByDiscoSlug(param?.slug);

  if (isLoading) {
    return (
      <HomeLayout>
        <div className="pt-20 flex justify-center">
          <Spinner diameter={8} />
        </div>
      </HomeLayout>
    );
  }

  const sortedReservations =
    data && !searchParams
      ? [...data?.reservations].sort((a: IReservationsByDiscoSlug, b: IReservationsByDiscoSlug) => {
          return (
            Number(new Date(b.ticketsReservations[0].DiscoTicket.expDate)) -
            Number(new Date(a.ticketsReservations[0].DiscoTicket.expDate))
          );
        })
      : data &&
        [...data?.reservations]
          .sort((a: IReservationsByDiscoSlug, b: IReservationsByDiscoSlug) => {
            return (
              Number(new Date(b.ticketsReservations[0].DiscoTicket.expDate)) -
              Number(new Date(a.ticketsReservations[0].DiscoTicket.expDate))
            );
          })
          .filter((reservation) => {
            const userName = reservation.User.name.toLowerCase();
            const searchQuery = searchParams.toLowerCase();

            return userName.includes(searchQuery);
          });

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  return (
    <HomeLayout>
      <div className="pt-16 px-4 md:px-8">
        <h1 className="text-white text-2xl mb-2 text-center md:text-start font-semibold">My Sales</h1>

        <SearchReservationsForm setSearchParams={setSearchParams} />

        <div className="flex justify-center">{isLoading && <Spinner diameter={8} />}</div>

        {sortedReservations &&
          sortedReservations.map((reservation) => {
            if (
              new Date().toLocaleDateString().slice(0, 10) ===
              new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).toLocaleDateString().slice(0, 10)
            ) {
              return (
                <div key={reservation.id}>
                  <h1 className="text-white text-xl mb-4 text-center md:text-start underline underline-offset-2">
                    Today
                  </h1>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-2 border rounded-md bg-white/10">
                      <div className="flex justify-around bg-black/30">
                        <p className="text-white text-xs font-light ">Today</p>
                        <p className="text-white text-xs font-light ">
                          {days[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDay()]}-
                          {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate()}-
                          {months[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getMonth()]}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <p className="text-white">{reservation.User.name}</p>
                        <p className="text-white font-light">{reservation.User.phone}</p>
                      </div>
                      <div>
                        <p className="text-white">
                          <span className="font-semibold bg-black/20">Invoice:</span> {reservation.id.slice(0, 13)}
                        </p>
                      </div>
                      <div className="grid grid-flow-col gap-2">
                        {reservation.ticketsReservations.map((ticket) => (
                          <div className="py-2" key={ticket.id}>
                            <div className="bg-black/20 p-2 rounded-md">
                              <div className="flex justify-between items-center">
                                <LogoCategory category={ticket.DiscoTicket.category} />

                                <p className="text-white text-sm">
                                  {ticket.quantity} {ticket.DiscoTicket.category}{" "}
                                  {Number(ticket.quantity) > 1 ? "tickets" : "ticket"}
                                </p>
                                <p className="text-white text-sm">{ticket.DiscoTicket.price} c/u</p>
                              </div>
                              <p className="text-white text-xs font-light">{ticket.DiscoTicket.shortDescription}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-b-[1px] border-dashed w-full my-8" />
                </div>
              );
            } else {
              if (
                yesterday.toLocaleDateString().slice(0, 10) ===
                new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).toLocaleDateString().slice(0, 10)
              ) {
                return (
                  <div key={reservation.id} className="mb-16">
                    <h1 className="text-white text-xl mb-4 text-center md:text-start">
                      Yesterday {days[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDay()]}-
                      {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate()}-
                      {months[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getMonth()]}
                    </h1>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-2 border rounded-md bg-white/10">
                        <p className="text-white text-center text-xs font-light bg-black/30">
                          {days[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDay()]}-
                          {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate()}-
                          {months[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getMonth()]}
                        </p>

                        <div className="flex justify-between">
                          <p className="text-white">{reservation.User.name}</p>
                          <p className="text-white font-light">{reservation.User.phone}</p>
                        </div>
                        <div>
                          <p className="text-white">
                            <span className="font-semibold bg-black/20">Invoice:</span> {reservation.id.slice(0, 13)}
                          </p>
                        </div>
                        <div className="grid grid-flow-col gap-2">
                          {reservation.ticketsReservations.map((ticket) => (
                            <div className="py-2" key={ticket.id}>
                              <div className="bg-black/20 p-2 rounded-md">
                                <div className="flex justify-between items-center">
                                  <LogoCategory category={ticket.DiscoTicket.category} />

                                  <p className="text-white text-sm">
                                    {ticket.quantity} {ticket.DiscoTicket.category}{" "}
                                    {Number(ticket.quantity) > 1 ? "tickets" : "ticket"}
                                  </p>
                                  <p className="text-white text-sm">{ticket.DiscoTicket.price} c/u</p>
                                </div>
                                <p className="text-white text-xs font-light">{ticket.DiscoTicket.shortDescription}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            }
          })}
      </div>
    </HomeLayout>
  );
};

export default MySales;
