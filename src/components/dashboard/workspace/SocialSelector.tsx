import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, Facebook, Instagram, X, Youtube } from "lucide-react";
import { AddDiscoSchema } from "../../../pages/dashboard/workspace/components/AddDiscos";
import { cn } from "@/lib/shadcnUtils";
import { IconX } from "@/components/event/sections/IconX";

const SocialSelector = ({ register, values }: { register: any; values: AddDiscoSchema }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full py-2 bg-gray-700 rounded-md text-white">Social</DialogTrigger>
      <DialogContent className="h-3/4 w-6/12">
        <DialogHeader>
          <DialogTitle className="text-center py-2">Social networks</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-8">
          <div className="flex gap-2 items-center">
            <Facebook height={30} width={30} />
            <Input {...register("socials.0.url")} placeholder="type a valid facebook url and test it on the preview" />
            <X className={cn("stroke-gray-800", values?.socials?.[0]?.url ? "hidden" : "block")} />
            <Check stroke="green" className={cn(values?.socials?.[0]?.url ? "block" : "hidden")} />
          </div>
          <div className="flex gap-2 items-center">
            <Instagram height={30} width={30} />
            <Input {...register("socials.1.url")} placeholder="type a valid instagram url and test it on the preview" />
            <X className={cn("stroke-gray-800", values?.socials?.[1]?.url ? "hidden" : "block")} />
            <Check stroke="green" className={cn(values?.socials?.[1]?.url ? "block" : "hidden")} />
          </div>
          <div className="flex gap-2 items-center">
            <Youtube height={30} width={30} />
            <Input {...register("socials.2.url")} placeholder="type a valid youtube url and test it on the preview" />
            <X className={cn("stroke-gray-800", values?.socials?.[2]?.url ? "hidden" : "block")} />
            <Check stroke="green" className={cn(values?.socials?.[2]?.url ? "block" : "hidden")} />
          </div>
          <div className="flex gap-2 items-center">
            <IconX />
            <Input {...register("socials.3.url")} placeholder="type a valid X url and test it on preview" />
            <X className={cn("stroke-gray-800", values?.socials?.[3]?.url ? "hidden" : "block")} />
            <Check stroke="green" className={cn(values?.socials?.[3]?.url ? "block" : "hidden")} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialSelector;
