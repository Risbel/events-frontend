import { LogoCategory } from "@/components/event/DiscoTickets";
import { useListDays } from "@/hooks/useListDays";
import { useListMonths } from "@/hooks/useListMonths";
import { CalendarDays, CreditCard, RockingChair } from "lucide-react";

const discoTickets: any = [
  {
    id: "4a70ae51-5853-47a3-9bdd-6cb03a2d59aa",
    price: "50",
    shortDescription: "Este ticket es lo maximo",
    largeDescription: "",
    category: "economy",
    countInStock: "5",
    expDate: "2024-01-29T04:59:59.999Z",
    createdAt: "2024-01-28T13:41:41.871Z",
    updatedAt: "2024-01-28T13:41:41.871Z",
    discoId: "d72e5af0-4fe0-442d-811d-d5764f83367b",
    ticketsReservations: [],
  },
  {
    id: "807e092e-967d-4021-8474-db5603a752be",
    price: "100",
    shortDescription: "The best ticket of the day",
    largeDescription: "",
    category: "VIP",
    countInStock: "10",
    expDate: "2024-02-29T04:59:59.999Z",
    createdAt: "2024-02-02T00:36:07.396Z",
    updatedAt: "2024-02-02T00:36:07.396Z",
    discoId: "d72e5af0-4fe0-442d-811d-d5764f83367b",
    ticketsReservations: [
      {
        id: 1,
        quantity: 10,
      },
    ],
  },
  {
    id: "147a8d9e-6d9b-4c9a-a23f-e80ba4094bd5",
    price: "39",
    shortDescription: "",
    largeDescription: "",
    category: "common",
    countInStock: "5",
    expDate: "2024-02-29T04:59:59.999Z",
    createdAt: "2024-02-07T21:38:06.134Z",
    updatedAt: "2024-02-07T21:38:06.134Z",
    discoId: "d72e5af0-4fe0-442d-811d-d5764f83367b",
    ticketsReservations: [
      {
        id: 1,
        quantity: 10,
      },
    ],
  },
];

const TicketsPreview = ({ values }: { values: any }) => {
  const weekdays = useListDays();
  const months = useListMonths();

  return (
    <div style={{ background: `${values.bgTicketsSection}` }} className="h-screen">
      <h1
        style={{ color: `${values.ticketH1Color}` }}
        className="font-extrabold text-4xl md:text-5xl lg:text-7xl text-center pb-2 pt-20"
      >
        Tickets
      </h1>
      <div className="flex justify-center pb-4">
        <div
          style={{
            background: `${values.ticketH1Color}99`,
            border: `solid 3px`,
            borderColor: `${values.ticketH1Color}`,
          }}
          className="flex gap-1 overflow-hidden max-w-screen-lg overflow-x-auto rounded-md p-2"
        >
          {[28, 29, 30, 31].map((date: any, i) => {
            return (
              <button
                key={i}
                style={{ background: `${values.buttonsTicketsColor}` }}
                className="flex flex-col items-center px-4 py-2 hover:opacity-90 leading-none rounded-md hover:-translate-y-[2px] transition-transform"
              >
                <p style={{ color: `${values.buttonTicketForeground}` }} className="text-xs font-semibold">
                  {weekdays[i].slice(0, 3)}
                </p>
                <p style={{ color: `${values.buttonTicketForeground}` }} className="text-xl font-bold">
                  {date}
                </p>
                <p style={{ color: `${values.buttonTicketForeground}` }} className="text-xs font-semibold">
                  {months[i].slice(0, 3)}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-10 p-2 rounded-md lg:px-8">
        {discoTickets?.map((ticket: any) => {
          return (
            <div key={ticket.id} className="w-full md:w-1/2 lg:w-2/3">
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
                <div
                  style={{
                    background: `${values.buttonsTicketsColor}`,
                    border: `solid ${values.buttonTicketForeground} 2px`,
                  }}
                  className="flex justify-between gap-2 rounded-md p-2 relative hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                >
                  <div style={{ color: `${values.buttonTicketForeground}` }} className="w-full">
                    <p className="text-sm font-semibold">Reserve {ticket.category} tickets</p>
                    <div className="flex gap-3 items-center">
                      <div className="flex items-center gap-2">
                        <CreditCard style={{ stroke: `${values.buttonTicketForeground}` }} />
                        <div className="text-sm"> ${ticket.price} c/u</div>
                      </div>
                      {(ticket.category === "VIP" || ticket.category === "economy") && (
                        <div className="flex items-center gap-2">
                          <RockingChair stroke={`${values.buttonTicketForeground}`} />
                          <p className="text-xs">{ticket.countInStock} available</p>
                        </div>
                      )}
                    </div>
                    <div style={{ color: `${values.buttonTicketForeground}` }}>
                      <p className="text-xs"> {ticket?.shortDescription}</p>
                      <div className="w-full flex items-center justify-center gap-2">
                        <CalendarDays style={{ stroke: `${values.buttonTicketForeground}` }} />
                        <p className="text-xs text-center">
                          {weekdays[new Date(ticket.expDate).getDay()]} {new Date(ticket.expDate).getDate()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex absolute items-center gap-1 md:gap-2 right-1">
                    <div>{ticket.countInStock}</div>
                    <LogoCategory ticket={ticket} discoColors={values} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketsPreview;
