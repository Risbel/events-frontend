import EventLayout from "@/components/layouts/EventLayout";
import Spinner from "@/components/loaders/Spinner";
import { useGetReservationsByDiscoSlug } from "@/hooks/useGetReservationsByDiscoSlug";
import { useListDays } from "@/hooks/useListDays";
import { useListMonths } from "@/hooks/useListMonths";
import { IReservationsByDiscoSlug } from "@/services/getReservationsByDiscoSlug";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import SearchReservationsForm from "./components/SearchReservationsBar";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import NavbarEvent from "@/components/navigation/NavbarEvent";

const MySales = () => {
  const days = useListDays();
  const months = useListMonths();
  const param = useParams();

  const [searchParams, setSearchParams] = useState("");

  const { data, isLoading } = useGetReservationsByDiscoSlug(param?.slug);

  if (isLoading) {
    return (
      <EventLayout>
        <NavbarEvent />
        <div className="pt-20 flex justify-center bg-primary h-full">
          <Spinner diameter={8} stroke="white" />
        </div>
      </EventLayout>
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

  console.log(sortedReservations);

  return (
    <div>
      <NavbarEvent />
      <div className="pt-16 px-4 md:px-8 bg-primary h-full pb-16">
        <Link
          className="absolute flex gap-2 text-white font-light border px-[1px] rounded-md hover:bg-white/10"
          href={`/event/${param?.slug}`}
        >
          <ChevronLeft width={20} />
        </Link>
        <h1 className="text-white text-2xl mb-2 text-center font-semibold">My Sales</h1>

        <SearchReservationsForm setSearchParams={setSearchParams} />

        <div className="flex justify-center">{isLoading && <Spinner diameter={8} stroke="white" />}</div>

        <h1 className="text-white text-xl mb-4 text-center md:text-start">Sold to use today</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedReservations &&
            sortedReservations.map((reservation) => {
              if (
                new Date().toLocaleDateString().slice(0, 10) ===
                new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).toLocaleDateString().slice(0, 10)
              ) {
                return (
                  <div key={reservation.id} className="p-2 border rounded-md bg-white/10">
                    <div className="flex justify-around bg-black/30">
                      <p className="text-white text-xs font-light ">Today</p>
                      <p className="text-white text-xs font-light ">
                        {days[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDay()]}-
                        {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate()}-
                        {months[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getMonth()]}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-white">
                        {reservation.User.name} {reservation.User.lastName}
                      </p>
                      <p className="text-white font-light">{reservation.User.phone}</p>
                    </div>
                    <div>
                      <p className="text-white">
                        <span className="font-semibold bg-black/20">Invoice:</span> {reservation.id.slice(0, 13)}
                      </p>
                    </div>
                    <div className="grid flex-col gap-2">
                      {reservation.ticketsReservations.map((ticket) => (
                        <div key={ticket.id}>
                          <div className="bg-black/20 p-2 rounded-md">
                            <div className="flex justify-between items-center">
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
                );
              }
            })}
        </div>
        <div className="border-b-[1px] border-dashed w-full my-8" />
        <h1 className="text-white text-xl mb-4 text-center md:text-start">Pending</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {sortedReservations &&
            sortedReservations.map((reservation) => {
              if (
                new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).toISOString() >
                new Date().toISOString()
              ) {
                return (
                  <div key={reservation.id}>
                    <div className="p-2 border rounded-md bg-white/10">
                      <p className="text-white text-center text-xs font-light bg-black/30">
                        {days[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDay()]}-
                        {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate()}-
                        {months[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getMonth()]}
                      </p>

                      <div className="flex justify-between">
                        <p className="text-white">
                          {reservation.User.name} {reservation.User.lastName}
                        </p>
                        <p className="text-white font-light">{reservation.User.phone}</p>
                      </div>
                      <div>
                        <p className="text-white">
                          <span className="font-semibold bg-black/20">Invoice:</span> {reservation.id.slice(0, 13)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {reservation.ticketsReservations.map((ticket) => (
                          <div key={ticket.id}>
                            <div className="bg-black/20 p-2 rounded-md">
                              <div className="flex justify-between items-center">
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
                );
              }
            })}
        </div>
        <div className="border-b-[1px] border-dashed w-full my-8" />
        <h1 className="text-white text-xl mb-4 text-center md:text-start">Used yesterday</h1>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {sortedReservations &&
            sortedReservations.map((reservation) => {
              if (
                yesterday.toLocaleDateString().slice(0, 10) ===
                new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).toLocaleDateString().slice(0, 10)
              ) {
                return (
                  <div key={reservation.id}>
                    <div className="p-2 border rounded-md bg-white/10">
                      <div className="flex justify-around bg-black/30">
                        <p className="text-white text-xs font-light ">yesterday</p>
                        <p className="text-white text-center text-xs font-light">
                          {days[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDay()]}-
                          {new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getDate()}-
                          {months[new Date(reservation.ticketsReservations[0].DiscoTicket.expDate).getMonth()]}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-between">
                        <p className="text-white">
                          {reservation.User.name} {reservation.User.lastName}
                        </p>
                        <p className="text-white font-light">{reservation.User.phone}</p>
                      </div>
                      <div>
                        <p className="text-white">
                          <span className="font-semibold bg-black/20">Invoice:</span> {reservation.id.slice(0, 13)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {reservation.ticketsReservations.map((ticket) => (
                          <div key={ticket.id}>
                            <div className="bg-black/20 p-2 rounded-md">
                              <div className="flex justify-between items-center">
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
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default MySales;
