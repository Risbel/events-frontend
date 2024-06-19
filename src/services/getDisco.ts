import httpService from "@/config/axios.config";

const getDisco = async ({ slug, userId }: { slug: any; userId?: any }) => {
  const response = await httpService.get<{ disco: DataDisco; subscription: Subscription }>(`/disco/${slug}/${userId}`);
  return response.data;
};

export default getDisco;

export interface DataDisco {
  endDate: string;
  startDate: string;
  createdAt: string;
  discoDetail: DiscoDetail;
  id: string;
  logo: string;
  name: string;
  slug: string;
  updatedAt: string;
}
export interface DiscoDetail {
  id: string;
  h1Banner: string;
  bannerDescription: string;
  titleTextAbout: string;
  titleTextCarousel: string;
  bgImage: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  administrator: string;
  discoId: string;
  discoImages: DiscoImages[];
  eventAbouts: [
    {
      id: string;
      title: string;
      titleColor: string;
      titleAlign: "center" | "left" | "right" | "justify";
      text: string;
      textAlign: "center" | "left" | "right" | "justify";
      textColor: string;
      textWeight: string;
      createdAt: string;
      updatedAt: string;
      discoDetailId: string;
    }
  ];
  layoutTextAbout: "variantA" | "variantB" | "variantC" | "variantD" | "variantE";
  discoNetwork: {
    id: string;
    facebook: string;
    instagram: string;
    youtube: string;
    X: string;
    createdAt: string;
    updatedAt: string;
    discoDetailId: string;
  };
  quickLinks: [
    {
      id: string;
      url: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      discoDetailId: string;
    }
  ];
  discoPhones: [
    {
      id: string;
      number: string;
      createdAt: string;
      updatedAt: string;
      discoDetailId: string;
    }
  ];
  discoEmails: [
    {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      discoDetailId: string;
    }
  ];
  discoColor: IDiscoColors;
}

export interface DiscoImages {
  createdAt: string;
  discoDetailId: string;
  id: string;
  image: string;
  imageText: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  roleId: string;
  discoId: string;
  DiscoRole: DiscoRole;
}

export interface DiscoRole {
  id: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
}

export interface IDiscoColors {
  id: string;
  brandColor: string;
  bgNavbarColor: string;
  navbarForeground: string;
  h1BannerColor: string;
  bannerGradientColor: string;
  bannerDescriptionColor: string;
  titleAboutColor: string;
  bgAboutColor: string;
  textAboutColor: string;
  buttonColor: string;
  buttonForeground: string;
  bgExperiencies: string;
  experienciesH1Color: string;
  bgTicketsSection: string;
  ticketH1Color: string;
  buttonsTicketsColor: string;
  buttonTicketForeground: string;
  createdAt: string;
  updatedAt: string;
  discoDetailId: string;
  foregroundFooterColor: string;
  bgFooterColor: string;
}
