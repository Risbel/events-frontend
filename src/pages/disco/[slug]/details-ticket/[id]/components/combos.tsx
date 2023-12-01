import { useGetCombosByDiscoId } from "@/hooks/useGetCombosByDiscoId";
import AddCombosForm from "./AddCombosForm";

const Combos = ({ discoId }: { discoId: string }) => {
  const { data, isLoading } = useGetCombosByDiscoId(discoId);

  return (
    <div className="px-2 md:pl-0 md:pr-8">
      <h1 className="text-2xl text-white">Combos:</h1>

      <div>
        <AddCombosForm discoId={discoId} />
      </div>
    </div>
  );
};

export default Combos;
