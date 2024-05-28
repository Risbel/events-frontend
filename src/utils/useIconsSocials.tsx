import { IconX } from "@/components/dashboard/workspace/IconX";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";
import { Facebook, Instagram, Youtube } from "lucide-react";

export const useIconsSocials = (values: AddDiscoSchema) => {
  return [
    {
      isChecked: values?.socials?.[0].url,
      link: (
        <a target="_blank" rel="noopener noreferrer" href={`${values?.socials?.[0].url}`}>
          <Facebook height={30} width={30} stroke={values.foregroundFooterColor} />
        </a>
      ),
    },
    {
      isChecked: values?.socials?.[1].url,
      link: (
        <a target="_blank" rel="noopener noreferrer" href={`${values?.socials?.[1].url}`}>
          <Instagram stroke={values.foregroundFooterColor} />
        </a>
      ),
    },
    {
      isChecked: values?.socials?.[2].url,
      link: (
        <a target="_blank" rel="noopener noreferrer" href={`${values?.socials?.[2].url}`}>
          <Youtube height={30} width={30} stroke={values.foregroundFooterColor} />
        </a>
      ),
    },
    {
      isChecked: values?.socials?.[3].url,
      link: (
        <a target="_blank" rel="noopener noreferrer" href={`${values?.socials?.[3].url}`}>
          <IconX fill={values.foregroundFooterColor} />
        </a>
      ),
    },
  ];
};
