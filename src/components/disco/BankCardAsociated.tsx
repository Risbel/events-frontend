import { IUserBankCard } from "@/services/getDisco";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import EditBankCardButton from "../buttons/EditBankCardButton";

const BankCardAsociated = ({
  discoBankCard,
  discoDetailId,
}: {
  discoBankCard: IUserBankCard;
  discoDetailId: string;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="text-start text-sm text-white px-2 py-1 hover:bg-white hover:text-black rounded-sm w-full">
          Asociated card
        </DialogTrigger>
        <DialogContent className="h-3/4 text-left overflow-auto bg-white/20 backdrop-blur-xl">
          <div className="flex h-full justify-between p-2 flex-col gap-4">
            <div>
              <h2 className="text-2xl text-white pb-4 text-center">Associated card</h2>

              <div className="bg-black text-white p-2 rounded-md w-full mb-4">
                <p>{discoBankCard.name}</p>
                <p className="text-xl md:text-2xl">{discoBankCard.number.replace(/(\d{4})/g, "$1-").slice(0, -1)}</p>
              </div>

              <EditBankCardButton discoDetailId={discoDetailId} discoBankCard={discoBankCard} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankCardAsociated;
