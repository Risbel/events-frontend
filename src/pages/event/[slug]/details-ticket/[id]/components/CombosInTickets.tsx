import { useGetCombosByDiscoId } from "@/hooks/useGetCombosByDiscoId";
import AddCombosForm from "./AddCombosForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useCart from "@/store/useCart";
import { DataDisco } from "@/services/getDisco";
import { ShoppingCart, X } from "lucide-react";
import { IComboData } from "@/services/getDiscoTicketById";

const CombosInTicket = ({
  discoData,
  comboData,
  expDate,
}: {
  discoData: DataDisco;
  comboData: IComboData[];
  expDate: string;
}) => {
  const discoId = discoData?.id;
  const discoColors = discoData?.discoDetail?.discoColor;

  const { addToCart, cartItems, removeFromCart } = useCart();

  const addToCartHandler = (combo: IComboData) => {
    if (!combo) {
      return;
    }

    const existItem = cartItems.find((item) => item.id === combo?.comboId);
    const quantity = existItem ? Number(existItem.quantity) + 1 : 1;

    if (Number(combo.Combo.countInStock) < quantity) {
      return;
    }

    return addToCart({
      id: combo.comboId,
      discoId: discoId,
      comboId: combo.comboId,
      category: combo.Combo.category,
      price: combo.Combo.price,
      quantity,
      countInStock: combo.Combo.countInStock,
      comboDescription: combo.Combo.comboDetail.description,
      comboImage: combo.Combo.comboDetail.image,
      colaborator: localStorage.getItem("colaborator"),
      expDate,
    });
  };

  if (!discoColors || !comboData) {
    return;
  }

  return (
    <div className="flex gap-4 justify-center flex-wrap md:justify-between pb-24">
      {comboData &&
        comboData.map((combo) => (
          <div
            style={{ background: `${discoColors.bgNavbarColor}60` }}
            key={combo.id}
            className="rounded-3xl overflow-hidden shadow-md flex flex-col justify-between md:items-center md:flex-row gap-2 md:gap-8 relative"
          >
            {!combo.Combo.countInStock ? (
              <div className="h-full w-full bg-black/50 backdrop-blur-sm absolute z-20 flex justify-center items-center">
                <p className="text-2xl text-white">unavailable</p>
              </div>
            ) : null}
            <div className="p-4">
              <div className="flex flex-col gap-2">
                <div style={{ background: discoColors.bgNavbarColor }} className="p-2 rounded-md rounded-t-xl">
                  <p style={{ color: discoColors.navbarForeground }} className="font-semibold text-3xl">
                    <span className="text-base">Price:</span> <span className="font-bold">${combo.Combo.price}</span>
                  </p>
                  <p style={{ color: discoColors.navbarForeground }}>
                    <span>Quantity available: </span>
                    {Number(cartItems.find((com) => com.id == combo.id)?.quantity)
                      ? Number(combo.Combo.countInStock) - Number(cartItems.find((com) => com.id == combo.id)?.quantity)
                      : Number(combo.Combo.countInStock)}
                  </p>
                </div>

                <p
                  style={{ background: discoColors.navbarForeground, color: discoColors.bgNavbarColor }}
                  className="p-2 rounded-md leading-3"
                >
                  {combo.Combo.comboDetail.description}
                </p>

                <div
                  style={{ background: `${discoColors.bgNavbarColor}` }}
                  className="flex items-center gap-8 p-4 rounded-md rounded-b-xl shadow-md"
                >
                  <div>
                    <p className="text-xs md:text-base" style={{ color: discoColors.navbarForeground }}>
                      Reserved quantity: {cartItems.find((com) => com.id == combo.comboId)?.quantity ?? 0}
                    </p>
                    <p className="text-xs md:text-lg font-semibold" style={{ color: discoColors.navbarForeground }}>
                      Total:{" "}
                      <span>
                        ${(cartItems.find((com) => com.id == combo.comboId)?.quantity ?? 0) * Number(combo.Combo.price)}
                      </span>
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <p style={{ color: discoColors.navbarForeground }} className="text-xs font-semibold">
                      Add combos
                    </p>
                    <div className="flex  gap-4">
                      <Button
                        onClick={() => addToCartHandler(combo)}
                        style={{ color: discoColors.bgNavbarColor, background: discoColors.navbarForeground }}
                        className="text-xs px-3 h-8"
                      >
                        Add <ShoppingCart height={15} />
                      </Button>

                      {cartItems.find((com) => com.id == combo.comboId) && (
                        <button
                          type="button"
                          onClick={() => removeFromCart(combo.Combo)}
                          style={{ color: discoColors.navbarForeground }}
                        >
                          <X />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center relative p-4">
              <div
                style={{ color: discoColors.navbarForeground, background: `${discoColors.bgNavbarColor}90` }}
                className="absolute right-2 top-2 flex justify-center items-center h-8 w-8 rounded-full font-semibold"
              >
                <div>{cartItems.find((com) => com.id == combo.id)?.quantity ?? 0}</div>
              </div>
              <Image
                style={{ border: `solid 2px ${discoColors.bgNavbarColor}` }}
                className="object-cover rounded-2xl shadow-md"
                src={combo.Combo.comboDetail.image}
                alt="combo image"
                height={200}
                width={200}
              />
              <div className="absolute w-full flex justify-center -translate-y-4">
                <p
                  style={{
                    border: `solid 2px ${discoColors.bgNavbarColor}`,
                    color: discoColors.bgNavbarColor,
                    background: discoColors.navbarForeground,
                  }}
                  className="px-4 rounded-full text-xl"
                >
                  {combo.Combo.category}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CombosInTicket;
