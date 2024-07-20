import SubscribeButton from "@/components/buttons/SubscribeButton";
import { IDiscoColors } from "@/services/getDisco";
import React from "react";

import { Button } from "@/components/ui/button";
import { ToastAction, ToastClose } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { BellIcon } from "lucide-react";

const SubscribeNow = ({
  userId,
  discoId,
  discoColors,
}: {
  userId: string;
  discoId: string;
  discoColors: IDiscoColors;
}) => {
  return <SubscribeButton discoColors={discoColors} userId={userId} discoId={discoId} />;
};

// const SubscribeNow = ({
//   userId,
//   discoId,
//   discoColors,
// }: {
//   userId: string;
//   discoId: string;
//   discoColors: IDiscoColors;
// }) => {
//   const { toast } = useToast();
//   return (
//     <Button
//       className="p-0"
//       onClick={() => {
//         toast({
//           action: (
//             <ToastAction
//               className="pt-8 pb-4 rounded-2xl"
//               style={{ background: discoColors.bgNavbarColor, border: `solid 2px ${discoColors.navbarForeground}` }}
//               altText="Goto schedule to undo"
//             >
//
//             </ToastAction>
//           ),
//         });
//       }}
//       style={{ background: discoColors.bgNavbarColor }}
//     >
//       <BellIcon
//         style={{ stroke: `${discoColors.navbarForeground}` }}
//         className="cursor-pointer hover:scale-110 transition-transform"
//       />
//     </Button>
//   );
// };

export default SubscribeNow;
