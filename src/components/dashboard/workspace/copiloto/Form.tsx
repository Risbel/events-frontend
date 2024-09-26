import { AddDiscoSchema } from "../schemas/addDiscoSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-menubar";
import LabelColor from "../LabelColor";
import ColorPicker from "../ColorPicker";
import { useForm } from "react-hook-form";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

const Form = ({ values }: { values: AddDiscoSchema }) => {
  const { reset, register } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <form className="space-y-4">
          <div className="relative pb-2 ">
            <LabelColor htmlFor="brandColor" text="Color brand" />

            <ColorPicker
              reset={reset}
              register={register}
              id={"brandColor"}
              defaultValue="#0e0046"
              defaultColor={values.brandColor}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="additionalDetails" className="text-sm font-medium text-black">
              Tell us about your Event
            </label>
            <Textarea
              id="additionalDetails"
              placeholder="Any specific requirements or preferences?"
              className="min-h-[100px]"
            />
          </div>
          <Button
            type="button"
            onClick={() => setIsLoading((prev) => !prev)}
            disabled={isLoading}
            className="space-x-2 w-full bg-[hsl(215,25%,27%)] hover:bg-[hsl(215,25%,22%)] text-white"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div className="flex justify-center items-center gap-2">
                <span>Generate Event</span> <Sparkles />
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
