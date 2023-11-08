import HomeLayout from "@/components/layouts/HomeLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCart from "@/store/useCart";
import Link from "next/link";

const Payment = () => {
  const { cartItems } = useCart();
  console.log(cartItems);

  return (
    <HomeLayout>
      <div className="pt-16 flex justify-center px-2">
        <p className="text-center text-slate-400 font-thin  text-xl">
          <Link className="hover:text-white hover:underline" href={"/cart"}>
            Cart/
          </Link>
          <span className="text-white underline">Payment</span>/Status
        </p>
      </div>
      <div className="grid md:grid-cols-4 pt-4 px-4">
        <Tabs defaultValue="account" className="w-full md:col-start-2 col-span-2">
          <TabsList className="grid w-full grid-cols-2 h-9 gap-1 bg-purple-900/80">
            <TabsTrigger className="h-7" value="account">
              ENZONA
            </TabsTrigger>
            <TabsTrigger className="h-7" value="password">
              TM
            </TabsTrigger>
          </TabsList>
          <TabsContent className="rounded-xl p-2 bg-purple-900/80" value="account">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("hola");
              }}
              className="flex flex-col gap-2"
            >
              <div className="grid gap-2 md:grid-cols-2">
                <Input className="text-md" />
                <Input className="text-md" />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </TabsContent>
          <TabsContent className="rounded-xl p-2 bg-purple-900/80 text-white" value="password">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi, expedita ut iure nihil illo accusamus
            beatae fugit quae amet magnam provident rerum iusto molestias necessitatibus pariatur perspiciatis sapiente,
            molestiae eos?
          </TabsContent>
        </Tabs>
      </div>
      ;
    </HomeLayout>
  );
};
export default Payment;
