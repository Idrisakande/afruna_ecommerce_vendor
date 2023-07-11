import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import { Avatar } from "./widgets/Avatar";

interface UsersListProps {
  active: boolean;
  id: number;
  number: number;
  name: string;
  img: StaticImageData;
}

export const UsersList: FC<UsersListProps> = ({
  id,
  img,
  number,
  name,
  active,
}) => {
  return (
    <>
      <div
        key={id}
        className="bg-white p-4 mr-2 rounded-md flex gap-5 justify-start items-center"
      >
        <Avatar img={img} active={active} />
        <div className="flex flex-1 flex-col gap-1 w-full">
          <h2 className="text-sm text-[#0C0E3B] font-semibold tracking-tight">
            {name}
          </h2>
          <p className="text-xs text-[#A2A2A2] tracking-tight">#CU679H</p>
        </div>
        {number > 0 && (
          <div className="flex">
            <span className="bg-[#E1E2FF] mr-2 text-[#5D5FEF] text-xs rounded-full h-6 w-6 flex justify-center items-center">
              {number}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
