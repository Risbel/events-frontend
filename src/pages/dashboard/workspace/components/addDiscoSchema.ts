import { z } from "zod";

export const addDiscoSchema = z.object({
  //general
  name: z.string().min(1, { message: "The name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  brandColor: z.string().min(1, { message: "Brand color required" }),
  //navbar
  logo: z.string().min(1, { message: "Logo is required" }),
  bgNavbarColor: z.string().min(1, { message: "Background is required" }), //new
  navbarForeground: z.string().min(1, { message: "Text color required" }), // new
  //home
  bannerImage: z.string().min(1, { message: "Banner URL image required" }),
  h1Banner: z.string().min(1, { message: "Text h1 required" }), //new replace h1Color
  h1BannerColor: z.string().min(1, { message: "h1 color required" }), //new
  bannerGradientColor: z.string().min(1, { message: "h1 color required" }), //new
  bannerDescription: z.string().min(1, { message: "Description required" }), //new replace description
  bannerDescriptionColor: z.string().min(1, { message: "Description color required" }), //new
  //about
  bgAboutColor: z.string().min(1, { message: "Background color required" }), //new
  aboutDescription: z.string().min(1, { message: "About description required" }), //new
  textAboutColor: z.string().min(1, { message: "About description required" }), //new
  buttonColor: z.string().min(1, { message: "Button color required" }),
  buttonForeground: z.string().min(1, { message: "ButtonForeground color required" }),
  //experiencies
  bgExperiencies: z.string().min(1, { message: "Background Experiencies required" }), //new
  experienciesH1Color: z.string().min(1, { message: "Experiencies title color required" }), //new
  //tickes
  bgTicketsSection: z.string().min(1, { message: "Secondary color required" }), //new
  ticketH1Color: z.string().min(1, { message: "Ticket title color required" }), //new
  buttonsTicketsColor: z.string().min(1, { message: "Button color required" }), //new
  buttonTicketForeground: z.string().min(1, { message: "Button color required" }), //new
  //footer
  phone: z.string().min(1, { message: "Phone number required" }), //new
  email: z.string().email().min(1, { message: "Email required" }),
  address: z.string().min(1, { message: "Address is required" }),
  administrator: z.string().min(1, { message: "Field must be atleast 8 characters" }),
  bankCardNumber: z.string().optional(),

  bgImage: z.string().optional(),
});
