import { IDiscoTicket } from "@/services/getDiscoTicketsByIdDisco";
import Image from "next/image";
import clsx from "clsx";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";
import useHavePermissions from "@/utils/useHavePermissions";
import EditTicketsForm from "../forms/EditTicketsForm";
import DeleteTicketButton from "../buttons/DeleteTicketButton";
import Link from "next/link";
import { useState } from "react";
import { useListDays } from "@/hooks/useListDays";
import { useListMonths } from "@/hooks/useListMonths";
import AddCombosForm from "@/pages/disco/[slug]/details-ticket/[id]/components/AddCombosForm";
import AddTicketsForm from "../forms/AddTicketsForm";
import { compareAsc, compareDesc } from "date-fns";
import { DiscoDetail } from "@/services/getDisco";

export const LogoCategory = ({ category }: { category: string }) => {
  return (
    <div>
      {category === "VIP" && (
        <div className="flex justify-start px-3 py-[2px] bg-gradient-to-r from-yellow-500 to-red-500 rounded-sm mr-1">
          <Image
            className="object-cover"
            src="/vip.png"
            height={35}
            width={35}
            alt="vip icon"
            placeholder="blur"
            blurDataURL={"vip.png"}
          />
        </div>
      )}

      {category === "common" && (
        <Image
          className="object-cover"
          src="/ticket-common.png"
          height={60}
          width={60}
          alt="simple icon"
          placeholder="blur"
          blurDataURL={"ticket-common.png"}
        />
      )}
      {category === "economy" && (
        <Image
          className="object-cover"
          src="/ticket.png"
          height={60}
          width={60}
          alt="simple icon"
          placeholder="blur"
          blurDataURL={"ticket.png"}
        />
      )}
    </div>
  );
};

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
    <>
      {discoTickets?.length !== 0 && (
        <>
          <h1 className="font-extrabold text-4xl text-center text-white mt-10 pb-2">Tickets</h1>
          <div className="flex justify-center pb-4">
            <div className="flex gap-1 overflow-hidden max-w-screen-lg overflow-x-auto border rounded-md p-2 bg-white/10">
              {unicDates.map((date, i) => {
                if (compareAsc(new Date(new Date(date).toDateString()), new Date(new Date().toDateString())) >= 0) {
                  return (
                    <button
                      key={i}
                      style={{ background: `#${discoDetail.discoColor.secondary}` }}
                      className="flex flex-col items-center px-4 py-2 hover:opacity-90 leading-none rounded-md hover:-translate-y-[2px] transition-transform"
                      onClick={() => setDay(date)}
                    >
                      <p style={{ color: `#${discoDetail.discoColor.textColor}` }} className="text-xs">
                        {weekdays[new Date(date).getDay()].slice(0, 3)}
                      </p>
                      <p style={{ color: `#${discoDetail.discoColor.textColor}` }} className="text-xl">
                        {new Date(date).getDate()}
                      </p>
                      <p style={{ color: `#${discoDetail.discoColor.textColor}` }} className="text-xs">
                        {months[new Date(date).getMonth()]}
                      </p>
                    </button>
                  );
                }
              })}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mb-10 p-2 rounded-md bg-black/20 lg:px-8">
            {discoTickets?.map((ticket) => {
              if (new Date(ticket.expDate).toDateString() === day) {
                return (
                  <div key={ticket.id} className="w-full md:w-1/2 lg:w-1/3">
                    <div className="relative">
                      {Number(ticket.countInStock) === 0 ? (
                        <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-md flex items-center justify-center">
                          <p className="text-slate-200 text-2xl">Sold out</p>
                        </div>
                      ) : (
                        ticket.ticketsReservations.length >= 1 &&
                        ticket.category !== "common" && (
                          <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-md flex items-center justify-center">
                            <p className="text-slate-200 text-2xl">Reserved</p>
                          </div>
                        )
                      )}
                      <Link
                        style={{
                          background: `#${discoDetail.discoColor.brandColor}`,
                          border: `solid #${discoDetail.discoColor.textColor} 2px`,
                        }}
                        href={`/disco/${name}/details-ticket/${ticket.id}`}
                        className="flex justify-between gap-2 rounded-md p-2 relative shadow-lg hover:shadow-purple-800/60 hover:-translate-y-1 transition-transform duration-300"
                      >
                        <div className="text-white w-full">
                          <p className="text-sm">Reserve {ticket.category} tickets</p>
                          <div className="flex gap-3 items-center">
                            <div className="flex items-end -translate-y-1">
                              <div>💳</div>
                              <div className="text-sm"> ${ticket.price} c/u</div>
                            </div>
                            {(ticket.category === "VIP" || ticket.category === "economy") && (
                              <p className="text-xs">🪑 {ticket.countInStock}available</p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-light text-gray-100"> {ticket.shortDescription}</p>
                            <p className="text-xs font-thin text-center pt-2">
                              📆 {weekdays[new Date(ticket.expDate).getDay()]} {new Date(ticket.expDate).getDate()}
                            </p>
                          </div>
                        </div>
                        <div className="flex absolute items-center gap-1 md:gap-2 right-1">
                          <div className=" text-white">{ticket.countInStock}</div>
                          <LogoCategory category={ticket.category} />
                        </div>
                      </Link>
                    </div>

                    <div className="flex gap-4 my-2 ">
                      {havePermission("update", "Tickets") &&
                        (ticket.ticketsReservations.length < 1 || ticket.category === "common") && (
                          <div>
                            <EditTicketsForm
                              id={ticket.id}
                              price={ticket.price}
                              countInStock={ticket.countInStock}
                              shortDescription={ticket.shortDescription}
                            />
                          </div>
                        )}

                      {ticket.ticketsReservations.length < 1 && havePermission("delete", "Tickets") && (
                        <DeleteTicketButton id={ticket.id} />
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
      <div className={clsx(!havePermission("create", "Tickets") && "hidden", "my-10 flex flex-col gap-4")}>
        <AddTicketsForm discoId={discoId} />

        <AddCombosForm discoId={discoId} />
      </div>
    </>
  );
};

export default DiscoTickets;
