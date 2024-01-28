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
      variant={"outline"}
      onClick={() => setIsActiveForm(false)}
      className="w-full px-4 py-2 leading-none font-medium bg-secondary focus:outline-none focus:shadow-outline"
    >
      {text}
    </Button>
  );
};

export default ButtomDiscart;
