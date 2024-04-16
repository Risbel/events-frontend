import { useEffect } from "react";

const GuestsInput = ({
  quantity,
  inputList,
  setInputList,
}: {
  quantity: number;
  inputList: any;
  setInputList: any;
}) => {
  useEffect(() => {
    setInputList((prevInputList: any) =>
      Array.from({ length: quantity - 1 }, (_, index) => ({
        ...prevInputList[index], // Preserve existing state if available
        firstName: prevInputList[index]?.firstName || "", // Initialize with existing value if available
        lastName: prevInputList[index]?.lastName || "", // Initialize with existing value if available
      }))
    );
  }, [quantity, setInputList]);

  const handleinputchange = ({ e, index }: { e: any; index: any }) => {
    const { name, value } = e.target;
    const list: any = [...inputList];

    list[index][name] = value;
    setInputList(list);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: quantity - 1 }, (_, index) => {
        return (
          <div key={index} className="border border-primary rounded-xl p-2 mb-2 bg-white">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col items-start">
                <label className="text-xs text-primary pl-2" htmlFor={`firstName${index}`}>
                  First name
                </label>
                <input
                  required
                  className="border pl-2 py-1 rounded-md w-full h-8 text-xs  text-[#383529] border-primary"
                  type="text"
                  name={`firstName`}
                  id={`firstName${index}`}
                  placeholder={"first name"}
                  onChange={(e) => handleinputchange({ e, index })}
                  autoComplete="name"
                  autoCapitalize="on"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="text-xs text-primary pl-2" htmlFor={`lastName${index}`}>
                  Last name
                </label>
                <input
                  required
                  className="border pl-2 py-1 rounded-md w-full h-8 text-xs  text-[#383529] border-primary"
                  type="text"
                  name={`lastName`}
                  id={`lastName${index}`}
                  placeholder={"last name"}
                  onChange={(e) => handleinputchange({ e, index })}
                  autoComplete="additional-name"
                  autoCapitalize="on"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GuestsInput;
