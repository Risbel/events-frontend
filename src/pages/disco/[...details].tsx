import { LogoCategory } from "@/components/disco/DiscoTickets";
import HomeLayout from "@/components/layouts/HomeLayout";
import Spinner from "@/components/loaders/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDiscoTicketById } from "@/hooks/useGetDiscoTicketById";
import { useCart } from "@/store/useCart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const DiscoTicketDetails = () => {
  const router = useRouter();
  const { details } = router.query;
  let disco = details && details[0];
  let route = details && details[1];
  let idTicket = details && details[2];

  const { isLoading, data, isError, error } = useGetDiscoTicketById(idTicket);

  const { cartItems, addToCart, removeFromCart } = useCart();

  console.log(cartItems);

  const existItem = cartItems.find((item) => item.id === data?.id);
  const addToCartHandler = (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    const amount = Number(e.target.amount.value);
    const quantity = existItem ? existItem.quantity + amount : amount;

    if (data && data?.countInStock < quantity) {
      return;
    }

    return addToCart({ ...data, quantity });
  };

  if (isLoading) {
    return (
      <HomeLayout>
        <div className="flex gap-4 w-full h-screen justify-center items-center">
          <Spinner diameter={10} />
        </div>
      </HomeLayout>
    );
  }

  if (data && (disco !== data.Disco.slug || route !== "details-ticket" || !idTicket)) {
    return (
      <div className="flex gap-4 w-full h-screen justify-center items-center bg-black">
        <span className="text-white text-5xl font-semibold">404</span>
        <span className="text-white text-xl">Page not found</span>

        <Link href={`/disco/${disco}`}>
          <Button>Go back</Button>
        </Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex gap-4 w-full h-screen justify-center items-center bg-black">
        <span className="text-white text-5xl font-semibold">404</span>
        <span className="text-white text-xl">
          {error?.response?.status === 500 ? <span>This ticket does not exist</span> : error?.response?.data?.message}
        </span>

        <Link href={`/disco/${details[0]}`}>
          <Button>Go back</Button>
        </Link>
      </div>
    );
  }

  if (details) {
    return (
      <HomeLayout>
        <div className="flex flex-col gap-4 py-20  px-4 md:px-8">
          <Link href={`/disco/${data.Disco.slug}`}>
            <Button>Go back</Button>
          </Link>

          <div className="grid md:grid-cols-4">
            <div className="flex items-center justify-between bg-white/20 rounded-md  pl-2 pr-1 py-2 h-12">
              <h1 className="text-xl md:text-2xl text-white">
                Ticket <span className="bg-blue-700/80 rounded-full px-2">{data.category}</span>
              </h1>
              <LogoCategory category={data.category} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-white/10 to-transparent rounded-l-md">
            <h2 className="text-2xl text-white underline-offset-2 underline bg-gradient-to-r from-white/10 via-transparent to-transparent  rounded-l-md py-1 pl-2">
              Details:
            </h2>
            <div className="py-1 pl-2">
              <p className="text-md md:text-xl text-white font-thin">
                <span className="font-normal bg-black/20">Disco:</span> {data.Disco.name}
              </p>
              <p className="text-md md:text-xl text-white font-thin">
                <span className="font-normal bg-black/20">Price:</span> ${data.price}
              </p>
              <p className="text-md md:text-xl text-white font-thin">
                <span className="font-normal bg-black/20">Available ticket quantity:</span> {data.countInStock}
              </p>
              {data.description && (
                <p className="md:text-xl text-white font-thin mt-4">
                  <span className="font-normal bg-black/20">More:</span> {data.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row justify-start">
            <div>
              {data.ticketImages.map((ticketImage) => (
                <div className="flex items-center justify-center h-64 overflow-hidden rounded-xl" key={ticketImage.id}>
                  <Image src={ticketImage.image} alt={data.Disco.slug} height={300} width={300} />
                </div>
              ))}
            </div>
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
                      Add tickets here
                    </label>
                    <div className="flex items-center gap-2">
                      <Input defaultValue={1} min={1} type="number" name="amount" className="w-11 text-center" />
                      <LogoCategory category={data.category} />

                      <Button type="submit">Add to cart</Button>
                      <Button type="button" onClick={() => removeFromCart(data)}>
                        Discart
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex flex-col justify-center py-2 mt-2 p-2 rounded-md bg-gradient-to-r from-blue-700/30 to-transparent text-xs font-medium text-gray-200">
                <p>Reserved quantity: {existItem ? existItem?.quantity : 0} </p>
                <p>
                  Amount: <span className="text-lg">${existItem ? existItem.quantity * Number(data.price) : 0}</span>
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
