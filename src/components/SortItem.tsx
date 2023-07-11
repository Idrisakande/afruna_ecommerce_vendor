/* eslint-disable react/display-name */

import React, { FC } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

interface SortItemProps {
  className?: string;
  placeholder: string;
  item_1?: string;
  item_2?: string;
  item_3?: string;
  item_4?: string;
  item_5?: string;
  item_6?: string;
}

export const SortItem: FC<SortItemProps> = ({
  className,
  placeholder,
  item_1,
  item_2,
  item_3,
  item_4,
  item_5,
  item_6,
}) => {
  return (
    <Select.Root>
      <Select.Trigger
        className={classnames(
          className,
          "w-full py-2 px-3 bg-white focus:bg-white text-sm text-[#777777] border border-slate-300 flex justify-between items-center rounded-lg"
        )}
        aria-label="Food"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon className="w-5 h-5 text-black font-extrabold" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport z-50">
            <Select.Group>
              {item_1 && (
                <SelectItem
                  value="apple"
                  className="cursor-pointer outline-none text-xs text-slate-500/70 p-2 rounded hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300"
                >
                  {item_1}
                </SelectItem>
              )}
              {item_2 && (
                <SelectItem
                  value="banana"
                  className="cursor-pointer outline-none text-xs text-slate-500/70 p-2 rounded hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300"
                >
                  {item_2}
                </SelectItem>
              )}
              {item_3 && (
                <SelectItem
                  value="blueberry"
                  className="cursor-pointer outline-none text-xs text-slate-500/70 p-2 rounded hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300"
                >
                  {item_3}
                </SelectItem>
              )}
              {item_4 && (
                <SelectItem
                  value="grapes"
                  className="cursor-pointer outline-none text-xs text-slate-500/70 p-2 rounded hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300"
                >
                  {item_4}
                </SelectItem>
              )}
              {item_5 && (
                <SelectItem
                  value="gpes"
                  className="cursor-pointer outline-none text-xs text-slate-500/70 p-2 rounded hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300"
                >
                  {item_5}
                </SelectItem>
              )}
              {item_6 && (
                <SelectItem
                  value="grape"
                  className="cursor-pointer outline-none text-xs text-slate-500/70 p-2 rounded hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300"
                >
                  {item_6}
                </SelectItem>
              )}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: { children: React.ReactNode; className: string },
    forwardedRef
  ) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
