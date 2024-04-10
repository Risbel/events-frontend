import NavbarEvent from "@/components/navigation/NavbarEvent";
import { Button } from "@/components/ui/button";
import useGetDisco from "@/hooks/useGetDisco";
import { useHandlePay } from "@/hooks/useHandlePay";
import { useListMonths } from "@/hooks/useListMonths";
import useCart, { ICart } from "@/store/useCart";
import clsx from "clsx";
import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const Cart = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });

  const months = useListMonths();
  const { cartItems, removeFromCart, addToCart } = useCart();

  const increment = (item: ICart) => {
    const quantity = item.quantity + 1;

    if (Number(item.countInStock) == Number(item.quantity)) {
      return;
    }

    return addToCart({ ...item, quantity });
  };

  const decrement = (item: ICart) => {
    const quantity = item.quantity - 1;

    if (Number(item.quantity) === 1) {
      return;
    }

    return addToCart({ ...item, quantity });
  };

  const { mutate, isLoading } = useHandlePay();

  const handleSubmitReservation = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userId && cartItems) {
      const payloadReservation = cartItems.map((item) => {
        return {
          discoTicketId: !item?.comboDetail?.id ? item.id : null,
          comboId: item?.comboDetail?.id ? item.id : null,
          quantity: item.quantity,
          discoId: item.discoId,
          category: item.category,
          imagesTicket: item?.ticketImages?.[0]?.image ? item?.ticketImages?.[0]?.image : null,
          imagesCombo: item?.comboDetail?.image ? item?.comboDetail?.image : null,
          comboDescription: item?.comboDetail?.description ? item?.comboDetail?.description : null,
          ticketDescription: item.shortDescription,
          price: item.price,
          discoSlug: item.Disco.slug,
        };
      });

      mutate({ userId, payloadReservation });
    }
  };

  if (!slug || !cartItems || !discoData) {
    return;
  }

  const discoColors = discoData?.disco.discoDetail.discoColor;

  return (
    <div className="h-screen relative z-0 text-center">
      <NavbarEvent />
      <Link
        style={{ background: discoColors.bgNavbarColor }}
        href={`/event/${slug}`}
        className="absolute z-20 flex items-center left-0 top-8 bg-secondary rounded-r-3xl pr-2 md:pr-4 py-1 mt-8"
      >
        <ChevronLeftIcon stroke={discoColors.navbarForeground} />
        <span className="hidden md:block" style={{ color: discoColors.navbarForeground }}>
          Go back
        </span>
      </Link>
      <div
        style={{ background: `${discoColors.bgNavbarColor}20` }}
        className="flex flex-col items-center gap-2 md:gap-4 h-screen overflow-y-scroll"
      >
        {cartItems.length > 0 && (
          <div className="flex justify-center mt-16">
            <p
              style={{
                color: ` ${discoColors.navbarForeground}`,
                background: `${discoColors.bgNavbarColor}`,
              }}
              className="text-center font-thin py-1 px-4 rounded-2xl text-xl"
            >
              <span className="underline underline-2 cursor-default">Cart</span>/
              <button onClick={() => handleSubmitReservation} className="hover:underline">
                Checkout
              </button>
            </p>
          </div>
        )}
        {!cartItems.length && (
          <h1 style={{ color: discoColors.bgNavbarColor }} className="text-xl md:text-2xl pt-20">
            Shopping cart empty.
          </h1>
        )}
        {cartItems.map((item) =>
          item.ticketImages ? (
            <div
              style={{ background: `${discoColors.bgNavbarColor}90` }}
              className="flex gap-6 rounded-3xl w-full shadow-md md:w-11/12 lg:w-9/12 p-6"
              key={item.id}
            >
              <div
                style={{ background: `${discoColors.bgNavbarColor}` }}
                className="flex flex-col justify-between rounded-2xl relative p-6"
              >
                <div className="flex flex-col gap-2 bg-white border-2 border-t-black border-b-black border-dashed">
                  <div
                    style={{ background: `${discoColors.bgNavbarColor}` }}
                    className="flex flex-col justify-center items-center rounded-xl p-4 mx-3 mt-3"
                  >
                    <p
                      style={{ color: discoColors.navbarForeground }}
                      className="text-center font-semibold md:leading-3"
                    >
                      {item.category}
                    </p>
                    <p style={{ color: discoColors.navbarForeground }} className="text-lg font-semibold">
                      TICKET
                    </p>
                  </div>
                  <p className="text-2xl font-bold">${item.price}</p>
                  <div className="border-t-2 border-black border-dotted"></div>
                  <div className="rounded-md p-1 m-3 md:p-0.5 border-2 border-dotted border-black">
                    <p
                      style={{ background: `${discoColors.bgNavbarColor}`, color: discoColors.navbarForeground }}
                      className="text-xs p-1 rounded-md"
                    >
                      {item.id.slice(0, 8)}
                    </p>
                  </div>
                </div>

                <p
                  style={{ color: discoColors.navbarForeground }}
                  className="absolute bottom-0 right-0 left-0 font-semibold text-xs text-center rounded-md py-2 md:py-1"
                >
                  {new Date(item.expDate).getDate()}-{months[new Date(item.expDate).getMonth()].slice(0, 3)}-
                  {new Date(item.expDate).getFullYear()}
                </p>
              </div>

              <div className="hidden md:flex flex-1 flex-col justify-around gap-4">
                <div
                  style={{ background: discoColors.bgNavbarColor }}
                  className="flex items-center gap-4 p-4 rounded-xl"
                >
                  <Image
                    className="rounded-full"
                    src={item.Disco.logo}
                    alt={`logo of ${item.Disco.name}`}
                    width={50}
                    height={50}
                  />
                  <p style={{ color: discoColors.navbarForeground }} className="font-extrabold text-start text-4xl">
                    {item.Disco.name} -
                  </p>
                  <p style={{ color: discoColors.navbarForeground }} className="font-extrabold text-start text-4xl">
                    {item.Disco.discoDetail.h1Banner}
                  </p>
                  <div className="flex-1 flex gap-4 justify-end">
                    <Button
                      size={"sm"}
                      className="bg-red-800 hover:bg-red-700 text-xs rounded-lg"
                      onClick={() => removeFromCart(item)}
                    >
                      Descart
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="flex-1 p-2 px-4 rounded-xl" style={{ background: discoColors.bgNavbarColor }}>
                    <p style={{ color: discoColors.navbarForeground }} className="text-start font-semibold text-xl">
                      Category: <span className="text-2xl">{item.category}</span>
                    </p>
                    <p style={{ color: discoColors.navbarForeground }} className="text-start text-xl font-semibold">
                      Price: ${item.price}
                    </p>
                  </div>
                  <div
                    style={{ background: discoColors.bgNavbarColor }}
                    className="flex justify-between items-center flex-1 p-2 px-4 rounded-xl"
                  >
                    <div>
                      <p style={{ color: discoColors.navbarForeground }} className="font-semibold text-xl text-start">
                        <span></span> {item.quantity} ticket{item.quantity > 1 && "s"} reserved
                      </p>
                      <div className="flex items-center">
                        <Button
                          style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
                          onClick={() => decrement(item)}
                          className="hover:opacity-95 opacity-90 text-xs font-bold h-6 w-6 px-1 rounded-r-none "
                        >
                          -
                        </Button>
                        <div
                          style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
                          className="text-center font-semibold w-5 h-6"
                        >
                          {item.quantity}
                        </div>
                        <Button
                          style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
                          onClick={() => increment(item)}
                          className="hover:opacity-95 opacity-90 text-xs font-bold h-6 w-6 px-1 rounded-l-none"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <Link
                      style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
                      className="flex items-center text-white font-semibold p-1 pr-4 rounded-md hover:opacity-90"
                      href={`/event/${item.Disco.slug}/details-ticket/${item.id}`}
                    >
                      <ChevronLeftIcon height={15} width={15} /> Back
                    </Link>
                  </div>
                </div>
                <div
                  style={{ background: discoColors.bgNavbarColor }}
                  className="flex items-center justify-center rounded-xl p-2"
                >
                  <p style={{ color: discoColors.navbarForeground }} className="font-semibold">
                    Subtotal: ${item.quantity * Number(item.price)}
                  </p>
                </div>
              </div>

              {item?.ticketImages?.[0]?.image && (
                <div className="hidden md:flex items-center lg:items-start col-span-3 py-4">
                  <div className="w-full flex justify-center items-center overflow-hidden rounded-3xl">
                    <Image
                      className="object-cover"
                      src={`${item.ticketImages[0]?.image}`}
                      alt={item.shortDescription.slice(0, 12)}
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{ background: `${discoColors.bgNavbarColor}90` }}
              className="flex gap-6 rounded-3xl w-full shadow-md md:w-11/12 lg:w-9/12 p-6"
              key={item.id}
            >
              <div style={{ background: `${discoColors.bgNavbarColor}` }} className="p-4 rounded-xl">
                <Image
                  className="object-cover rounded-2xl"
                  src={item.comboDetail.image}
                  width={150}
                  height={150}
                  alt="combo image"
                />
              </div>
              <div className="flex flex-col justify-between gap-4 w-full">
                <div className="flex gap-4 w-full justify-between">
                  <div
                    style={{ background: `${discoColors.bgNavbarColor}` }}
                    className="flex-1 flex flex-col p-4 rounded-xl"
                  >
                    <p style={{ color: discoColors.navbarForeground }} className="text-start text-xl font-semibold">
                      Category: {item.category}
                    </p>
                    <p style={{ color: discoColors.navbarForeground }} className="text-start text-xl font-semibold">
                      Price: ${item.price}
                    </p>
                  </div>
                  <div
                    style={{ background: `${discoColors.bgNavbarColor}` }}
                    className="flex-1 flex justify-between p-4 rounded-xl"
                  >
                    <div className="flex flex-col">
                      <p style={{ color: discoColors.navbarForeground }} className="text-start text-xl font-semibold">
                        Quantity reserved: {item.quantity}
                      </p>
                      <div className="flex items-center">
                        <Button
                          style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
                          onClick={() => decrement(item)}
                          className="hover:opacity-95 opacity-90 text-xs font-bold h-6 w-6 px-1 rounded-r-none "
                        >
                          -
                        </Button>
                        <div
                          style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
                          className="text-center font-semibold w-5 h-6"
                        >
                          {item.quantity}
                        </div>
                        <Button
                          style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
                          onClick={() => increment(item)}
                          className="hover:opacity-95 opacity-90 text-xs font-bold h-6 w-6 px-1 rounded-l-none"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <Button
                      size={"sm"}
                      className="bg-red-800 hover:bg-red-700 text-xs"
                      onClick={() => removeFromCart(item)}
                    >
                      Descart
                    </Button>
                  </div>
                </div>
                <div style={{ background: `${discoColors.bgNavbarColor}` }} className="p-2 rounded-xl">
                  <p style={{ color: discoColors.navbarForeground }} className="font-semibold rounded-full w-full">
                    Subtotal: ${Number(item.price) * Number(item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
        <div
          style={{ color: discoColors.navbarForeground, background: discoColors.bgNavbarColor }}
          className={clsx("w-full text-center mt-28 py-8", !cartItems.length && "hidden")}
        >
          <Button
            onClick={handleSubmitReservation}
            style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
            className="hover:opacity-90"
          >
            Reserve {isLoading && <Loader2 className="animate-spin" />}
          </Button>
          <p style={{ color: discoColors.navbarForeground }} className="text-xl my-4">
            Total: $
            <span className="font-semibold">
              {cartItems.reduce(
                (acc, currentItem) => Number(currentItem.quantity) * Number(currentItem.price) + acc,
                0
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
