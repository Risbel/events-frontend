import { z } from "zod";

export const aboutTextSchema = z.object({
  title: z.string().optional(),
  titleColor: z.string(),
  titleAlign: z.enum(["center", "left", "right", "justify"]),
  text: z.string(),
  textAlign: z.enum(["center", "left", "right", "justify"]),
  textColor: z.string(),
  textWeight: z.string(),
});

export const addDiscoSchema = z.object({
  //general
  name: z.string().min(1, { message: "The name is required" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .refine((data) => /^[A-Za-z0-9_-]+$/.test(data), {
      message: "Only [a-z], [A-Z], [-] and [_] allowed",
    }),
  brandColor: z.string().min(1, { message: "Brand color required" }),
  startDate: z.string().min(1, { message: "Start date required" }),
  endDate: z.string().min(1, { message: "End date required" }),
  //navbar
  logo: z.any().refine((file) => file?.[0]?.name, `Image required`),
  bgNavbarColor: z.string().min(1, { message: "Background is required" }),
  navbarForeground: z.string().min(1, { message: "Text color required" }),
  //home
  bannerImage: z.any().refine((file) => file?.[0]?.name, `Image required`),
  h1Banner: z.string().min(2, "Invalid title").optional().or(z.literal("")),
  h1BannerColor: z.string().min(1, { message: "h1 color required" }),
  bannerGradientColor: z.string().min(1, { message: "h1 color required" }),
  bannerDescription: z.string().min(2, "Invalid description").optional().or(z.literal("")),
  bannerDescriptionColor: z.string().min(1, { message: "Description color required" }),
  //about
  layoutTextAbout: z.enum(["variantA", "variantB", "variantC", "variantD", "variantE"]), //new
  titleAboutColor: z.string().min(1, { message: "Title about color required" }), //new
  titleTextAbout: z.string().min(1, { message: "Title text required" }).optional().or(z.literal("")),
  bgAboutColor: z.string().min(1, { message: "Background color required" }),
  aboutTexts: z.array(aboutTextSchema), //new
  buttonColor: z.string().min(1, { message: "Button color required" }),
  buttonForeground: z.string().min(1, { message: "ButtonForeground color required" }),
  //experiencies
  titleTextCarousel: z.string().min(1, { message: "Title text required" }).optional().or(z.literal("")),
  bgExperiencies: z.string().min(1, { message: "Background Experiencies required" }),
  experienciesH1Color: z.string().min(1, { message: "Experiencies title color required" }),
  //tickes
  titleTextTickets: z.string().min(1, { message: "Title text required" }).optional().or(z.literal("")),
  bgTicketsSection: z.string().min(1, { message: "Secondary color required" }),
  ticketH1Color: z.string().min(1, { message: "Ticket title color required" }),
  buttonsTicketsColor: z.string().min(1, { message: "Button color required" }),
  buttonTicketForeground: z.string().min(1, { message: "Button color required" }),
  //footer
  phone: z.string().min(1, { message: "Phone number required" }),
  email: z.string().email().min(1, { message: "Email required" }),
  address: z.string().min(1, { message: "Address is required" }),
  socials: z.array(
    z.object({
      url: z.string().optional(),
    })
  ),
  quickLinks: z.array(
    z.object({
      url: z.string().min(1, { message: "Url required" }),
      name: z.string().min(1, { message: "Name required" }),
    })
  ),
  bgFooterColor: z.string().min(1, { message: "Background footer color required" }),
  foregroundFooterColor: z.string().min(1, { message: "Foreground footer color required" }),
  administrator: z.string().min(1, { message: "Field must be atleast 8 characters" }),
});

export type AddDiscoSchema = z.infer<typeof addDiscoSchema>;
