import { LogoCategory } from "@/components/disco/DiscoTickets";
import HomeLayout from "@/components/layouts/HomeLayout";
import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDiscoTicketById } from "@/hooks/useGetDiscoTicketById";
import useCart from "@/store/useCart";
import { ChevronLeft } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent } from "react";

const DiscoTicketDetails = () => {
  const params = useParams();
  const slug = params && params.slug;
  const idTicket = params && params.id;

  const { isLoading, data, isError, error } = useGetDiscoTicketById(idTicket);

  const { cartItems, addToCart, removeFromCart } = useCart();

  const existItem = cartItems.find((item) => item.id === data?.id);

  const addToCartHandler = (e: FormEvent<HTMLFormElement> | any) => {
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

          <Link href={`/disco/${slug}`}>
            <Button>Go back</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <HomeLayout>
        <div className="flex gap-4 w-full h-screen justify-center items-center">
          <Spinner diameter={8} />
        </div>
      </HomeLayout>
    );
  }

  if (data) {
    return (
      <HomeLayout>
        <div className="flex flex-col gap-4 py-20  px-4 md:px-8">
          <Link
            className="flex items-center pr-2 rounded-md border hover:bg-white/20 text-white w-fit"
            href={`/disco/${data.Disco.slug}`}
          >
            <ChevronLeft width={20} /> Go back
          </Link>

          <div className="grid md:grid-cols-4">
            <div className="flex items-center justify-between bg-gradient-to-r from-white/20 to-transparent rounded-md  pl-2 pr-1 py-2 h-12">
              <h1 className="text-xl md:text-2xl text-white">
                Tickets <span className="bg-blue-700/80 rounded-full px-2 text-lg">{data.category}</span>
              </h1>
              <LogoCategory category={data.category} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-white/10 to-transparent rounded-l-md">
            <h2 className="text-xl text-white underline-offset-2 underline bg-gradient-to-r from-white/10 via-transparent to-transparent  rounded-l-md py-1 pl-2">
              Details:
            </h2>
            <div className="py-1 pl-2">
              <p className="text-md md:text-xl text-white font-thin">
                <span className="font-normal bg-black/20">Disco:</span> {data.Disco.name}
              </p>
              <p className="text-md md:text-xl text-white font-semibold">
                <span className="font-normal bg-black/20">Price:</span> $ {data.price}
                <span className="font-light pl-1">c/u</span>
              </p>
              <p className="text-md md:text-xl text-white font-thin">
                <span className="font-normal bg-black/20">Available ticket quantity:</span> {data.countInStock}
              </p>
              {data.largeDescription && (
                <p className="md:text-md text-white font-light mt-4">
                  <span className="text-md md:text-xl bg-black/20 mr-2">More:</span>
                  {data.largeDescription}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row justify-start">
            {data?.ticketImages[0]?.image &&
              data.ticketImages.map((ticketImage) => (
                <div className="flex items-center justify-center h-64 overflow-hidden rounded-xl" key={ticketImage.id}>
                  <Image src={ticketImage.image} alt={data.Disco.slug} height={300} width={300} />
                </div>
              ))}

            <div className="md:col-start-3 flex flex-col">
              <div className="flex flex-col gap-4">
                <div className="p-2 rounded-md bg-gradient-to-r from-blue-700/30 to-transparent">
                  <p className="flex items-center gap-2 text-xs font-medium text-gray-200">
                    Tickets available:
                    <span className="text-lg">
                      {existItem ? Number(data.countInStock) - existItem.quantity : Number(data.countInStock)}
                    </span>
                  </p>
                </div>

                <form onSubmit={addToCartHandler}>
                  <div className="flex flex-col">
                    <label className="block mb-1 text-xs font-medium text-gray-200" htmlFor="addTickets">
                      Add tickets to shopping cart
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        defaultValue={1}
                        min={1}
                        type="number"
                        name="amount"
                        className="w-11 text-center text-lg"
                      />
                      <LogoCategory category={data.category} />

                      <Button className="text-xs px-3" type="submit">
                        Add 🛒
                      </Button>
                      {existItem && (
                        <Button
                          className="text-xs px-3 bg-yellow-600 hover:bg-yellow-500/80"
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
              <div className="flex flex-col justify-center py-2 mt-2 p-2 rounded-md bg-gradient-to-r from-blue-700/30 to-transparent text-xs font-medium text-gray-200">
                <p>Reserved quantity: {existItem ? existItem?.quantity : 0} </p>
                <p>
                  Total: <span className="text-lg">${existItem ? existItem.quantity * Number(data.price) : 0}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    );
  }
};

export default DiscoTicketDetails;
