import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AddDiscoSchema } from "../../../pages/dashboard/workspace/components/AddDiscos";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, X } from "lucide-react";

const QuickLinks = ({ register, values, control }: { register: any; values: AddDiscoSchema; control: any }) => {
  const { fields, append, remove } = useFieldArray({
    name: "quickLinks",
    control,
  });

  return (
    <Dialog>
      <DialogTrigger className="w-full py-2 bg-gray-700 rounded-md text-white">Quick links</DialogTrigger>
      <DialogContent className="h-3/4 w-6/12">
        <DialogHeader>
          <DialogTitle className="text-center py-2">Quick links</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-8">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="w-full">
                <div className="flex gap-4 relative items-center w-full">
                  <Input
                    placeholder="Type a link name"
                    id="quickLinks"
                    type="text"
                    {...register(`quickLinks.${index}.name`)}
                    autoComplete="none"
                  />
                  <Input
                    placeholder="Type a valid link"
                    id="quickLinks"
                    type="text"
                    {...register(`quickLinks.${index}.url`)}
                    autoComplete="none"
                  />

                  {index >= 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      <X stroke="black" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex justify-end">
            <Button
              className="flex gap-2 justify-between rounded-lg pr-2 my-4 w-1/2 md:w-1/3"
              type="button"
              onClick={() => append({})}
            >
              Add link <PlusCircleIcon />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickLinks;
