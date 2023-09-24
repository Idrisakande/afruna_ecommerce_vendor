import { StaticImageData } from "next/image";
import { FC } from "react";
import { Avatar } from "./widgets/Avatar";
import { HiPhone } from "react-icons/hi";
import { IoAlertCircle } from "react-icons/io5";

interface CurrentUserHeaderProps {
  active: boolean;
  id: string|undefined;
  name: string|undefined;
  img: string|undefined;
}

export const CurrentUserHeader: FC<CurrentUserHeaderProps> = ({
  id,
  active,
  name,
  img,
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-5 justify-start items-center">
        <Avatar img={img} active={active} />
        <div className="flex flex-1 flex-col gap-1">
          <h2 className="text-sm font-semibold tracking-tight text-[#0C0E3B]">
            {name}
          </h2>
          <p className="text-xs text-[#A2A2A2] tracking-tight">{id}</p>
        </div>
      </div>
      <div className="flex justify-between items-center max-w-[5rem] w-full text-[#0C0E3B]">
        <HiPhone
          size={37}
          className="p-2 rounded-full cursor-pointer hover:bg-[#0C0E3B]/20  transition duration-300"
        />
        <IoAlertCircle
          size={37}
          className="p-2 rounded-full cursor-pointer hover:bg-[#0C0E3B]/20 transition duration-300"
        />
      </div>
    </div>
  );
};
