import { Input } from "@/components/ui/input";

const SearchReservationsBar = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  };

  return (
    <div className="flex justify-center mb-2">
      <div>
        <Input
          placeholder="Search sales by name"
          autoComplete="off"
          className="h-7 pl-2 bg-white/10 text-white"
          id="searchReservations"
          type="text"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchReservationsBar;
