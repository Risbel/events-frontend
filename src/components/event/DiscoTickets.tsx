import { IDiscoTicket } from "@/services/getDiscoTicketsByIdDisco";
import clsx from "clsx";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";
import useHavePermissions from "@/utils/useHavePermissions";

import Link from "next/link";
import { useState } from "react";
import { useListDays } from "@/hooks/useListDays";
import { useListMonths } from "@/hooks/useListMonths";
import AddCombosForm from "@/components/details-ticket/AddCombosForm";

import { compareAsc } from "date-fns";
import { DiscoDetail, IDiscoColors } from "@/services/getDisco";
import AddTicketsForm from "@/components/forms/AddTicketsForm";
import EditTicket from "./navbar/admin-settings/EditTicket";
import DeleteTicket from "./navbar/admin-settings/DeleteTicket";

export const LogoCategory = ({ ticket, discoColors }: { ticket: IDiscoTicket; discoColors: IDiscoColors }) => {
  return (
    <div>
      {ticket?.category === "VIP" && (
        <svg width="64px" height="64px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#d02121"
            strokeWidth="0.288"
          >
            <path
              d="M3 8.5C3 7.10218 3 6.40326 3.22836 5.85195C3.53284 5.11687 4.11687 4.53284 4.85195 4.22836C5.40326 4 6.10218 4 7.5 4H16.5C17.8978 4 18.5967 4 19.1481 4.22836C19.8831 4.53284 20.4672 5.11687 20.7716 5.85195C21 6.40326 21 7.10218 21 8.5V9.25C21 9.66421 20.6642 10 20.25 10H20C18.8954 10 18 10.8954 18 12V12C18 13.1046 18.8954 14 20 14H20.25C20.6642 14 21 14.3358 21 14.75V15.5C21 16.8978 21 17.5967 20.7716 18.1481C20.4672 18.8831 19.8831 19.4672 19.1481 19.7716C18.5967 20 17.8978 20 16.5 20H7.5C6.10218 20 5.40326 20 4.85195 19.7716C4.11687 19.4672 3.53284 18.8831 3.22836 18.1481C3 17.5967 3 16.8978 3 15.5V14.75C3 14.3358 3.33579 14 3.75 14H4C5.10457 14 6 13.1046 6 12V12C6 10.8954 5.10457 10 4 10H3.75C3.33579 10 3 9.66421 3 9.25V8.5Z"
              stroke="#680000"
            />
            <path
              d="M11.5568 10.6885C11.7249 10.2536 11.809 10.0361 11.9455 10.0059C11.9814 9.99802 12.0186 9.99802 12.0545 10.0059C12.191 10.0361 12.2751 10.2536 12.4432 10.6885C12.5389 10.9359 12.5867 11.0596 12.6761 11.1437C12.7012 11.1673 12.7284 11.1883 12.7574 11.2065C12.8608 11.2711 12.9899 11.2831 13.248 11.3071C13.685 11.3477 13.9035 11.368 13.9702 11.4973C13.984 11.5241 13.9934 11.5531 13.998 11.5831C14.0201 11.7279 13.8595 11.8796 13.5383 12.1829L13.449 12.2671C13.2989 12.4089 13.2238 12.4798 13.1803 12.5683C13.1543 12.6213 13.1368 12.6785 13.1286 12.7375C13.115 12.8358 13.137 12.9386 13.1809 13.1443L13.1967 13.2178C13.2755 13.5867 13.315 13.7712 13.2657 13.8618C13.2215 13.9433 13.1401 13.9954 13.0501 13.9999C12.9499 14.0048 12.8088 13.8855 12.5265 13.6468C12.3406 13.4895 12.2476 13.4109 12.1443 13.3802C12.05 13.3521 11.95 13.3521 11.8557 13.3802C11.7524 13.4109 11.6594 13.4895 11.4735 13.6468C11.1912 13.8855 11.0501 14.0048 10.9499 13.9999C10.8599 13.9954 10.7785 13.9433 10.7343 13.8618C10.685 13.7712 10.7245 13.5867 10.8033 13.2178L10.8191 13.1443C10.863 12.9386 10.885 12.8358 10.8714 12.7375C10.8632 12.6785 10.8457 12.6213 10.8197 12.5683C10.7762 12.4798 10.7011 12.4089 10.551 12.2671L10.4617 12.1829C10.1405 11.8796 9.97989 11.7279 10.002 11.5831C10.0066 11.5531 10.016 11.5241 10.0298 11.4973C10.0965 11.368 10.315 11.3477 10.752 11.3071C11.0101 11.2831 11.1392 11.2711 11.2426 11.2065C11.2716 11.1883 11.2988 11.1673 11.3239 11.1437C11.4133 11.0596 11.4611 10.9359 11.5568 10.6885Z"
              stroke={`${discoColors.buttonTicketForeground}`}
            />
          </g>

          <g id="SVGRepo_iconCarrier">
            <path
              d="M3 8.5C3 7.10218 3 6.40326 3.22836 5.85195C3.53284 5.11687 4.11687 4.53284 4.85195 4.22836C5.40326 4 6.10218 4 7.5 4H16.5C17.8978 4 18.5967 4 19.1481 4.22836C19.8831 4.53284 20.4672 5.11687 20.7716 5.85195C21 6.40326 21 7.10218 21 8.5V9.25C21 9.66421 20.6642 10 20.25 10H20C18.8954 10 18 10.8954 18 12V12C18 13.1046 18.8954 14 20 14H20.25C20.6642 14 21 14.3358 21 14.75V15.5C21 16.8978 21 17.5967 20.7716 18.1481C20.4672 18.8831 19.8831 19.4672 19.1481 19.7716C18.5967 20 17.8978 20 16.5 20H7.5C6.10218 20 5.40326 20 4.85195 19.7716C4.11687 19.4672 3.53284 18.8831 3.22836 18.1481C3 17.5967 3 16.8978 3 15.5V14.75C3 14.3358 3.33579 14 3.75 14H4C5.10457 14 6 13.1046 6 12V12C6 10.8954 5.10457 10 4 10H3.75C3.33579 10 3 9.66421 3 9.25V8.5Z"
              fill={`${discoColors.buttonTicketForeground}99`}
              stroke={`${discoColors.buttonTicketForeground}`}
            />
            <path
              d="M11.5568 10.6885C11.7249 10.2536 11.809 10.0361 11.9455 10.0059C11.9814 9.99802 12.0186 9.99802 12.0545 10.0059C12.191 10.0361 12.2751 10.2536 12.4432 10.6885C12.5389 10.9359 12.5867 11.0596 12.6761 11.1437C12.7012 11.1673 12.7284 11.1883 12.7574 11.2065C12.8608 11.2711 12.9899 11.2831 13.248 11.3071C13.685 11.3477 13.9035 11.368 13.9702 11.4973C13.984 11.5241 13.9934 11.5531 13.998 11.5831C14.0201 11.7279 13.8595 11.8796 13.5383 12.1829L13.449 12.2671C13.2989 12.4089 13.2238 12.4798 13.1803 12.5683C13.1543 12.6213 13.1368 12.6785 13.1286 12.7375C13.115 12.8358 13.137 12.9386 13.1809 13.1443L13.1967 13.2178C13.2755 13.5867 13.315 13.7712 13.2657 13.8618C13.2215 13.9433 13.1401 13.9954 13.0501 13.9999C12.9499 14.0048 12.8088 13.8855 12.5265 13.6468C12.3406 13.4895 12.2476 13.4109 12.1443 13.3802C12.05 13.3521 11.95 13.3521 11.8557 13.3802C11.7524 13.4109 11.6594 13.4895 11.4735 13.6468C11.1912 13.8855 11.0501 14.0048 10.9499 13.9999C10.8599 13.9954 10.7785 13.9433 10.7343 13.8618C10.685 13.7712 10.7245 13.5867 10.8033 13.2178L10.8191 13.1443C10.863 12.9386 10.885 12.8358 10.8714 12.7375C10.8632 12.6785 10.8457 12.6213 10.8197 12.5683C10.7762 12.4798 10.7011 12.4089 10.551 12.2671L10.4617 12.1829C10.1405 11.8796 9.97989 11.7279 10.002 11.5831C10.0066 11.5531 10.016 11.5241 10.0298 11.4973C10.0965 11.368 10.315 11.3477 10.752 11.3071C11.0101 11.2831 11.1392 11.2711 11.2426 11.2065C11.2716 11.1883 11.2988 11.1673 11.3239 11.1437C11.4133 11.0596 11.4611 10.9359 11.5568 10.6885Z"
              fill={`${discoColors.buttonsTicketsColor}`}
              stroke={`${discoColors.buttonsTicketsColor}`}
            />
          </g>
        </svg>
      )}

      {ticket?.category === "common" && (
        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

          <g id="SVGRepo_iconCarrier">
            <path
              d="M4.59202 4.71799L4.36502 4.27248L4.36502 4.27248L4.59202 4.71799ZM3.71799 5.59202L3.27248 5.36502L3.27248 5.36502L3.71799 5.59202ZM3.71799 18.408L4.16349 18.181H4.16349L3.71799 18.408ZM4.59202 19.282L4.81901 18.8365H4.81901L4.59202 19.282ZM19.408 19.282L19.181 18.8365H19.181L19.408 19.282ZM20.282 18.408L19.8365 18.181V18.181L20.282 18.408ZM20.2692 14.4187L20.2546 13.919H20.2546L20.2692 14.4187ZM20.0356 14.4256L20.0502 14.9254L20.0356 14.4256ZM20.282 5.59202L19.8365 5.81901V5.81901L20.282 5.59202ZM19.408 4.71799L19.181 5.16349V5.16349L19.408 4.71799ZM6.7 5H12.25V4H6.7V5ZM4.81901 5.16349C4.95069 5.0964 5.12454 5.05031 5.42712 5.02559C5.73554 5.00039 6.1317 5 6.7 5V4C6.1482 4 5.70428 3.99961 5.34569 4.02891C4.98126 4.05868 4.66117 4.12159 4.36502 4.27248L4.81901 5.16349ZM4.16349 5.81901C4.3073 5.53677 4.53677 5.3073 4.81901 5.16349L4.36502 4.27248C3.89462 4.51217 3.51217 4.89462 3.27248 5.36502L4.16349 5.81901ZM4 7.7C4 7.1317 4.00039 6.73554 4.02559 6.42712C4.05031 6.12454 4.0964 5.95069 4.16349 5.81901L3.27248 5.36502C3.12159 5.66117 3.05868 5.98126 3.02891 6.34569C2.99961 6.70428 3 7.1482 3 7.7H4ZM4 9.26923V7.7H3V9.26923H4ZM3.73077 9C3.87946 9 4 9.12054 4 9.26923H3C3 9.67282 3.32718 10 3.73077 10V9ZM4 9H3.73077V10H4V9ZM7 12C7 10.3431 5.65685 9 4 9V10C5.10457 10 6 10.8954 6 12H7ZM4 15C5.65685 15 7 13.6569 7 12H6C6 13.1046 5.10457 14 4 14V15ZM3.73077 15H4V14H3.73077V15ZM4 14.7308C4 14.8795 3.87946 15 3.73077 15V14C3.32718 14 3 14.3272 3 14.7308H4ZM4 16.3V14.7308H3V16.3H4ZM4.16349 18.181C4.0964 18.0493 4.05031 17.8755 4.02559 17.5729C4.00039 17.2645 4 16.8683 4 16.3H3C3 16.8518 2.99961 17.2957 3.02891 17.6543C3.05868 18.0187 3.12159 18.3388 3.27248 18.635L4.16349 18.181ZM4.81901 18.8365C4.53677 18.6927 4.3073 18.4632 4.16349 18.181L3.27248 18.635C3.51217 19.1054 3.89462 19.4878 4.36502 19.7275L4.81901 18.8365ZM6.7 19C6.1317 19 5.73554 18.9996 5.42712 18.9744C5.12454 18.9497 4.95069 18.9036 4.81901 18.8365L4.36502 19.7275C4.66117 19.8784 4.98126 19.9413 5.34569 19.9711C5.70428 20.0004 6.1482 20 6.7 20V19ZM12.25 19H6.7V20H12.25V19ZM13 19.25V19H12V19.25H13ZM13 19C13 18.7239 13.2239 18.5 13.5 18.5V17.5C12.6716 17.5 12 18.1716 12 19H13ZM13.5 18.5C13.7761 18.5 14 18.7239 14 19H15C15 18.1716 14.3284 17.5 13.5 17.5V18.5ZM14 19V19.25H15V19H14ZM17.3 19H14.75V20H17.3V19ZM19.181 18.8365C19.0493 18.9036 18.8755 18.9497 18.5729 18.9744C18.2645 18.9996 17.8683 19 17.3 19V20C17.8518 20 18.2957 20.0004 18.6543 19.9711C19.0187 19.9413 19.3388 19.8784 19.635 19.7275L19.181 18.8365ZM19.8365 18.181C19.6927 18.4632 19.4632 18.6927 19.181 18.8365L19.635 19.7275C20.1054 19.4878 20.4878 19.1054 20.7275 18.635L19.8365 18.181ZM20 16.3C20 16.8683 19.9996 17.2645 19.9744 17.5729C19.9497 17.8755 19.9036 18.0493 19.8365 18.181L20.7275 18.635C20.8784 18.3388 20.9413 18.0187 20.9711 17.6543C21.0004 17.2957 21 16.8518 21 16.3H20ZM20 14.6428V16.3H21V14.6428H20ZM20.2839 14.9185C20.1285 14.9231 20 14.7983 20 14.6428H21C21 14.2346 20.6627 13.907 20.2546 13.919L20.2839 14.9185ZM20.0502 14.9254L20.2839 14.9185L20.2546 13.919L20.0209 13.9258L20.0502 14.9254ZM17 11.9633C17 13.634 18.3803 14.9744 20.0502 14.9254L20.0209 13.9258C18.9145 13.9583 18 13.0702 18 11.9633H17ZM19.9633 9C18.3267 9 17 10.3267 17 11.9633H18C18 10.879 18.879 10 19.9633 10V9ZM20.2692 9H19.9633V10H20.2692V9ZM20 9.26923C20 9.12054 20.1205 9 20.2692 9V10C20.6728 10 21 9.67283 21 9.26923H20ZM20 7.7V9.26923H21V7.7H20ZM19.8365 5.81901C19.9036 5.95069 19.9497 6.12454 19.9744 6.42712C19.9996 6.73554 20 7.1317 20 7.7H21C21 7.1482 21.0004 6.70428 20.9711 6.34569C20.9413 5.98126 20.8784 5.66117 20.7275 5.36502L19.8365 5.81901ZM19.181 5.16349C19.4632 5.3073 19.6927 5.53677 19.8365 5.81901L20.7275 5.36502C20.4878 4.89462 20.1054 4.51217 19.635 4.27248L19.181 5.16349ZM17.3 5C17.8683 5 18.2645 5.00039 18.5729 5.02559C18.8755 5.05031 19.0493 5.0964 19.181 5.16349L19.635 4.27248C19.3388 4.12159 19.0187 4.05868 18.6543 4.02891C18.2957 3.99961 17.8518 4 17.3 4V5ZM14.75 5H17.3V4H14.75V5ZM14 4.75V5H15V4.75H14ZM14 5C14 5.27614 13.7761 5.5 13.5 5.5V6.5C14.3284 6.5 15 5.82843 15 5H14ZM13.5 5.5C13.2239 5.5 13 5.27614 13 5H12C12 5.82843 12.6716 6.5 13.5 6.5V5.5ZM13 5V4.75H12V5H13ZM13.5 8.5C13.7761 8.5 14 8.72386 14 9H15C15 8.17157 14.3284 7.5 13.5 7.5V8.5ZM13 9C13 8.72386 13.2239 8.5 13.5 8.5V7.5C12.6716 7.5 12 8.17157 12 9H13ZM13 10V9H12V10H13ZM13.5 10.5C13.2239 10.5 13 10.2761 13 10H12C12 10.8284 12.6716 11.5 13.5 11.5V10.5ZM14 10C14 10.2761 13.7761 10.5 13.5 10.5V11.5C14.3284 11.5 15 10.8284 15 10H14ZM14 9V10H15V9H14ZM13.5 13.5C13.7761 13.5 14 13.7239 14 14H15C15 13.1716 14.3284 12.5 13.5 12.5V13.5ZM13 14C13 13.7239 13.2239 13.5 13.5 13.5V12.5C12.6716 12.5 12 13.1716 12 14H13ZM13 15V14H12V15H13ZM13.5 15.5C13.2239 15.5 13 15.2761 13 15H12C12 15.8284 12.6716 16.5 13.5 16.5V15.5ZM14 15C14 15.2761 13.7761 15.5 13.5 15.5V16.5C14.3284 16.5 15 15.8284 15 15H14ZM14 14V15H15V14H14ZM14 19.25C14 19.6642 14.3358 20 14.75 20V19C14.8881 19 15 19.1119 15 19.25H14ZM14.75 4C14.3358 4 14 4.33579 14 4.75H15C15 4.88807 14.8881 5 14.75 5V4ZM12.25 20C12.6642 20 13 19.6642 13 19.25H12C12 19.1119 12.1119 19 12.25 19V20ZM12.25 5C12.1119 5 12 4.88807 12 4.75H13C13 4.33579 12.6642 4 12.25 4V5Z"
              fill={`${discoColors.buttonTicketForeground}`}
            />
          </g>
        </svg>
      )}
      {ticket?.category === "economy" && (
        <svg width="64px" height="64px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#d02121"
            strokeWidth="0.288"
          >
            <path
              d="M3 8.5C3 7.10218 3 6.40326 3.22836 5.85195C3.53284 5.11687 4.11687 4.53284 4.85195 4.22836C5.40326 4 6.10218 4 7.5 4H16.5C17.8978 4 18.5967 4 19.1481 4.22836C19.8831 4.53284 20.4672 5.11687 20.7716 5.85195C21 6.40326 21 7.10218 21 8.5V9.25C21 9.66421 20.6642 10 20.25 10H20C18.8954 10 18 10.8954 18 12V12C18 13.1046 18.8954 14 20 14H20.25C20.6642 14 21 14.3358 21 14.75V15.5C21 16.8978 21 17.5967 20.7716 18.1481C20.4672 18.8831 19.8831 19.4672 19.1481 19.7716C18.5967 20 17.8978 20 16.5 20H7.5C6.10218 20 5.40326 20 4.85195 19.7716C4.11687 19.4672 3.53284 18.8831 3.22836 18.1481C3 17.5967 3 16.8978 3 15.5V14.75C3 14.3358 3.33579 14 3.75 14H4C5.10457 14 6 13.1046 6 12V12C6 10.8954 5.10457 10 4 10H3.75C3.33579 10 3 9.66421 3 9.25V8.5Z"
              stroke="#680000"
            />
          </g>

          <g id="SVGRepo_iconCarrier">
            <path
              d="M3 8.5C3 7.10218 3 6.40326 3.22836 5.85195C3.53284 5.11687 4.11687 4.53284 4.85195 4.22836C5.40326 4 6.10218 4 7.5 4H16.5C17.8978 4 18.5967 4 19.1481 4.22836C19.8831 4.53284 20.4672 5.11687 20.7716 5.85195C21 6.40326 21 7.10218 21 8.5V9.25C21 9.66421 20.6642 10 20.25 10H20C18.8954 10 18 10.8954 18 12V12C18 13.1046 18.8954 14 20 14H20.25C20.6642 14 21 14.3358 21 14.75V15.5C21 16.8978 21 17.5967 20.7716 18.1481C20.4672 18.8831 19.8831 19.4672 19.1481 19.7716C18.5967 20 17.8978 20 16.5 20H7.5C6.10218 20 5.40326 20 4.85195 19.7716C4.11687 19.4672 3.53284 18.8831 3.22836 18.1481C3 17.5967 3 16.8978 3 15.5V14.75C3 14.3358 3.33579 14 3.75 14H4C5.10457 14 6 13.1046 6 12V12C6 10.8954 5.10457 10 4 10H3.75C3.33579 10 3 9.66421 3 9.25V8.5Z"
              fill={`${discoColors.buttonTicketForeground}99`}
              stroke={`${discoColors.buttonTicketForeground}`}
            />
          </g>
        </svg>
      )}
    </div>
  );
};

