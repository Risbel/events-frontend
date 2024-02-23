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
    <div style={{ background: `${values.bgTicketsSection}` }} className="pb-20">
      <h1
        style={{ color: `${values.ticketH1Color}` }}
        className="font-extrabold text-4xl md:text-5xl lg:text-7xl text-center mb-8 pt-20"
      >
        Tickets
      </h1>
      <div className="flex justify-center pb-4">
        <div
          style={{
            background: `${values.buttonsTicketsColor}60`,
            border: `solid ${values.buttonTicketForeground} 4px`,
          }}
          className="flex gap-1 overflow-hidden max-w-screen-lg overflow-x-auto rounded-xl p-2"
        >
          {[28, 29, 30, 31].map((date: any, i) => {
            return (
              <button
                key={i}
                style={{
                  border: `solid ${values.buttonTicketForeground} 3px`,
                  background: `${values.buttonsTicketsColor}`,
                }}
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
      <div className="flex justify-center max-w-screen flex-wrap gap-4 mb-10 p-2 rounded-md px-8">
        {discoTickets?.map((ticket: any) => {
          return (
            <div key={ticket.id} className="relative w-full md:w-1/3 lg:w-1/5 min-w-64">
              <div className="relative h-full">
                {Number(ticket.countInStock) === 0 ? (
                  <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-3xl flex items-center justify-center">
                    <p className="text-slate-200 text-2xl">Sold out</p>
                  </div>
                ) : (
                  ticket.ticketsReservations.length >= 1 &&
                  ticket.category !== "common" && (
                    <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-3xl flex items-center justify-center">
                      <p className="text-slate-200 text-2xl">Reserved</p>
                    </div>
                  )
                )}
                <div
                  style={{
                    background: `${values.buttonsTicketsColor}`,
                    border: `solid ${values.buttonTicketForeground} 2px`,
                  }}
                  className="flex flex-col h-full gap-2 justify-between items-center rounded-3xl py-8 relative"
                >
                  <p
                    style={{
                      border: `solid ${values.buttonTicketForeground}90 1px`,
                      color: `${values.buttonTicketForeground}`,
                    }}
                    className="text-center text-xl font-bold mb-2 border px-2 rounded-full"
                  >
                    {ticket.category}
                  </p>

                  <div className="flex items-center gap-2 pb-4">
                    <div style={{ color: `${values.buttonTicketForeground}` }} className="text-5xl font-bold">
                      ${ticket.price}
                    </div>
                  </div>

                  {(ticket.category === "VIP" || ticket.category === "economy") && (
                    <div className="flex items-center gap-2">
                      <p style={{ color: `${values.buttonTicketForeground}` }} className="font-semibold text-xl">
                        {ticket.countInStock} seats available
                      </p>
                    </div>
                  )}

                  <p style={{ color: `${values.buttonTicketForeground}` }} className="text-center text-xs pb-6 w-2/3">
                    {ticket?.shortDescription}
                  </p>

                  <div className="flex absolute right-1 top-1 items-center gap-1 md:gap-2">
                    <LogoCategory ticket={ticket} discoColors={values} />
                  </div>

                  <div
                    className="text-center font-semibold py-1 px-4 rounded-md hover:-translate-y-1 shadow-lg transition-transform duration-300"
                    style={{
                      background: `${values.buttonsTicketsColor}`,
                      border: `solid ${values.buttonTicketForeground} 1px`,
                      color: `${values.buttonTicketForeground}`,
                    }}
                  >
                    Get tickets
                  </div>
                  <p>{ticket.largeDescription}</p>
                  <div style={{ color: `${values.buttonTicketForeground}` }}>
                    <div style={{ color: `${values.buttonTicketForeground}` }}>
                      <p className="text-xs text-center">
                        {weekdays[new Date(ticket.expDate).getDay()]} {new Date(ticket.expDate).getDate()}
                      </p>
                    </div>
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
