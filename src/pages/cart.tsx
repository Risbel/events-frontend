import { LogoCategory } from "@/components/disco/DiscoTickets";
import HomeLayout from "@/components/layouts/HomeLayout";
import { Button } from "@/components/ui/button";
import useCart, { ICart } from "@/store/useCart";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
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
    <HomeLayout>
      <div className="pt-20 px-4 md:px-8">
        {cartItems.length === 0 ? (
          <h1 className="text-white text-2xl font-semibold pb-2">The shopping cart is empty</h1>
        ) : (
          <h1 className="text-white text-2xl font-semibold pb-2">Tickets and combos in cart</h1>
        )}

        <div className="grid md:grid-cols-4 gap-2 md:gap-4">
          {cartItems.map((item) => (
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
              <div className="flex flex-col gap-2 p-2">
                <div className="flex items-center justify-between gap-2">
                  <LogoCategory category={item.category} />
                  <div className="flex flex-col leading-tight">
                    <p className="text-sm font-thin text-white">
                      Disco: <span className="font-semibold">{item.Disco.name}</span>
                    </p>
                    <p className="text-sm font-thin text-white">
                      Category: <span className="font-semibold">{item.category}</span>
                    </p>
                    <p className="text-sm font-thin text-white">
                      Price: <span className="font-semibold">${item.price}</span>
                    </p>
                  </div>
                  <div className="flex h-full items-start">
                    <Link
                      className="text-white font-thin bg-blue-900/80 hover:bg-blue-800  px-1 rounded-md"
                      href={`/disco/${item.Disco.slug}/details-ticket/${item.id}`}
                    >
                      Back
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-white">
                    <span className="font-thin"></span> {item.quantity} tickets reserved
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
                      className="bg-red-800 hover:bg-red-700 text-xs h-6 px-1"
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
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Cart;
