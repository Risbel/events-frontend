import { useGetCombosByDiscoId } from "@/hooks/useGetCombosByDiscoId";
import { Loader2 } from "lucide-react";
import EditCombo from "./EditCombo";
import DeleteCombo from "./DeleteCombo";
import Image from "next/image";

const CombosList = ({ discoId }: { discoId: string }) => {
  const { data: combos, isLoading } = useGetCombosByDiscoId(discoId);

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-8 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {combos?.map((combo) => {
        return (
          <div className="flex gap-4 items-end" key={combo.id}>
            <div>
              <p className="font-semibold text-2xl py-2 pl-2">
                Pack <span className="border-2 border-black px-2 rounded-full">{combo.category}</span>
              </p>

              {combo?.comboDetail?.image && (
                <div className="h-64 w-64">
                  <Image
                    className="rounded-2xl object-cover h-full"
                    loading="lazy"
                    src={combo.comboDetail.image}
                    alt="combo image"
                    width={200}
                    height={150}
                  />
                </div>
              )}
            </div>
            <div className="p-2 border border-black rounded-xl">
              <p className="font-semibold text-xl">Details</p>
              <p>{combo.comboDetail.description}</p>
              <p>Count in stock: {combo.countInStock}</p>
              <p>Price: $ {combo.price}</p>
              <p>Asociated with: {combo.ticketCombos.length} tickets</p>
            </div>
            <div className="flex">
              <EditCombo combo={combo} />
              <DeleteCombo combo={combo} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CombosList;
