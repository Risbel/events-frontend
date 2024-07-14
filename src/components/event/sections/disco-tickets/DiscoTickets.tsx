import { IDiscoTicket } from "@/services/getDiscoTicketsByIdDisco";
import clsx from "clsx";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";
import useHavePermissions from "@/utils/useHavePermissions";

import Link from "next/link";
import { useState } from "react";
import { useListDays } from "@/hooks/useListDays";
import { useListMonths } from "@/hooks/useListMonths";

import { compareAsc } from "date-fns";
import { DiscoDetail } from "@/services/getDisco";
import EditTicket from "./EditTicket";
import DeleteTicket from "./DeleteTicket";
import LogoCategory from "./LogoCategory";
import AddTicketsForm from "./AddTicketsForm";

const DiscoTickets = ({
  name,
  myPermissions,
  discoId,
  discoTickets,
  discoDetail,
}: {
  name: string;
  myPermissions: ImyPermissions;
  discoId: string;
  discoTickets: IDiscoTicket[];
  discoDetail: DiscoDetail;
}) => {
  const weekdays = useListDays();
  const months = useListMonths();

  const [day, setDay] = useState(`${new Date().toDateString()}`);

  const { havePermission } = useHavePermissions(myPermissions);

  const expDates = discoTickets.map((ticket) => new Date(ticket.expDate));
  const sortedDates = expDates.sort(compareAsc);
  const unicDates = [...new Set(sortedDates.map((date) => date.toDateString()))];

  return (
    <div style={{ background: `${discoDetail.discoColor.bgTicketsSection}` }}>
      <h1
        style={{ color: `${discoDetail.discoColor.ticketH1Color}` }}
        className="font-extrabold text-4xl md:text-5xl lg:text-7xl text-center mb-8 pt-20"
      >
        Tickets
      </h1>
      <div className="flex justify-center mb-4">
        <div
          style={{
            background: `${discoDetail.discoColor.buttonsTicketsColor}60`,
            border: `solid ${discoDetail.discoColor.buttonTicketForeground} 4px`,
          }}
          className="flex gap-1 overflow-hidden max-w-screen-lg overflow-x-auto rounded-xl p-2"
        >
          {unicDates.map((date, i) => {
            if (compareAsc(new Date(new Date(date).toDateString()), new Date(new Date().toDateString())) >= 0) {
              return (
                <button
                  key={i}
                  style={{
                    border: `solid ${discoDetail.discoColor.buttonTicketForeground} 2px`,
                    background: `${discoDetail.discoColor.buttonsTicketsColor}`,
                  }}
                  className="flex flex-col items-center px-4 py-2 hover:opacity-90 leading-none rounded-md hover:-translate-y-[2px] transition-transform"
                  onClick={() => setDay(date)}
                >
                  <p
                    style={{ color: `${discoDetail.discoColor.buttonTicketForeground}` }}
                    className="text-xs font-semibold"
                  >
                    {weekdays[new Date(date).getDay()].slice(0, 3)}
                  </p>
                  <p
                    style={{ color: `${discoDetail.discoColor.buttonTicketForeground}` }}
                    className="text-xl font-bold"
                  >
                    {new Date(date).getDate()}
                  </p>
                  <p
                    style={{ color: `${discoDetail.discoColor.buttonTicketForeground}` }}
                    className="text-xs font-semibold"
                  >
                    {months[new Date(date).getMonth()].slice(0, 3)}
                  </p>
                </button>
              );
            }
          })}
        </div>
      </div>

      <div className="flex justify-center max-w-screen flex-wrap gap-4 mb-10 p-2 rounded-md px-8">
        {discoTickets?.map((ticket) => {
          if (new Date(ticket.expDate).toDateString() === day) {
            return (
              <div key={ticket.id} className="relative w-full md:w-1/3 lg:w-1/5 min-w-64">
                {
                  Number(ticket.countInStock) === 0 && (
                    <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-3xl flex items-center justify-center">
                      <p className="text-slate-200 text-2xl">Sold out</p>
                    </div>
                  )
                  // ) : (
                  //   ticket.ticketsReservations.length >= 1 &&
                  //   ticket.category !== "common" && (
                  //     <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-3xl flex items-center justify-center">
                  //       <p className="text-slate-200 text-2xl">Reserved</p>
                  //     </div>
                  //   )
                  // )
                }
                <div
                  style={{
                    background: `${discoDetail.discoColor.buttonsTicketsColor}`,
                    border: `solid ${discoDetail.discoColor.buttonTicketForeground} 2px`,
                    color: `${discoDetail.discoColor.buttonTicketForeground}`,
                  }}
                  className="flex flex-col h-full gap-2 justify-between items-center rounded-3xl py-8 relative"
                >
                  <p
                    style={{ border: `solid ${discoDetail.discoColor.buttonTicketForeground}90 1px` }}
                    className="text-center text-xl font-bold mb-2 border px-2 rounded-full"
                  >
                    {ticket.category}
                  </p>

                  <div className="flex items-center gap-2 pb-4">
                    <div className="text-5xl font-bold">
                      {Number(ticket.price) > 0 ? (
                        `${ticket.price}`
                      ) : (
                        <span
                          className="text-2xl"
                          style={{
                            border: `solid ${discoDetail.discoColor.buttonTicketForeground} 2px`,
                            borderRadius: 100,
                            color: `${discoDetail.discoColor.buttonTicketForeground}`,
                            paddingRight: 10,
                            paddingLeft: 10,
                          }}
                        >
                          free
                        </span>
                      )}
                    </div>
                  </div>

                  {(ticket.category === "VIP" || ticket.category === "economy") && (
                    <div className="flex items-center">
                      <p className="font-semibold">{ticket.countInStock} seats available</p>
                    </div>
                  )}
                  <p className="text-center text-xs pb-6 w-2/3"> {ticket?.shortDescription}</p>

                  <div className="flex absolute right-1 top-1 items-center gap-1 md:gap-2">
                    <LogoCategory ticket={ticket} discoColors={discoDetail.discoColor} />
                  </div>

                  <Link
                    className="text-center font-semibold py-1 px-4 rounded-md hover:-translate-y-1 shadow-lg transition-transform duration-300"
                    style={{
                      background: `${discoDetail.discoColor.buttonsTicketsColor}`,
                      border: `solid ${discoDetail.discoColor.buttonTicketForeground} 1px`,
                      color: `${discoDetail.discoColor.buttonTicketForeground}`,
                    }}
                    href={`/event/${name}/details-ticket/${ticket.id}`}
                  >
                    Get tickets
                  </Link>

                  <div style={{ color: `${discoDetail.discoColor.buttonTicketForeground}` }}>
                    <div className="font-semibold w-full flex items-center justify-center gap-2">
                      <p className="text-xs text-center">
                        {weekdays[new Date(ticket.expDate).getDay()]} {months[new Date(ticket.expDate).getMonth()]}{" "}
                        {new Date(ticket.expDate).getDate()}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full justify-end pr-4 relative z-50">
                    {havePermission("update", "Tickets") && <EditTicket ticket={ticket} />}
                    {havePermission("delete", "Tickets") && <DeleteTicket idTicket={ticket.id} />}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div
        className={clsx(
          !havePermission("create", "Tickets") && "hidden",
          "my-10 flex flex-col items-center gap-4 w-screen"
        )}
      >
        <AddTicketsForm discoId={discoId} />
      </div>
    </div>
  );
};

export default DiscoTickets;
