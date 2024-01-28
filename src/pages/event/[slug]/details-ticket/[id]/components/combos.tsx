import { useGetCombosByDiscoId } from "@/hooks/useGetCombosByDiscoId";
import AddCombosForm from "./AddCombosForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useCart from "@/store/useCart";

const Combos = ({ discoId }: { discoId: string }) => {
  const { data, isLoading } = useGetCombosByDiscoId(discoId);

  const { addToCart, cartItems, removeFromCart } = useCart();

  const addToCartHandler = (combo: any) => {
    if (!combo) {
      return;
    }
    const existItem = cartItems.find((item) => item.id === combo?.id);
    const quantity = existItem ? Number(existItem.quantity) + 1 : 1;

    if (Number(combo.countInStock) < quantity) {
      return;
    }

    return addToCart({ ...combo, quantity });
  };

  return (
    <div className="px-4 md:pl-0 md:pr-8">
      <h1 className="text-2xl text-white">Offers:</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 my-4 gap-4">
        {data &&
          data.map((combo) => (
            <div
              key={combo.id}
              className="border rounded-lg bg-gradient-to-tr from-purple-950/40 via-black/10 to-purple-950/40"
            >
              <div className="relative flex justify-center items-center h-36 overflow-hidden rounded-t-md bg-black">
                <div className="flex justify-center items-center absolute  h-6 w-6 top-2 right-2 rounded-full bg-black/50 font-semibold text-white text-xs">
                  <div>{cartItems.find((com) => com.id == combo.id)?.quantity}</div>
                </div>
                <Image
                  className="object-cover"
                  src={combo.comboDetail.image}
                  alt="combo image"
                  height={200}
                  width={400}
                />
              </div>

              <div className="relative flex justify-center">
                <p className="absolute -translate-y-3 text-white px-2 bg-blue-700 rounded-full">{combo.category}</p>
              </div>
              <div className="flex flex-col rounded-b-lg p-2 pt-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-white font-semibold">
                      <span className="bg-black/20 font-thin">Price:</span>{" "}
                      <span className="font-bold">{combo.price} cup</span>
                    </p>
                    <p className="text-white">
                      <span className="bg-black/20 font-thin">Quantity available: </span>
                      {Number(cartItems.find((com) => com.id == combo.id)?.quantity)
                        ? Number(combo.countInStock) - Number(cartItems.find((com) => com.id == combo.id)?.quantity)
                        : Number(combo.countInStock)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Button onClick={() => addToCartHandler(combo)} className="h-6 px-2 text-xs">
                      Add 🛒
                    </Button>

                    {cartItems.find((com) => com.id == combo.id) && (
                      <Button
                        onClick={() => removeFromCart(combo)}
                        className="h-6 px-2 text-xs bg-yellow-600/90 hover:bg-yellow-600"
                      >
                        discart
                      </Button>
                    )}
                  </div>
                </div>

                <div className="py-2">
                  <p className="text-white text-xs font-thin leading-none">{combo.comboDetail.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-8">
        <AddCombosForm discoId={discoId} />
      </div>
    </div>
  );
};

export default Combos;
