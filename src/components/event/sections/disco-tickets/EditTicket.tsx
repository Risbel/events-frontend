import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IDiscoTicket } from "@/services/getDiscoTicketsByIdDisco";
import { Edit } from "lucide-react";
import EditTicketsForm from "./EditTicketsForm";

const EditTicket = ({ ticket }: { ticket: IDiscoTicket }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Edit />
      </DialogTrigger>
      <DialogContent className="h-2/3 w-full md:w-2/3">
        <DialogHeader>
          <DialogTitle className="p-4">Panel to edit Ticket</DialogTitle>
          <div className="flex w-full lg:w-1/2 justify-center p-4 md:p-8">
            <EditTicketsForm
              countInStock={ticket.countInStock}
              price={ticket.price}
              shortDescription={ticket.shortDescription}
              id={ticket.id}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTicket;
