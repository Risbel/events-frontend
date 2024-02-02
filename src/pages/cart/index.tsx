import { LogoCategory } from "@/components/disco/DiscoTickets";

import { Button } from "@/components/ui/button";
import { useListMonths } from "@/hooks/useListMonths";
import useCart, { ICart } from "@/store/useCart";
import clsx from "clsx";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
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

  return (
    <div className="h-screen relative z-0 text-center px-4 md:px-8 bg-primary">
      {cartItems.length > 0 && (
        <p className="text-center text-slate-400 font-thin pt-16 pb-4 text-xl">
          <span className="text-white underline underline-2">Cart</span>/
          <Link className="hover:text-white hover:underline underline-2" href={"/cart/payment"}>
            Reservation
          </Link>
          /Status
        </p>
      )}
      {!cartItems.length && <h1 className="text-white text-xl md:text-2xl pt-20">The shopping cart is empty</h1>}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {cartItems.map((item) =>
          item.ticketImages ? (
            <div
              key={item.id}
              className="flex flex-col relative overflow-hidden bg-gradient-to-tr from-blue-800/70 via-black/80 to-purple-900/80 rounded-md  border border-t-white"
            >
              <Image
                className="absolute -z-10 right-0 object-cover rounded-full opacity-60"
                src={`${item.Disco.logo}`}
                alt="logo disco"
                height={400}
                width={400}
              />
              <p className="text-gray-300 text-xs text-start p-1">
                📆 {new Date(item.expDate).getDate()}-{months[new Date(item.expDate).getMonth()]}-
                {new Date(item.expDate).getFullYear()}
              </p>
              <div className="flex flex-col gap-2 p-2 pt-0">
                <div className="flex items-center justify-between gap-2">
                  <table className="-translate-x-2">
                    <tbody>
                      <tr className="text-sm font-thin text-white">
                        <td className="pr-1 text-right">Disco: </td>
                        <td>
                          <span className="font-semibold">{item.Disco.name}</span>
                        </td>
                      </tr>

                      <tr className="text-sm font-thin text-white">
                        <td className="pr-1 text-right">Category: </td>
                        <td>
                          <span className="font-semibold">{item.category}</span>
                        </td>
                      </tr>

                      <tr className="text-sm font-thin text-white">
                        <td className="pr-1 text-right">Price: </td>
                        <td>
                          <span className="font-semibold">${item.price}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex h-full items-start">
                    <Link
                      className="flex items-center text-white font-thin bg-blue-900/80 hover:bg-blue-800 pr-1 rounded-md"
                      href={`/event/${item.Disco.slug}/details-ticket/${item.id}`}
                    >
                      <ChevronLeftIcon height={15} width={15} /> Back
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-white">
                    <span className="font-thin"></span> {item.quantity} ticket{item.quantity > 1 && "s"}
                  </p>

                  <div className="flex items-center justify-around w-full gap-2">
                    <div className="flex items-center">
                      <Button
                        onClick={() => decrement(item)}
                        className="text-xs font-bold h-6 w-6 px-1 rounded-r-none "
                      >
                        -
                      </Button>
                      <div className="text-center font-semibold w-5 h-6 bg-white">{item.quantity}</div>
                      <Button onClick={() => increment(item)} className="text-xs font-bold h-6 w-6 px-1 rounded-l-none">
                        +
                      </Button>
                    </div>
                    <Button
                      size={"sm"}
                      className="bg-red-800 hover:bg-red-700 text-xs h-7 px-1"
                      onClick={() => removeFromCart(item)}
                    >
                      Descart
                    </Button>
                  </div>
                </div>
                <p className="text-white text-center bg-black rounded-full">
                  <span className="font-thin">Amount:</span> ${Number(item.price) * Number(item.quantity)}
                </p>
              </div>
            </div>
          ) : (
            <div key={item.id}>
              <div className="overflow-hidden relative rounded-lg border">
                <div className="flex items-center justify-center w-full overflow-hidden h-32">
                  <Image
                    className="object-cover"
                    src={item.comboDetail.image}
                    width={350}
                    height={175}
                    alt="combo image"
                  />
                </div>

                <div className="flex flex-col items-start p-2 bg-gradient-to-bl from-black/90 via-purple-950/70 to-black/10">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col items-start">
                      <p className="text-white text-sm font-light leading-4">
                        Category: <span className="font-semibold">{item.category}</span>{" "}
                      </p>
                      <p className="text-white text-sm font-light leading-4">
                        Price: <span className="font-semibold">{item.price}</span> cup c/u
                      </p>
                      <p className="text-white text-sm font-light leading-4">
                        Quantity: <span className="font-semibold">{item.quantity}</span>{" "}
                      </p>
                    </div>
                    <Button
                      size={"sm"}
                      className="bg-red-800 hover:bg-red-700 text-xs h-7 px-1"
                      onClick={() => removeFromCart(item)}
                    >
                      Descart
                    </Button>
                  </div>
                  <p className="text-white text-center bg-black rounded-full w-full mt-2">
                    <span className="font-thin">Amount:</span> ${Number(item.price) * Number(item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className={clsx("w-full text-center mt-28 mb-8", !cartItems.length && "hidden")}>
        <Button className="shadow-xl hover:shadow-blue-400/40 hover:border-b hover:bg-violet-700 transition-shadow duration-300">
          <Link href={"/cart/payment"}> Make Reservation</Link>
        </Button>
        <p className="text-white text-xl font-thin my-4">
          Total to pay: $
          <span className="font-semibold">
            {cartItems.reduce((acc, currentItem) => Number(currentItem.quantity) * Number(currentItem.price) + acc, 0)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Cart;
