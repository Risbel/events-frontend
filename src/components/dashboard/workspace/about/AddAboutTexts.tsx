import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/shadcnUtils";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";

import { AlignCenter, AlignJustifyIcon, AlignLeft, AlignRight, PlusCircleIcon, X } from "lucide-react";
import { Control, UseFormRegister, UseFormSetValue, useFieldArray } from "react-hook-form";

const AddAboutTexts = ({
  register,
  values,
  setValue,
  control,
}: {
  register: UseFormRegister<AddDiscoSchema>;
  values: AddDiscoSchema;
  setValue: UseFormSetValue<AddDiscoSchema>;
  control: Control<AddDiscoSchema>;
}) => {
  const { fields, append, remove } = useFieldArray({
    name: "aboutTexts",
    control,
  });

  const defaultAboutText = {
    title: "",
    titleColor: "#000000",
    titleAlign: "center" as "center",
    text: "",
    textAlign: "center" as "center",
    textColor: "#000000",
    textWeight: "normal",
  };

  return (
    <Dialog>
      <DialogTrigger className="text-center font-semibold text-sm px-2 py-2 bg-primary hover:opacity-90 text-primary-foreground rounded-lg w-full transition-colors">
        Add about texts
      </DialogTrigger>
      <DialogContent className="w-full md:w-11/12 h-5/6 md:h-3/4 p-4 md:p-8 overflow-hidden rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center">About texts</DialogTitle>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4">
          <X />
        </DialogClose>
        <div className="flex flex-col gap-4 h-full overflow-y-scroll my-4 w-full">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex flex-col gap-2 w-full md:px-16 lg:px-32 p-2 rounded-xl shadow-md bg-secondary"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center">
                  <Input
                    className="md:w-1/2"
                    placeholder="Title text"
                    id="aboutTexts"
                    type="text"
                    {...register(`aboutTexts.${index}.title`)}
                    autoComplete="none"
                  />
                  <div className="flex justify-around w-full md:w-1/2 md:justify-start md:gap-4">
                    <div className="flex relative justify-center items-center rounded-full overflow-hidden w-8 h-8 shadow-md shadow-primary">
                      <input
                        id="aboutTexts"
                        type="color"
                        {...register(`aboutTexts.${index}.titleColor`)}
                        className="absolute h-20 w-20"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-around">
                        <AlignCenter
                          className={cn(
                            "h-6 w-6",
                            values.aboutTexts[index].titleAlign == "center" &&
                              "p-1 shadow-md shadow-primary rounded-full"
                          )}
                        />
                        <AlignLeft
                          className={cn(
                            "h-6 w-6",
                            values.aboutTexts[index].titleAlign == "left" && "p-1 shadow-md shadow-primary rounded-full"
                          )}
                        />
                        <AlignRight
                          className={cn(
                            "h-6 w-6",
                            values.aboutTexts[index].titleAlign == "right" &&
                              "p-1 shadow-md shadow-primary rounded-full"
                          )}
                        />
                      </div>
                      <select
                        {...register(`aboutTexts.${index}.titleAlign`)}
                        className="border p-1 rounded-md border-black"
                      >
                        <option className="flex items-center" value="center">
                          Center
                        </option>
                        <option className="flex items-center" value="left">
                          Left
                        </option>
                        <option className="flex items-center" value="right">
                          right
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <Textarea
                    className="md:w-1/2"
                    placeholder="Type your text"
                    id="aboutTexts"
                    {...register(`aboutTexts.${index}.text`)}
                    autoComplete="none"
                  />
                  <div className="flex justify-around md:justify-start md:gap-4 w-full md:w-1/2">
                    <div className="flex relative justify-center items-center rounded-full overflow-hidden w-8 h-8 shadow-md shadow-primary">
                      <input
                        id="aboutTexts"
                        type="color"
                        {...register(`aboutTexts.${index}.textColor`)}
                        className="absolute h-20 w-20"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-around">
                        <AlignCenter
                          className={cn(
                            "h-6 w-6",
                            values.aboutTexts[index].textAlign == "center" &&
                              "p-1 shadow-md shadow-primary rounded-full"
                          )}
                        />
                        <AlignLeft
                          className={cn(
                            "h-6 w-6",
                            values.aboutTexts[index].textAlign == "left" && "p-1 shadow-md shadow-primary rounded-full"
                          )}
                        />
                        <AlignJustifyIcon
                          className={cn(
                            "h-6 w-6",
                            values.aboutTexts[index].textAlign == "justify" &&
                              "p-1 shadow-md shadow-primary rounded-full"
                          )}
                        />
                      </div>
                      <select
                        {...register(`aboutTexts.${index}.textAlign`)}
                        className="border p-1 rounded-md border-black"
                        defaultValue={values.aboutTexts[index].titleAlign}
                      >
                        <option className="flex items-center" value="center">
                          Center
                        </option>
                        <option className="flex items-center" value="left">
                          Left
                        </option>
                        <option className="flex items-center" value="justify">
                          Justify
                        </option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => setValue(`aboutTexts.${index}.textWeight`, "normal")}>
                        <p
                          className={cn(
                            "underline text-xl px-2",
                            values.aboutTexts[index].textWeight === "normal" &&
                              "border rounded-full shadow-md shadow-primary"
                          )}
                        >
                          a
                        </p>
                      </button>
                      <button onClick={() => setValue(`aboutTexts.${index}.textWeight`, "bold")}>
                        <p
                          className={cn(
                            "underline text-xl px-2 font-bold",
                            values.aboutTexts[index].textWeight === "bold" &&
                              "border rounded-full shadow-md shadow-primary"
                          )}
                        >
                          a
                        </p>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  {index >= 0 && (
                    <button className="mx-2" type="button" onClick={() => remove(index)}>
                      <X stroke="black" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex justify-center">
            <Button
              className="flex gap-2 justify-between rounded-lg pr-2 my-4 w-1/2 md:w-1/3"
              type="button"
              onClick={() => append(defaultAboutText)}
            >
              Add text <PlusCircleIcon />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAboutTexts;
