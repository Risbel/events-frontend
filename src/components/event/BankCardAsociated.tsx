import { DiscoDetail, IUserBankCard } from "@/services/getDisco";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import EditBankCardButton from "../buttons/EditBankCardButton";

const BankCardAsociated = ({
  discoBankCard,
  discoDetail,
}: {
  discoBankCard: IUserBankCard;
  discoDetail: DiscoDetail;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="text-start text-sm px-2 py-1 hover:bg-black hover:text-white rounded-sm w-full transition-colors">
          Asociated card
        </DialogTrigger>
        <DialogContent
          style={{
            background: `${discoDetail.discoColor.bgNavbarColor}`,
            border: `2px solid ${discoDetail.discoColor.navbarForeground}`,
          }}
          className="h-3/4 w-1/3 text-left overflow-auto backdrop-blur-xl"
        >
          <div className="flex h-full justify-between p-2 flex-col gap-4">
            <div>
              <h2 style={{ color: `${discoDetail.discoColor.navbarForeground}` }} className="text-2xl pb-4 text-center">
                Associated card
              </h2>

              <div className="bg-black text-center text-white p-2 rounded-md w-full mb-4">
                <p>{discoBankCard.name}</p>
                <p className="text-xl md:text-2xl">{discoBankCard.number}</p>
              </div>

              <EditBankCardButton discoDetail={discoDetail} discoBankCard={discoBankCard} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankCardAsociated;