const DiscoTickets = ({
  name,
  myPermissions,
  discoId,
  discoTickets,
  discoDetail,
}: {
  name: string;
  myPermissions: ImyPermissions;
  discoId: string;
  discoTickets: IDiscoTicket[];
  discoDetail: DiscoDetail;
}) => {
  const weekdays = useListDays();
  const months = useListMonths();

  const [day, setDay] = useState(`${new Date().toDateString()}`);

  const { havePermission } = useHavePermissions(myPermissions);

  const expDates = discoTickets.map((ticket) => new Date(ticket.expDate));
  const sortedDates = expDates.sort(compareAsc);
  const unicDates = [...new Set(sortedDates.map((date) => date.toDateString()))];

  return (
    <div style={{ background: `${discoDetail.discoColor.bgTicketsSection}` }}>
      <h1
        style={{ color: `${discoDetail.discoColor.ticketH1Color}` }}
        className="font-extrabold text-4xl md:text-5xl lg:text-7xl text-center mb-8 pt-20"
      >
        Tickets
      </h1>
      <div className="flex justify-center mb-4">
        <div
          style={{
            background: `${discoDetail.discoColor.buttonsTicketsColor}60`,
            border: `solid ${discoDetail.discoColor.buttonTicketForeground} 4px`,
          }}
          className="flex gap-1 overflow-hidden max-w-screen-lg overflow-x-auto rounded-xl p-2"
        >
          {unicDates.map((date, i) => {
            if (compareAsc(new Date(new Date(date).toDateString()), new Date(new Date().toDateString())) >= 0) {
              return (
                <button
                  key={i}
                  style={{
                    border: `solid ${discoDetail.discoColor.buttonTicketForeground} 2px`,
                    background: `${discoDetail.discoColor.buttonsTicketsColor}`,
                  }}
                  className="flex flex-col items-center px-4 py-2 hover:opacity-90 leading-none rounded-md hover:-translate-y-[2px] transition-transform"
                  onClick={() => setDay(date)}
                >
                  <p
                    style={{ color: `${discoDetail.discoColor.buttonTicketForeground}` }}
                    className="text-xs font-semibold"
                  >
                    {weekdays[new Date(date).getDay()].slice(0, 3)}
                  </p>
                  <p
                    style={{ color: `${discoDetail.discoColor.buttonTicketForeground}` }}
                    className="text-xl font-bold"
                  >
                    {new Date(date).getDate()}
                  </p>
                  <p
                    style={{ color: `${discoDetail.discoColor.buttonTicketForeground}` }}
                    className="text-xs font-semibold"
                  >
                    {months[new Date(date).getMonth()].slice(0, 3)}
                  </p>
                </button>
              );
            }
          })}
        </div>
      </div>

      <div className="flex justify-center max-w-screen flex-wrap gap-4 mb-10 p-2 rounded-md px-8">
        {discoTickets?.map((ticket) => {
          if (new Date(ticket.expDate).toDateString() === day) {
            return (
              <div key={ticket.id} className="relative w-full md:w-1/3 lg:w-1/5 min-w-64">
                {
                  Number(ticket.countInStock) === 0 && (
                    <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-3xl flex items-center justify-center">
                      <p className="text-slate-200 text-2xl">Sold out</p>
                    </div>
                  )
                  // ) : (
                  //   ticket.ticketsReservations.length >= 1 &&
                  //   ticket.category !== "common" && (
                  //     <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-3xl flex items-center justify-center">
                  //       <p className="text-slate-200 text-2xl">Reserved</p>
                  //     </div>
                  //   )
                  // )
                }
                <div
                  style={{
                    background: `${discoDetail.discoColor.buttonsTicketsColor}`,
                    border: `solid ${discoDetail.discoColor.buttonTicketForeground} 2px`,
                    color: `${discoDetail.discoColor.buttonTicketForeground}`,
                  }}
                  className="flex flex-col h-full gap-2 justify-between items-center rounded-3xl py-8 relative"
                >
                  <p
                    style={{ border: `solid ${discoDetail.discoColor.buttonTicketForeground}90 1px` }}
                    className="text-center text-xl font-bold mb-2 border px-2 rounded-full"
                  >
                    {ticket.category}
                  </p>

                  <div className="flex items-center gap-2 pb-4">
                    <div className="text-5xl font-bold">
                      {Number(ticket.price) > 0 ? (
                        `${ticket.price}`
                      ) : (
                        <span
                          className="text-2xl"
                          style={{
                            border: `solid ${discoDetail.discoColor.buttonTicketForeground} 2px`,
                            borderRadius: 100,
                            color: `${discoDetail.discoColor.buttonTicketForeground}`,
                            paddingRight: 10,
                            paddingLeft: 10,
                          }}
                        >
                          free
                        </span>
                      )}
                    </div>
                  </div>

                  {(ticket.category === "VIP" || ticket.category === "economy") && (
                    <div className="flex items-center">
                      <p className="font-semibold">{ticket.countInStock} seats available</p>
                    </div>
                  )}
                  <p className="text-center text-xs pb-6 w-2/3"> {ticket?.shortDescription}</p>

                  <div className="flex absolute right-1 top-1 items-center gap-1 md:gap-2">
                    <LogoCategory ticket={ticket} discoColors={discoDetail.discoColor} />
                  </div>

                  <Link
                    className="text-center font-semibold py-1 px-4 rounded-md hover:-translate-y-1 shadow-lg transition-transform duration-300"
                    style={{
                      background: `${discoDetail.discoColor.buttonsTicketsColor}`,
                      border: `solid ${discoDetail.discoColor.buttonTicketForeground} 1px`,
                      color: `${discoDetail.discoColor.buttonTicketForeground}`,
                    }}
                    href={`/event/${name}/details-ticket/${ticket.id}`}
                  >
                    Get tickets
                  </Link>

                  <div style={{ color: `${discoDetail.discoColor.buttonTicketForeground}` }}>
                    <div className="font-semibold w-full flex items-center justify-center gap-2">
                      <p className="text-xs text-center">
                        {weekdays[new Date(ticket.expDate).getDay()]} {months[new Date(ticket.expDate).getMonth()]}{" "}
                        {new Date(ticket.expDate).getDate()}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full justify-end pr-4">
                    {havePermission("update", "Tickets") && <EditTicket ticket={ticket} />}
                    {havePermission("delete", "Tickets") && <DeleteTicket idTicket={ticket.id} />}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div
        className={clsx(
          !havePermission("create", "Tickets") && "hidden",
          "my-10 flex flex-col items-center gap-4 w-screen"
        )}
      >
        <AddTicketsForm discoId={discoId} />
      </div>
    </div>
  );
};

export default DiscoTickets;
