import httpService from "@/config/axios.config";

export const handlePay = async ({ userId, payloadReservation: cartItems }: IReservation) => {
  const response = await httpService.post<ICheckoutSession>(`/stripe/checkout/${userId}`, {
    cartItems,
  });
  return response.data;
};

interface ICheckoutSession {
  id: string;
  object: string;
  after_expiration: any;
  allow_promotion_codes: any;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: {
    enabled: boolean;
    liability: any;
    status: any;
  };
  billing_address_collection: any;
  cancel_url: any;
  client_reference_id: any;
  client_secret: any;
  consent: any;
  consent_collection: any;
  created: number;
  currency: string;
  currency_conversion: any;
  custom_fields: any[];
  custom_text: {
    after_submit: any;
    shipping_address: any;
    submit: any;
    terms_of_service_acceptance: any;
  };
  customer: any;
  customer_creation: string;
  customer_details: any;
  customer_email: any;
  expires_at: number;
  invoice: any;
  invoice_creation: {
    enabled: boolean;
    invoice_data: {
      account_tax_ids: any;
      custom_fields: any;
      description: any;
      footer: any;
      issuer: any;
      metadata: any;
      rendering_options: any;
    };
  };
  livemode: boolean;
  locale: any;
  metadata: any;
  mode: string;
  payment_intent: any;
  payment_link: any;
  payment_method_collection: string;
  payment_method_configuration_details: any;
  payment_method_options: {
    card: {
      request_three_d_secure: string;
    };
  };
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: {
    enabled: boolean;
  };
  recovered_from: any;
  setup_intent: any;
  shipping_address_collection: any;
  shipping_cost: any;
  shipping_details: any;
  shipping_options: any[];
  status: string;
  submit_type: any;
  subscription: any;
  success_url: string;
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  };
  ui_mode: string;
  url: string;
}

export interface IReservation {
  userId: string;
  payloadReservation: {
    discoTicketId: string | null | undefined;
    comboId: string | null | undefined;
    quantity: number;
    discoId: string | undefined;
    collaborator: string | null;
    category: string;
    imagesTicket: string | null;
    comboImage: string | null;
    comboDescription: string | null;
    ticketDescription: string | null;
    price: string;
    discoSlug: string | null;
    expDate: string | null;
  }[];
}
