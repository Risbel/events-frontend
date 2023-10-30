import { IDiscoTicket } from "@/services/getDiscoTicketsByIdDisco";
import Image from "next/image";
import AddTicketsButton from "../buttons/AddTicketsButton";
import clsx from "clsx";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";
import useHavePermissions from "@/utils/useHavePermissions";
import EditTicketsForm from "../forms/EditTicketsForm";
import DeleteTicketButton from "../buttons/DeleteTicketButton";
import Link from "next/link";
import useCart from "@/store/useCart";

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
}: {
  name: string;
  myPermissions: ImyPermissions;
  discoId: string;
  discoTickets: IDiscoTicket[];
}) => {
  const { havePermission } = useHavePermissions(myPermissions);

  return (
    <>
      {discoTickets?.length !== 0 && (
        <>
          <h1 className="font-extrabold text-4xl text-white pt-5 pb-4">Tickets</h1>
          <div className="grid lg:grid-cols-2 gap-4 pb-9">
            {discoTickets?.map((ticket) => (
              <div key={ticket.id}>
                <div className="relative">
                  {Number(ticket.countInStock) === 0 && (
                    <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-md flex items-center justify-center">
                      <p className="text-slate-200 text-2xl">Sold out</p>
                    </div>
                  )}
                  <Link
                    href={`/disco/${name}/details-ticket/${ticket.id}`}
                    className="flex justify-between gap-2 border-2 bg-gradient-to-r from-black/70  to-slate-900/70 rounded-md p-2 relative hover:scale-[102%]"
                  >
                    <div className="text-white">
                      <p>Reserve {ticket.category} tickets</p>
                      <div className="flex gap-8 items-center">
                        <p>Price: {ticket.price} </p>
                        {(ticket.category === "VIP" || ticket.category === "economy") && (
                          <p className="text-xs">Seats for {ticket.countInStock} </p>
                        )}
                      </div>
                      <p className="text-xs"> {ticket.description}</p>
                    </div>
                    <div className="flex absolute items-center gap-1 md:gap-2 right-1">
                      <div className=" text-white">{ticket.countInStock}</div>
                      <LogoCategory category={ticket.category} />
                    </div>
                  </Link>
                </div>

                <div className="flex gap-4 my-2 ">
                  {havePermission("update", "Tickets") && (
                    <div>
                      <EditTicketsForm
                        id={ticket.id}
                        price={ticket.price}
                        countInStock={ticket.countInStock}
                        description={ticket.description}
                      />
                    </div>
                  )}

                  {havePermission("delete", "Tickets") && <DeleteTicketButton id={ticket.id} />}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className={clsx(!havePermission("create", "Tickets") && "hidden", "my-10")}>
        <AddTicketsButton discoId={discoId} />
      </div>
    </>
  );
};

export default DiscoTickets;
