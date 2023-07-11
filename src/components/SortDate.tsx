/* eslint-disable react/display-name */

import React, { FC } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

interface SortDateProps {
  className: string;
}

export const SortDate: FC<SortDateProps> = ({ className }) => {
  return (
    <Select.Root>
      <Select.Trigger
        className={classnames(
          className,
          "w-full py-2 px-3 bg-white focus:bg-white text-sm text-[#777777] border border-slate-300 flex justify-between items-center rounded-lg"
        )}
        aria-label="Food"
      >
        <Select.Value placeholder="Select Date" />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon className="w-5 h-5 text-black font-extrabold" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <Select.Label className="SelectLabel">Item 1</Select.Label>
              <SelectItem value="apple">Item 2</SelectItem>
              <SelectItem value="banana">Item 3</SelectItem>
              <SelectItem value="blueberry">Item 4</SelectItem>
              <SelectItem value="grapes">Item 5</SelectItem>
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
