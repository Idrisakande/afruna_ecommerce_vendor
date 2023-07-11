import { FC, ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoMenuOutline } from "react-icons/io5";

interface CategoryDropdownMenuProps {
  children: ReactNode;
}

export const CategoryDropdownMenu: FC<CategoryDropdownMenuProps> = ({
  children,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="hover:cursor-pointer" asChild>
        <div className="flex justify-start items-start">
          <IoMenuOutline size={26} />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={
            "bg-white ml-28 -mt-2 px-2 py-4 w-[150px] shadow-md rounded-md flex flex-col"
          }
          sideOffset={15}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
