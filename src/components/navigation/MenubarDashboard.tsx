import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ArrowRight, PlusCircle } from "lucide-react";

const MenubarDashboard = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Events</MenubarTrigger>
        <MenubarContent className="w-96">
          <MenubarItem className="bg-secondary m-2 border cursor-pointer">
            <span className="md:text-base">Create new event</span>
            <MenubarShortcut>
              <PlusCircle className="font-semibold hover:scale-105" height={20} width={20} />
            </MenubarShortcut>
          </MenubarItem>

          <div className="flex flex-col">
            <div className="flex justify-center">
              <p>List of events</p>
            </div>
            <div className="px-2">
              <ul>
                <li className="flex gap-4 hover:gap-6 transition-all hover:bg-secondary pl-1 rounded cursor-pointer">
                  <span>Fiesta Lunar</span> <ArrowRight height={20} width={20} />
                </li>
                <li className="flex gap-4 hover:gap-6 transition-all hover:bg-secondary pl-1 rounded cursor-pointer">
                  <span>Encuentro Estelar</span> <ArrowRight height={20} width={20} />
                </li>
                <li className="flex gap-4 hover:gap-6 transition-all hover:bg-secondary pl-1 rounded cursor-pointer">
                  <span>Festival de Innovación</span> <ArrowRight height={20} width={20} />
                </li>
                <li className="flex gap-4 hover:gap-6 transition-all hover:bg-secondary pl-1 rounded cursor-pointer">
                  <span>Noche de Gala Cultural</span> <ArrowRight height={20} width={20} />
                </li>
              </ul>
            </div>
          </div>

          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger className="md:text-base">Share my events via :</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem className="focus:bg-red-400">Email</MenubarItem>
              <MenubarItem className="focus:bg-blue-500">Telegram</MenubarItem>
              <MenubarItem className="focus:bg-green-600">WhatsApp</MenubarItem>
              <MenubarItem>SMS</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem className="md:text-base">
            View all events <MenubarShortcut>⌘AE</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <div className="border-r border-muted h-8"></div>
      <MenubarMenu>
        <MenubarTrigger>Resources</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Tutorials</MenubarItem>
          <MenubarItem>Documentation</MenubarItem>
          <MenubarItem>Community</MenubarItem>
          <MenubarItem>Forums</MenubarItem>
          <MenubarItem>Blog</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <div className="border-r border-muted h-8"></div>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent className="w-80">
          <MenubarItem className="bg-secondary m-2 border cursor-pointer">
            <span className="md:text-base">Add user</span>
            <MenubarShortcut>
              <PlusCircle className="font-semibold hover:scale-105" height={20} width={20} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <div className="flex flex-col">
            <div className="flex justify-center">
              <p>List of users</p>
            </div>
            <div className="px-2">
              <ul>
                <li className="flex gap-4 hover:gap-6 transition-all hover:bg-secondary pl-1 rounded cursor-pointer">
                  <span>Marta Pérez</span> <ArrowRight height={20} width={20} />
                </li>
                <li className="flex gap-4 hover:gap-6 transition-all hover:bg-secondary pl-1 rounded cursor-pointer">
                  <span>Juan Rodríguez</span> <ArrowRight height={20} width={20} />
                </li>
                <li className="flex gap-4 hover:gap-6 transition-all hover:bg-secondary pl-1 rounded cursor-pointer">
                  <span>Carla Gómez</span> <ArrowRight height={20} width={20} />
                </li>
                <li className="flex gap-4 hover:gap-6 transition-all hover:bg-secondary pl-1 rounded cursor-pointer">
                  <span>Alejandro García</span> <ArrowRight height={20} width={20} />
                </li>
              </ul>
            </div>
          </div>
          <MenubarSeparator />
          <MenubarItem className="md:text-base">
            View all users <MenubarShortcut>⌘AU</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenubarDashboard;
