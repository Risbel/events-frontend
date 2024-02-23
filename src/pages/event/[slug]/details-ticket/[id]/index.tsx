import EventLayout from "@/components/layouts/EventLayout";
import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDiscoTicketById } from "@/hooks/useGetDiscoTicketById";
import useCart from "@/store/useCart";
import { ChevronLeft, ShoppingCart, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Combos from "./components/combos";
import { useListMonths } from "@/hooks/useListMonths";

import NavbarEvent from "@/components/navigation/NavbarEvent";
import { useSession } from "next-auth/react";
import useGetDisco from "@/hooks/useGetDisco";
import { cn } from "@/lib/shadcnUtils";

const DiscoTicketDetails = () => {
  const months = useListMonths();
  const params = useParams();
  const slug = params && params.slug;
  const idTicket = params && params.id;

  const path = usePathname();

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });

  const { isLoading, data, isError, error: errorPage } = useGetDiscoTicketById(idTicket);

  const { cartItems, addToCart, removeFromCart } = useCart();

  const existItem = cartItems.find((item) => item.id === data?.id);

  const addToCartHandler = (e: any) => {
    e.preventDefault();

    if (!data) {
      return;
    }
    const amount = Number(e.target.amount.value);
    const quantity = existItem ? Number(existItem.quantity) + amount : amount;

    if (data && Number(data.countInStock) < quantity) {
      return;
    }

    return addToCart({ ...data, quantity });
  };
  if (isError) {
    return (
      <div className="flex gap-4 w-full h-screen justify-center items-center bg-black">
        <span className="text-white text-8xl font-semibold">404</span>
        <div className="flex flex-col gap-2">
          <span className="text-white text-xl">
            {errorPage?.response?.status === 500 ? <span>Page not found</span> : errorPage?.response?.data?.message}
          </span>

          <Link href={`/event/${slug}`}>
            <Button>Go back</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discoColors = discoData?.disco.discoDetail.discoColor;

  if (isLoading || !data || !discoData || !discoColors) {
    return (
      <EventLayout background={`#ffffff`}>
        <NavbarEvent />
        <div className="flex w-full h-screen justify-center items-center">
          <Spinner diameter={8} stroke={"#000000"} />
        </div>
      </EventLayout>
    );
  }

  if (true) {
    return (
      <EventLayout background={`${discoColors.bgNavbarColor}30`}>
        <NavbarEvent />
        <Link
          style={{ color: discoColors.navbarForeground, background: `${discoColors.bgNavbarColor}` }}
          className="fixed z-20 flex items-center left-0 top-8 bg-secondary rounded-r-3xl pr-2 md:pr-4 py-1 mt-8"
          href={`/event/${data.Disco.slug}`}
        >
          <ChevronLeft width={20} /> Go back
        </Link>

        <div className="flex flex-col gap-12 pt-32 px-4 lg:px-32">
          <div
            style={{ background: `${discoColors.bgNavbarColor}60` }}
            className="grid grid-cols-12 p-6 rounded-3xl w-full shadow-md"
          >
            <div
              style={{ background: `${discoColors.bgNavbarColor}` }}
              className="flex flex-col items-center justify-around col-span-12 md:col-span-4 lg:col-span-4 rounded-3xl relative shadow-md"
            >
              <div className="flex justify-center relative p-8">
                <Image
                  className="object-cover w-full h-full min-h-28 min-w-28 md:min-h-32 md:min-w-32 drop-shadow-2xl"
                  src="/ticket-base.svg"
                  alt="logo disco"
                  height={100}
                  width={100}
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-around p-12 lg:pb-10">
                  <div
                    style={{ background: `${discoColors.bgNavbarColor}` }}
                    className="flex flex-col justify-center items-center rounded-xl h-2/5 md:h-3/4 lg:h-2/5 "
                  >
                    <p
                      style={{ color: discoColors.navbarForeground }}
                      className="text-2xl md:text-xl lg:text-2xl text-center font-semibold"
                    >
                      {data.category}
                    </p>
                    <p style={{ color: discoColors.navbarForeground }} className="text-xl lg:text-2xl font-semibold">
                      TICKET
                    </p>
                  </div>
                  <p className="text-center text-4xl md:text-2xl lg:text-5xl font-semibold">${data.price}</p>

                  <div className="mx-6 md:mx-2 rounded-md p-1 border-2 border-black">
                    <p
                      style={{ background: `${discoColors.bgNavbarColor}`, color: discoColors.navbarForeground }}
                      className="text-center text-xs lg:text-base p-1 rounded-md"
                    >
                      {data.id.slice(0, 8)}
                    </p>
                  </div>
                </div>
                <p
                  style={{ color: discoColors.navbarForeground }}
                  className="absolute bottom-0 right-0 left-0 font-semibold text-xs md:text-sm text-center rounded-md py-2"
                >
                  {new Date(data.expDate).getDate()}-{months[new Date(data.expDate).getMonth()].slice(0, 3)}-
                  {new Date(data.expDate).getFullYear()}
                </p>
              </div>
            </div>
            <div
              className={cn(
                "hidden md:flex flex-col gap-2 md:col-span-8 px-8 py-2",
                data?.ticketImages?.[0]?.image && "md:col-span-5"
              )}
            >
              <div className="p-2 rounded-xl shadow-md" style={{ background: discoColors.navbarForeground }}>
                <p style={{ color: discoColors.bgNavbarColor }} className="font-extrabold text-start text-4xl">
                  {data.Disco.name}
                </p>
              </div>

              <div
                style={{ background: discoColors.bgNavbarColor }}
                className="flex items-center p-2 rounded-xl shadow-md"
              >
                <div>
                  <p style={{ color: discoColors.navbarForeground }} className="text-start text-md font-semibold">
                    Price: <span className="text-3xl">${data.price}</span>
                  </p>
                  <p style={{ color: discoColors.navbarForeground }} className="text-start font-semibold text-md">
                    Quantity available:
                    <span className="text-2xl pl-2">
                      {Number(data.countInStock) - (Number(existItem?.quantity) ? Number(existItem?.quantity) : 0)}
                    </span>
                  </p>
                </div>
              </div>
              <div style={{ background: discoColors.navbarForeground }} className="flex p-2 rounded-xl shadow-md">
                <p style={{ color: discoColors.bgNavbarColor }} className="text-start text-xl font-semibold">
                  {data.shortDescription}
                </p>
                <p style={{ color: discoColors.bgNavbarColor }} className="text-start text-xl font-semibold">
                  {data.largeDescription}
                </p>
              </div>

              <div
                style={{ color: discoColors.navbarForeground, background: discoColors.bgNavbarColor }}
                className="flex p-4 rounded-xl text-xs font-medium shadow-md"
              >
                <div>
                  <p>Reserved quantity: {existItem ? existItem?.quantity : 0} </p>
                  <p className="text-lg" style={{ color: discoColors.navbarForeground }}>
                    Total: <span>${existItem ? existItem.quantity * Number(data.price) : 0}</span>
                  </p>
                </div>

                <form className="flex-1 flex justify-center" onSubmit={addToCartHandler}>
                  <div className="flex flex-col">
                    <label
                      style={{ color: discoColors.navbarForeground }}
                      className="block mb-1 text-xs font-medium text-primary"
                      htmlFor="amount"
                    >
                      Add tickets
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        defaultValue={1}
                        min={1}
                        type="number"
                        name="amount"
                        className="w-11 text-center text-lg h-8 text-black rounded-lg"
                      />

                      <Button
                        style={{ color: discoColors.bgNavbarColor, background: discoColors.navbarForeground }}
                        className="text-xs px-3 h-8"
                        type="submit"
                      >
                        Add <ShoppingCart height={15} />
                      </Button>
                      {existItem && (
                        <button
                          style={{ color: discoColors.navbarForeground }}
                          type="button"
                          onClick={() => removeFromCart(data)}
                        >
                          <X />
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              className={cn(
                "hidden md:flex items-center justify-start lg:items-start col-span-3",
                !data?.ticketImages?.[0]?.image && "md:hidden"
              )}
            >
              <div className="lg:h-72 w-full flex justify-center items-center overflow-hidden rounded-3xl">
                {data?.ticketImages?.[0]?.image && (
                  <Image
                    className="object-cover rounded-2xl shadow-md"
                    src={`${data.ticketImages[0]?.image}`}
                    alt={data.shortDescription.slice(0, 12)}
                    width={300}
                    height={300}
                  />
                )}
              </div>
            </div>
          </div>
          {new Date(data.expDate).toLocaleString().slice(0, 9) === new Date().toLocaleString().slice(0, 9) && (
            <Combos discoData={discoData.disco} />
          )}
        </div>
      </EventLayout>
    );
  }
};

export default DiscoTicketDetails;
