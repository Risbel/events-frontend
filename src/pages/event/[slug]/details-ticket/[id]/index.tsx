import { LogoCategory } from "@/components/disco/DiscoTickets";
import EventLayout from "@/components/layouts/EventLayout";
import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDiscoTicketById } from "@/hooks/useGetDiscoTicketById";
import useCart from "@/store/useCart";
import { ChevronLeft, ShoppingCart } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Combos from "./components/combos";
import { useListMonths } from "@/hooks/useListMonths";

import NavbarEvent from "@/components/navigation/NavbarEvent";

const DiscoTicketDetails = () => {
  const months = useListMonths();
  const params = useParams();
  const slug = params && params.slug;
  const idTicket = params && params.id;

  const { isLoading, data, isError, error } = useGetDiscoTicketById(idTicket);

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
            {error?.response?.status === 500 ? <span>Page not found</span> : error?.response?.data?.message}
          </span>

          <Link href={`/event/${slug}`}>
            <Button>Go back</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <EventLayout>
        <div className="flex gap-4 bg-primary w-full h-screen justify-center items-center">
          <Spinner diameter={8} stroke={"white"} />
        </div>
      </EventLayout>
    );
  }

  if (data) {
    return (
      <EventLayout>
        <NavbarEvent />
        <div className="grid grid-flow-row  md:grid-flow-col md:grid-cols-2 py-16 h-screen">
          <div className="flex w-full flex-col gap-4 px-2 md:px-8">
            <Link
              className="flex items-center pr-2 rounded-md border bg-primary text-primary-foreground w-fit"
              href={`/event/${data.Disco.slug}`}
            >
              <ChevronLeft width={20} /> Go back
            </Link>

            <div className="flex gap-4 items-center bg-primary to-primary-70 rounded-md pl-2">
              <h1 className="text-xl md:text-2xl text-white">
                Tickets <span className="bg-blue-700/80 rounded-full px-2 text-lg">{data.category}</span>
              </h1>
            </div>

            <div className="bg-gradient-to-r bg-primary rounded-md">
              <h2 className="text-xl text-white underline-offset-2 underline  via-transparent to-transparent  rounded-l-md py-1 pl-2">
                Details:
              </h2>
              <div className="py-1 pl-2">
                <p className="text-white text-sm text-start">
                  <span className="font-normal bg-primary">Tu use on:</span> {new Date(data.expDate).getDate()}/
                  {months[new Date(data.expDate).getMonth()]}/{new Date(data.expDate).getFullYear()}
                </p>

                <p className="text-md md:text-xl text-white font-thin">
                  <span className="font-normal bg-primary">Disco:</span> {data.Disco.name}
                </p>
                <p className="text-md md:text-xl text-white font-semibold">
                  <span className="font-normal bg-primary">Price:</span> {data.price} cup
                  <span className="font-light pl-1">c/u</span>
                </p>
                <p className="text-md md:text-xl text-white font-thin">
                  <span className="font-normal bg-primary">Available ticket quantity:</span> {data.countInStock}
                </p>
                {data.largeDescription && (
                  <p className="md:text-md text-white font-light mt-4">
                    <span className="text-md md:text-xl bg-primary mr-2">More:</span>
                    {data.largeDescription}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-start">
              {data?.ticketImages[0]?.image &&
                data.ticketImages.map((ticketImage) => (
                  <div className="flex items-center overflow-hidden rounded-xl" key={ticketImage.id}>
                    <Image src={ticketImage.image} alt={data.Disco.slug} height={300} width={300} />
                  </div>
                ))}

              <div className="md:col-start-3 flex flex-col">
                <div className="flex flex-col gap-4">
                  <div className="p-2 rounded-md bg-primary">
                    <p className="flex items-center gap-2 text-xs font-medium text-primary-foreground">
                      Tickets available:
                      <span className="text-lg">
                        {existItem ? Number(data.countInStock) - existItem.quantity : Number(data.countInStock)}
                      </span>
                    </p>
                  </div>

                  <form onSubmit={addToCartHandler}>
                    <div className="flex flex-col">
                      <label className="block mb-1 text-xs font-medium text-primary" htmlFor="addTickets">
                        Add tickets to shopping cart
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          defaultValue={1}
                          min={1}
                          type="number"
                          name="amount"
                          className="w-11 text-center text-lg h-8"
                        />

                        <Button className="text-xs px-3 h-8" type="submit">
                          Add <ShoppingCart height={15} />
                        </Button>
                        {existItem && (
                          <Button
                            className="text-xs px-3 h-8 bg-yellow-600 hover:bg-yellow-500/80"
                            type="button"
                            onClick={() => removeFromCart(data)}
                          >
                            Discart
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex flex-col justify-center py-2 mt-2 p-2 rounded-md bg-primary text-xs font-medium text-primary-foreground">
                  <p>Reserved quantity: {existItem ? existItem?.quantity : 0} </p>
                  <p>
                    Total: <span className="text-lg">${existItem ? existItem.quantity * Number(data.price) : 0}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {new Date(data.expDate).toLocaleString().slice(0, 9) === new Date().toLocaleString().slice(0, 9) && (
            <div className="col-span-2">
              <Combos discoId={data.discoId} />
            </div>
          )}
        </div>
      </EventLayout>
    );
  }
};

export default DiscoTicketDetails;
