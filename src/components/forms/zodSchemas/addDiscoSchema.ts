import { z } from "zod";

export const addDiscoSchema = z.object({
  name: z.string().min(1, { message: "The name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  bannerImage: z.string().min(1, { message: "Banner URL image required" }),
  h1Color: z.string().min(1, { message: "Text h1 color required" }),
  h2Color: z.string().min(1, { message: "Text h2 color required" }),
  brandColor: z.string().min(1, { message: "Brand color required" }),
  secondaryColor: z.string().min(1, { message: "Secondary color required" }),
  bgColor: z.string().min(1, { message: "Background color required" }),
  textColor: z.string().min(1, { message: "Text color required" }),
  buttonColor: z.string().min(1, { message: "Button color required" }),
  buttonForeground: z.string().min(1, { message: "ButtonForeground color required" }),
  largeDescription: z.string().min(1, { message: "Large description is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  administrator: z.string().min(1, { message: "Field must be atleast 8 characters" }),
  bankCardNumber: z.string().optional(),
  logo: z.string().min(1, { message: "Logo is required" }),
  bgImage: z.string().optional(),
});
