import React, { useState, DragEvent } from "react";
import { motion } from "framer-motion";
import { FlagIcon, Flame, Plus, Send, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cn } from "@/lib/shadcnUtils";

export default function UserKanban() {
  return (
    <div className="bg-white p-5">
      <Board />
    </div>
  );
}

type UserType = "regular" | "vip";

interface User {
  id: string;
  avatar: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  type: UserType;
}

const Board: React.FC = () => {
  const [users, setUsers] = useState<User[]>(DEFAULT_USERS);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  return (
    <div className="flex gap-3 items-start">
      <div className="flex flex-col">
        <Column
          title="Regular users"
          type="regular"
          headingColor="text-primary font-medium"
          users={users}
          setUsers={setUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <BurnBarrel setUsers={setUsers} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
      </div>
      <div className="flex flex-col">
        <Column
          title="VIP users"
          type="vip"
          headingColor="text-yellow-500 font-bold"
          users={users}
          setUsers={setUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <BurnBarrel setUsers={setUsers} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
      </div>

      <WhatsAppSender users={users} />
    </div>
  );
};

interface ColumnProps {
  title: string;
  headingColor: string;
  users: User[];
  type: UserType;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const Column: React.FC<ColumnProps> = ({
  title,
  headingColor,
  users,
  type,
  setUsers,
  selectedUsers,
  setSelectedUsers,
}) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, user: User) => {
    let selected = selectedUsers;

    // Si el usuario arrastrado no está seleccionado, seleccionarlo automáticamente
    if (!selectedUsers.includes(user.id)) {
      selected = [user.id]; // Solo arrastramos el usuario actual si no hay más seleccionados
      setSelectedUsers(selected);
    }

    e.dataTransfer.setData("userIds", JSON.stringify(selected));
  };
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    try {
      const userIds = JSON.parse(e.dataTransfer.getData("userIds")) as string[];

      // Asegurarse de que userIds esté presente
      if (userIds && userIds.length > 0) {
        setActive(false);
        clearHighlights();

        const indicators: any = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (!userIds.includes(before)) {
          let copy = [...users];

          let usersToTransfer = copy.filter((c) => userIds.includes(c.id));
          usersToTransfer = usersToTransfer.map((c) => ({ ...c, type }));

          copy = copy.filter((c) => !userIds.includes(c.id));

          const moveToBack = before === "-1";

          if (moveToBack) {
            copy.push(...usersToTransfer);
          } else {
            const insertAtIndex = copy.findIndex((el) => el.id === before);
            if (insertAtIndex !== -1) {
              copy.splice(insertAtIndex, 0, ...usersToTransfer);
            }
          }

          setUsers(copy);
        }
      }
    } catch (error) {
      console.error("Error handling drag end:", error);
    }
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i: any) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
    const indicators: any = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${type}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredUsers = users.filter((u) => u.type === type);
  const columnUserIds = filteredUsers.map((user) => user.id);
  const allColumnUsersSelected = columnUserIds.every((id) => selectedUsers.includes(id));

  const handleColumnSelect = (checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...new Set([...prev, ...columnUserIds])]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => !columnUserIds.includes(id)));
    }
  };

  return (
    <div className="w-80 border-2 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between m-4">
        <div className="flex items-center gap-2">
          <Checkbox id={`${type}-select-all`} checked={allColumnUsersSelected} onCheckedChange={handleColumnSelect} />
          <h3 className={`${headingColor}`}>{title}</h3>
        </div>
        <span className="rounded text-sm text-primary-40">{filteredUsers.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${active ? "bg-secondary" : "bg-primary/0"}`}
      >
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            handleDragStart={handleDragStart}
            isSelected={selectedUsers.includes(user.id)}
            onSelect={() => {
              setSelectedUsers((prev) =>
                prev.includes(user.id) ? prev.filter((id) => id !== user.id) : [...prev, user.id]
              );
            }}
          />
        ))}
        <DropIndicator beforeId={null} column={type} />
        <AddUser type={type} setUsers={setUsers} />
      </div>
    </div>
  );
};

interface UserCardProps {
  user: User;
  handleDragStart: (e: DragEvent<HTMLDivElement>, user: User) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, handleDragStart, isSelected, onSelect }) => {
  return (
    <>
      <DropIndicator beforeId={user.id} column={user.type} />
      <motion.div
        layout
        draggable="true"
        onDragStart={(e: any) => handleDragStart(e, user)}
        onClick={onSelect}
        className={`shadow-md shadow-black/20 cursor-grab rounded-lg border p-3 mx-3 mb-2 ${
          isSelected ? "border-violet-500 bg-violet-500/30" : "border-neutral-700 bg-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar}
            alt={`${user.name} ${user.surname}`}
            width={40}
            height={40}
            className="rounded-full bg-primary"
          />
          <div>
            <p className="text-sm font-medium text-primary">{`${user.name} ${user.surname}`}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <FlagIcon height={10} width={10} />
              <p className="text-xs text-gray-500">{user.phone}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

interface DropIndicatorProps {
  beforeId: string | null;
  column: UserType;
}

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, column }) => {
  return (
    <div data-before={beforeId || "-1"} data-column={column} className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0" />
  );
};

interface BurnBarrelProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const BurnBarrel: React.FC<BurnBarrelProps> = ({ setUsers, selectedUsers, setSelectedUsers }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    try {
      const userIds = JSON.parse(e.dataTransfer.getData("userIds")) as string[];

      if (userIds && userIds.length > 0) {
        // Eliminar usuarios seleccionados de la lista principal
        setUsers((prevUsers) => prevUsers.filter((user) => !userIds.includes(user.id)));
        setSelectedUsers([]); // Limpiar los usuarios seleccionados después del borrado
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`rounded-xl mt-4 grid h-32 w-32 shrink-0 place-content-center border text-3xl 
        ${active ? "border-red-800 bg-red-800/20 text-red-500" : "border-neutral-500 bg-primary/20 text-neutral-500"}`}
    >
      {active ? <Flame className="animate-bounce" /> : <Trash />}
    </div>
  );
};

interface AddUserProps {
  type: UserType;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AddUser: React.FC<AddUserProps> = ({ type, setUsers }) => {
  const [adding, setAdding] = useState(false);
  const [newUser, setNewUser] = useState<Omit<User, "type" | "id">>({
    avatar: "/avatar-icon.svg",
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email) return;

    const user: User = {
      id: Math.random().toString(),
      ...newUser,
      type,
    };

    setUsers((prev) => [...prev, user]);
    setAdding(false);
    setNewUser({
      avatar: "/avatar-icon.svg",
      name: "",
      surname: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div className="mx-3 mb-2">
      {adding ? (
        <motion.form layout onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Surname"
            value={newUser.surname}
            onChange={(e) => setNewUser((prev) => ({ ...prev, surname: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />

          <PhoneInput
            inputProps={{
              required: true,
              className:
                "block overflow-hidden border pl-12 border-gray-300 h-9 w-full bg-opacity-50 text-gray-950 mt-2 rounded-md shadow-sm",
            }}
            country={"es"}
            value={newUser.phone}
            onChange={(phone) => setNewUser((prev) => ({ ...prev, phone }))}
          />

          <div className="flex justify-end gap-2">
            <Button variant={"outline"} type="button" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button type="submit" variant={"default"} className="flex items-center gap-2">
              <span>Include User</span>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          className={cn(buttonVariants({ variant: "outline" }), "shadow-md border border-black")}
          layout
          onClick={() => setAdding(true)}
        >
          <span>Include User</span>
          <Plus className="h-4 w-4" />
        </motion.button>
      )}
    </div>
  );
};

const WhatsAppSender = ({ users }: { users: User[] }) => {
  const [whatsappUsers, setWhatsappUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [interval, setInterval] = useState(5);

  const handleSendMessages = () => {
    // Aquí iría la lógica para enviar mensajes recurrentemente
    console.log(`Enviando "${message}" cada ${interval} minutos a:`, whatsappUsers);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const userIds = JSON.parse(e.dataTransfer.getData("userIds"));
    const droppedUsers = users.filter((user) => userIds.includes(user.id));
    setWhatsappUsers((prev) => [...new Set([...prev, ...droppedUsers])]);
  };

  const removeUser = (userId: string) => {
    setWhatsappUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <form onSubmit={handleSendMessages} className="border-2 rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-bold text-center mb-4">WhatsApp Sender</h3>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex items-center justify-center min-h-[100px] border-2 border-dashed border-gray-400 bg-secondary rounded-lg p-2 mb-4"
      >
        {whatsappUsers.length === 0 ? (
          <p className="text-gray-400 text-center">Drag users here</p>
        ) : (
          <div className="space-y-2">
            {whatsappUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-2 shadow-md bg-white p-2 rounded-md">
                <div className="flex items-center space-x-2">
                  <Image
                    src={user.avatar}
                    alt={`${user.name} ${user.surname}`}
                    width={24}
                    height={24}
                    className="rounded-full bg-black"
                  />
                  <span>
                    {user.name} {user.surname}
                  </span>
                </div>
                <button onClick={() => removeUser(user.id)} className="text-red-500 hover:text-red-700">
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here"
        className="mb-4"
      />
      <div className="flex items-center space-x-2 mb-4">
        <label htmlFor="interval" className="text-sm">
          Send every
        </label>
        <Input
          id="interval"
          type="number"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="w-20"
          min={1}
        />
        <span className="text-sm">minutes</span>
      </div>
      <Button type="submit" className="w-full">
        <Send className="mr-2 h-4 w-4" /> Start Sending
      </Button>
    </form>
  );
};

const DEFAULT_USERS: User[] = [
  {
    id: "1",
    avatar: "/avatar-icon.svg",
    name: "John",
    surname: "Doe",
    phone: "+1 234 567 890",
    email: "john.doe@example.com",
    type: "regular",
  },
  {
    id: "2",
    avatar: "/avatar-icon.svg",
    name: "Jane",
    surname: "Smith",
    phone: "+1 234 567 891",
    email: "jane.smith@example.com",
    type: "vip",
  },
  {
    id: "3",
    avatar: "/avatar-icon.svg",
    name: "Michael",
    surname: "Johnson",
    phone: "+1 234 567 892",
    email: "michael.johnson@example.com",
    type: "regular",
  },
  {
    id: "4",
    avatar: "/avatar-icon.svg",
    name: "Emily",
    surname: "Davis",
    phone: "+1 234 567 893",
    email: "emily.davis@example.com",
    type: "vip",
  },
  {
    id: "5",
    avatar: "/avatar-icon.svg",
    name: "Robert",
    surname: "Brown",
    phone: "+1 234 567 894",
    email: "robert.brown@example.com",
    type: "regular",
  },
  {
    id: "6",
    avatar: "/avatar-icon.svg",
    name: "Olivia",
    surname: "Martinez",
    phone: "+1 234 567 895",
    email: "olivia.martinez@example.com",
    type: "vip",
  },
  {
    id: "7",
    avatar: "/avatar-icon.svg",
    name: "William",
    surname: "Garcia",
    phone: "+1 234 567 896",
    email: "william.garcia@example.com",
    type: "regular",
  },
  {
    id: "8",
    avatar: "/avatar-icon.svg",
    name: "Sophia",
    surname: "Miller",
    phone: "+1 234 567 897",
    email: "sophia.miller@example.com",
    type: "vip",
  },
  {
    id: "9",
    avatar: "/avatar-icon.svg",
    name: "James",
    surname: "Wilson",
    phone: "+1 234 567 898",
    email: "james.wilson@example.com",
    type: "regular",
  },
  {
    id: "10",
    avatar: "/avatar-icon.svg",
    name: "Ava",
    surname: "Taylor",
    phone: "+1 234 567 899",
    email: "ava.taylor@example.com",
    type: "vip",
  },
];
