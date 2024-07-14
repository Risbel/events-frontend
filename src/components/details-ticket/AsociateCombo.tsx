import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCreateAsociationComboTicket } from "@/hooks/useCreateAsociationComboTicket";
import { useGetCombosByDiscoId } from "@/hooks/useGetCombosByDiscoId";
import { DialogClose } from "@radix-ui/react-dialog";
import { CheckSquareIcon, Loader, Loader2, PlusCircle, X } from "lucide-react";
import Image from "next/image";

const AsociateCombo = ({ discoId, discoTicketId }: { discoId: string; discoTicketId: any }) => {
  const { data } = useGetCombosByDiscoId(discoId);

  const { mutate: asociateCombo, isLoading } = useCreateAsociationComboTicket();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button variant="default" className="flex gap-2 items-center pr-3">
            <span>Asociate pack</span> <PlusCircle />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-2/3 h-2/3 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex justify-center py-4 text-white bg-primary">Asociate pack</DialogTitle>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4">
          <X className="stroke-white" />
        </DialogClose>

        <div className="flex flex-col gap-4 p-8 h-full overflow-hidden overflow-y-scroll pb-32">
          {data?.map((combo) => {
            if (!combo.isDeleted) {
              return (
                <div key={combo.id} className="flex items-end gap-4">
                  <div>
                    <p className="text-xl font-bold text-primary">Pack {combo.category}</p>
                    <Image
                      width={200}
                      height={200}
                      className="h-44 w-44 rounded-xl object-cover"
                      src={combo.comboDetail.image}
                      alt="combo image"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-primary">Details:</p>
                    <p>{combo.comboDetail.description}</p>
                    <p>Count in stock: {combo.countInStock}</p>
                    <p>Price: $ {combo.price}</p>
                  </div>
                  <div>
                    {!combo.ticketCombos.find((ticket) => ticket.discoTicketId === discoTicketId) ? (
                      <Button
                        onClick={() => asociateCombo({ comboId: combo.id, discoTicketId })}
                        type="button"
                        className="flex gap-2"
                      >
                        <span>Asociate</span>
                        {isLoading ? (
                          <Loader2 className="animate-spin" stroke="white" />
                        ) : (
                          <PlusCircle stroke="white" />
                        )}
                      </Button>
                    ) : (
                      <div className="flex gap-2 items-center p-2 rounded-lg bg-secondary">
                        <p className="font-semibold">Asociated</p> <CheckSquareIcon stroke="green" />
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AsociateCombo;
