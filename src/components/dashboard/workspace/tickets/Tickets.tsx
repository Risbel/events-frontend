import { Input, Label } from "@/components/ui/input";
import { AddDiscoSchema } from "../schemas/addDiscoSchema";
import { FieldErrors, UseFormRegister, UseFormReset } from "react-hook-form";
import LabelColor from "../LabelColor";
import ColorPicker from "../ColorPicker";

const Tickets = ({
  register,
  errors,
  reset,
  values,
}: {
  register: UseFormRegister<AddDiscoSchema>;
  errors: FieldErrors<AddDiscoSchema>;
  reset: UseFormReset<AddDiscoSchema>;
  values: AddDiscoSchema;
}) => {
  return (
    <div className="w-full p-4 md:p-6 bg-primary-foreground rounded-md shadow-md">
      <p className="text-xl text-center font-bold text-primary mb-4">Tickets</p>
      <div className="flex flex-col gap-2 pb-4">
        <div className="relative">
          <Label name={"Title text"} htmlfor={"titleTextTickets"} className="block mb-1 font-medium text-primary" />

          <Input
            className="w-full py-2 pl-2 text-sm leading-tight text-primary rounded appearance-none focus:outline-none focus:shadow-outline"
            id="titleTextTickets"
            placeholder="Title text"
            {...register("titleTextTickets")}
          />
          {errors.titleTextTickets && <p className="text-xs italic text-red-500">{errors.titleTextTickets?.message}</p>}
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="relative">
              <LabelColor htmlFor="bgTicketsSection" text="Background color" />
              <ColorPicker
                reset={reset}
                defaultValue="#ffffff"
                id={"bgTicketsSection"}
                register={register}
                defaultColor={values.bgTicketsSection}
              />
              {errors.bgTicketsSection && (
                <p className="text-xs italic text-red-500">{errors.bgTicketsSection?.message}</p>
              )}
            </div>
            <div className="relative">
              <LabelColor htmlFor="ticketH1Color" text="Title section color" />
              <ColorPicker
                reset={reset}
                defaultValue="#0b023d"
                register={register}
                id="ticketH1Color"
                defaultColor={values.ticketH1Color}
              />
              {errors.ticketH1Color && <p className="text-xs italic text-red-500">{errors.ticketH1Color?.message}</p>}
            </div>
          </div>

          <div className="w-1/2">
            <div className="relative">
              <LabelColor htmlFor="buttonsTicketsColor" text="Buttons color" />
              <ColorPicker
                reset={reset}
                defaultValue="#0e0046"
                register={register}
                id={"buttonsTicketsColor"}
                defaultColor={values.buttonsTicketsColor}
              />

              {errors.buttonsTicketsColor && (
                <p className="text-xs italic text-red-500">{errors.buttonsTicketsColor?.message}</p>
              )}
            </div>
            <div className="relative">
              <LabelColor htmlFor="buttonTicketForeground" text="Buttons foreground" />
              <ColorPicker
                reset={reset}
                defaultValue="#ffffff"
                register={register}
                id={"buttonTicketForeground"}
                defaultColor={values.buttonTicketForeground}
              />
              {errors.buttonTicketForeground && (
                <p className="text-xs italic text-red-500">{errors.buttonTicketForeground?.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
