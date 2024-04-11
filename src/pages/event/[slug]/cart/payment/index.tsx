import EventLayout from "@/components/layouts/EventLayout";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import useGetDisco from "@/hooks/useGetDisco";
import useCart from "@/store/useCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Payment = () => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ slug, userId });

  const { cartItems } = useCart();
  const { data } = useSession();

  const { mutate, isLoading } = useCreateReservation();

  const handleSubmitReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId && cartItems) {
      const payloadReservation = cartItems.map((item) => {
        return {
          discoTicketId: !item?.comboDetail?.id ? item.id : null,
          comboId: item?.comboDetail?.id ? item.id : null,
          quantity: item.quantity,
          discoId: item.discoId,
          category: item.category,
          imagesTicket: item?.ticketImages?.[0]?.image ? item?.ticketImages?.[0]?.image : null,
          imagesCombo: item?.comboDetail?.image ? item?.comboDetail?.image : null,
          comboDescription: item?.comboDetail?.description ? item?.comboDetail?.description : null,
          ticketDescription: item.shortDescription,
          price: item.price,
          discoSlug: item.Disco.slug,
        };
      });

      mutate({ userId, cartItems: payloadReservation });
    }
  };

  const discoColors = discoData?.disco.discoDetail.discoColor;

  if (!discoColors) {
    return;
  }

  return (
    <EventLayout background={`${discoColors?.bgNavbarColor}30`}>
      <p>Payment</p>
    </EventLayout>
  );
};
export default Payment;
