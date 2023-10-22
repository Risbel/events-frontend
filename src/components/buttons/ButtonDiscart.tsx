import { Button } from "../ui/button";

const ButtomDiscart = ({
  text,
  setIsActiveForm,
}: {
  text: string;
  setIsActiveForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Button
      onClick={() => setIsActiveForm(false)}
      className="w-full px-4 py-2 leading-none font-medium text-white bg-yellow-600 hover:bg-yellow-500/80  rounded-full focus:outline-none focus:shadow-outline"
    >
      {text}
    </Button>
  );
};

export default ButtomDiscart;
