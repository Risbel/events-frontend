import { NavbarSelector } from "@/components/event/mysales/NavbarSelector";
import SalesSection from "@/components/event/mysales/SalesSection";
import NavbarEvent from "@/components/event/navbar/NavbarEvent";
import { useParams } from "next/navigation";

const SelectedSales = () => {
  const params: { selector: "yesterday" | "today" | "pending" | "expired" } = useParams();

  if (!params?.selector) {
    return <div>Invalid selector. Please choose a valid option.</div>;
  }

  const colorSelector = (selector: "yesterday" | "today" | "pending" | "expired") => {
    switch (selector) {
      case "yesterday":
        return "red";
      case "today":
        return "green";
      case "pending":
        return "blue";
      case "expired":
        return "slate";
      default:
        return "green";
    }
  };

  const validSelectors = ["yesterday", "today", "pending", "expired"];
  if (!validSelectors.includes(params?.selector)) {
    return <div>Invalid selector. Please choose a valid option.</div>;
  }

  const selector = params.selector;

  return (
    <>
      <NavbarEvent />

      <div className="pt-16 px-4 md:px-8 h-full pb-16">
        <h1 className=" text-2xl mb-2 text-center font-semibold">My Sales</h1>

        <NavbarSelector />
        <SalesSection selector={selector} color={colorSelector(selector)} />
      </div>
    </>
  );
};

export default SelectedSales;
