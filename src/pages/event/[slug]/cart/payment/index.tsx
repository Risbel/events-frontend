import EventLayout from "@/components/layouts/EventLayout";
import Spinner from "@/components/loaders/Spinner";
import NavbarEvent from "@/components/navigation/NavbarEvent";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import useGetDisco from "@/hooks/useGetDisco";
import useCart from "@/store/useCart";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Payment = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });

  const { cartItems } = useCart();
  const { data } = useSession();

  const { mutate, isLoading } = useCreateReservation();

  const handleSubmitReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data && cartItems) {
      const payloadReservation = cartItems.map((item) => {
        return {
          discoTicketId: !item?.comboDetail?.id ? item.id : null,
          comboId: item?.comboDetail?.id ? item.id : null,
          quantity: item.quantity,
          discoId: item.discoId,
          cardNumber: item.Disco.discoDetail.userBankCard.number,
        };
      });

      mutate({ userId: data?.user.id, cartItems: payloadReservation });
    }
  };

  const discoColors = discoData?.disco.discoDetail.discoColor;

  if (!discoColors) {
    return;
  }

  return (
    <EventLayout background={`${discoColors?.bgNavbarColor}30`}>
      <NavbarEvent />
      <div className="h-full md:px-20 lg:px-32">
        <div className="pt-16 flex justify-center px-2">
          <p
            style={{
              color: ` ${discoColors.navbarForeground}`,
              background: `${discoColors.bgNavbarColor}`,
            }}
            className="text-center font-thin py-1 px-4 rounded-2xl text-xl"
          >
            <Link className="hover:text-white hover:underline" href={`/event/${slug}/cart`}>
              Cart/
            </Link>
            <span className="text-white underline">Reservation</span>/Status
          </p>
        </div>
        <div className="grid grid-cols-6 md:grid-cols-12 pt-4 px-4 gap-8">
          <div className="col-span-6 bg-black/10 p-4 rounded-xl">
            <h2
              style={{ color: ` ${discoColors.navbarForeground}`, background: `${discoColors.bgNavbarColor}` }}
              className="text-3xl pb-2 rounded-lg pl-8 "
            >
              <span className="text-base">Total:</span> <br />$
              {cartItems.reduce(
                (acc, currentItem) => Number(currentItem.quantity) * Number(currentItem.price) + acc,
                0
              )}
            </h2>
            <div className="flex flex-col gap-4 py-4">
              {cartItems.map((item) => {
                return (
                  <div key={item.id} className="flex gap-4">
                    {item?.ticketImages?.[0]?.image && (
                      <Image src={item.ticketImages[0].image} alt={item.id} width={100} height={100} />
                    )}

                    <div
                      style={{ background: `${discoColors.bgNavbarColor}50` }}
                      className="flex flex-1 items-center justify-between gap-1 md:gap-4 p-2 md:p-4 rounded-xl"
                    >
                      <div
                        style={{ color: "black" }}
                        className="flex flex-col items-center bg-white px-2 pt-2 border-t border-b border-black border-dashed"
                      >
                        <div
                          style={{
                            color: `${discoColors.navbarForeground}`,
                            background: `${discoColors.bgNavbarColor}`,
                          }}
                          className="flex flex-col items-center p-1 rounded-md"
                        >
                          <p className="text-xs md:text-sm lg:text-base">{item.category}</p>
                          <p className="text-xs md:text-sm lg:text-base">TICKET</p>
                        </div>
                        <div className="border-b border-black border-dotted w-full py-1"></div>
                        <div
                          style={{
                            color: ` ${discoColors.navbarForeground}`,
                            background: `${discoColors.bgNavbarColor}`,
                          }}
                          className="flex flex-col items-center p-1 rounded-md my-2 text-xs w-full"
                        >
                          <p>{item.id.slice(0, 6)}</p>
                        </div>
                      </div>
                      <div
                        style={{ color: `${discoColors.navbarForeground}`, background: `${discoColors.bgNavbarColor}` }}
                        className="flex w-1/3 flex-col p-2 rounded-md"
                      >
                        <p className="md:text-lg">{item.category}</p>
                        <div
                          style={{ borderColor: discoColors.navbarForeground }}
                          className="border-b border-dotted w-full pt-1 text-xs md:text-sm lg:text-base"
                        ></div>
                        <p className="opacity-95 font-thin text-xs md:text-sm lg:text-base">Qty: {item.quantity}</p>
                      </div>
                      <div
                        style={{ color: `${discoColors.navbarForeground}`, background: `${discoColors.bgNavbarColor}` }}
                        className="flex flex-1 flex-col items-end p-2 rounded-md"
                      >
                        <p className="md:text-lg">${item.quantity * Number(item.price)}</p>
                        <div
                          style={{ borderColor: discoColors.navbarForeground }}
                          className="border-b border-dotted w-full pt-1"
                        ></div>
                        <p className="opacity-95 font-thin text-xs md:text-sm lg:text-base">${item.price} each</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <form
            onSubmit={handleSubmitReservation}
            className="flex flex-col gap-2 col-span-6 bg-black/10 p-4 rounded-xl"
          >
            <Button
              style={{ color: ` ${discoColors.navbarForeground}`, background: ` ${discoColors.bgNavbarColor}` }}
              className="hover:opacity-90"
              type="button"
            >
              <div className="flex items-center gap-2">Pay with link</div>
            </Button>
            <div className="text-center">Or Pay with Card</div>
            <div className="flex flex-col gap-6">
              <div className="relative">
                <Label name="email" htmlfor="email" />
                <Input placeholder="Email" type="email" className="text-md" />
              </div>

              <div className="relative">
                <div className="absolute z-10 right-4 flex justify-end gap-2">
                  <Image src="/paypal-icon.svg" alt="paypal card icon" width={40} height={20} />
                  <Image src="/mastercard-icon.svg" alt="mastercard icon" width={40} height={20} />
                  <Image src="/visa-icon.svg" alt="visa card icon" width={40} height={20} />
                </div>
                <div className="relative">
                  <Label name="card information" htmlfor="bankCard" />
                  <Input placeholder="Bank Card" className="text-md" />
                </div>
                <div className="grid gap-2 md:grid-cols-2 pt-1">
                  <Input placeholder="MM / YY" className="text-md" />
                  <Input placeholder="CVC" className="text-md" />
                </div>
              </div>
              <div className="relative">
                <Label name="Cardholder name" htmlfor="bankCard" />
                <Input placeholder="Full name of card" className="text-md" />
              </div>
              <div className="relative">
                <Label name="Country or region" htmlfor="bankCard" />
                <Input placeholder="Pakistan" className="text-md" />
              </div>
            </div>

            <Button
              style={{ color: ` ${discoColors.navbarForeground}`, background: ` ${discoColors.bgNavbarColor}` }}
              className="hover:opacity-90"
              type="submit"
            >
              <div className="flex items-center gap-2">
                Pay {isLoading && <Spinner diameter={4} stroke={"primary"} />}
              </div>
            </Button>
          </form>
        </div>
      </div>
    </EventLayout>
  );
};
export default Payment;
