import { Iuser } from "@/services/getUsers";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const UserTarget = ({ imageUrl, name, lastName, phone, email, id }: IUserTarget) => {
  return (
    <Link href={`/dashboard/users/${id}`}>
      <div className="flex gap-2 items-center text-sm md:text-base hover:bg-secondary rounded-l-full">
        <Avatar>
          {!imageUrl ? (
            <div className="bg-zinc-200 rounded-full flex justify-center items-center w-10 h-10">
              <span className="text-md font-bold text-black">{name && name[0]}</span>
            </div>
          ) : (
            <div className="rounded-full overflow-hidden h-10 w-10 bg-slate-300">
              {imageUrl && <AvatarImage src={imageUrl} />}
            </div>
          )}
        </Avatar>
        <div>
          <span className="text-primary">
            {name} {lastName}
          </span>
          <div className="flex flex-col md:flex-row md:gap-4 text-primary font-thin">
            <span>Phone: {phone}</span>
            <span>Email: {email}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserTarget;

export interface IUserTarget extends Pick<Iuser, "imageUrl" | "name" | "lastName" | "phone" | "email" | "id"> {}
