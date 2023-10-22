import { IDiscoTicket } from "@/services/getDiscoTicketsByIdDisco";
import Image from "next/image";
import AddTicketsButton from "../buttons/AddTicketsButton";
import clsx from "clsx";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";
import useHavePermissions from "@/utils/useHavePermissions";
import { useState } from "react";
import EditTicketsForm from "../forms/EditTicketsForm";
import DeleteTicketButton from "../buttons/DeleteTicketButton";

const DiscoTickets = ({
  myPermissions,
  discoId,
  discoTickets,
}: {
  myPermissions: ImyPermissions;
  discoId: string;
  discoTickets: IDiscoTicket[];
}) => {
  const { havePermission } = useHavePermissions(myPermissions);

  return (
    <>
      {discoTickets?.length !== 0 && (
        <div>
          <h1 className="font-extrabold text-4xl text-white pt-5">Tickets</h1>
          <div className="grid  lg:grid-cols-2 gap-4 py-9">
            {discoTickets?.map((ticket) => (
              <div key={ticket.id}>
                <div className="flex justify-between gap-2 border-2 bg-gradient-to-r from-black/70  to-slate-900/70 rounded-md p-2 relative hover:scale-[102%]">
                  <div className="text-white">
                    <p>Reserve {ticket.category} tickets</p>
                    <div className="flex gap-8 items-center">
                      <p>Price: {ticket.price} </p>
                      {(ticket.category === "VIP" || ticket.category === "economy") && (
                        <p className="text-xs">Seats for {ticket.quantity} </p>
                      )}
                    </div>
                    <p className="text-xs"> {ticket.description}</p>
                  </div>
                  <div className="flex absolute items-start gap-1 md:gap-2 right-1">
                    {ticket.category === "common" && <div className=" text-white">{ticket.quantity}</div>}
                    {ticket.category === "VIP" && (
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

                    {ticket.category === "common" && (
                      <Image
                        className="object-cover -translate-y-4"
                        src="/ticket-common.png"
                        height={60}
                        width={60}
                        alt="simple icon"
                        placeholder="blur"
                        blurDataURL={"ticket-common.png"}
                      />
                    )}
                    {ticket.category === "economy" && (
                      <Image
                        className="object-cover -translate-y-4"
                        src="/ticket.png"
                        height={60}
                        width={60}
                        alt="simple icon"
                        placeholder="blur"
                        blurDataURL={"ticket.png"}
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-4 my-2 ">
                  {havePermission("update", "Tickets") && (
                    <div>
                      <EditTicketsForm
                        id={ticket.id}
                        price={ticket.price}
                        quantity={ticket.quantity}
                        description={ticket.description}
                      />
                    </div>
                  )}

                  {havePermission("delete", "Tickets") && <DeleteTicketButton id={ticket.id} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={clsx(!havePermission("create", "Tickets") && "hidden", "my-10")}>
        <AddTicketsButton discoId={discoId} />
      </div>
    </>
  );
};

export default DiscoTickets;
