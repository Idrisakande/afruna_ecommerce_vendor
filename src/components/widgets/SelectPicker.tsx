/* eslint-disable react/display-name */
import { FC, Ref, forwardRef, useState } from "react";
import classnames from "classnames";
import * as Select from "@radix-ui/react-select";
import { MdCheck } from "react-icons/md";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

import { ISelectPicker } from "@/interfaces/selectPicker.interface";

// tailwind style to move div to the right end of the screen
export const SelectPicker: FC<ISelectPicker> = ({
	items,
	placeholder,
	triggerLeftIcon,
	getSelected,
	contentClassName,
	triggerClassName,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Select.Root onOpenChange={setIsOpen} onValueChange={getSelected}>
			<Select.Trigger className={classnames("", triggerClassName)}>
				{triggerLeftIcon && (
					<Select.Icon className="text-sm">
						{triggerLeftIcon}
					</Select.Icon>
				)}
				<Select.Value placeholder={placeholder ?? "list items"} />
				<Select.Icon className="text-lg">
					<RxChevronDown
						className={`${
							isOpen && "rotate-180"
						} transition ease-in duration-200`}
					/>
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal
				className={classnames(
					"z-10 bg-slate-50 rounded-md shadow-md text-[12px] text-afruna-blue transition-all ease-out duration-200 delay-700",
					contentClassName
				)}
			>
				<Select.Content position="popper">
					<Select.ScrollUpButton className="">
						<RxChevronUp />
					</Select.ScrollUpButton>
					<Select.Viewport>
						{items?.length ? (
							items.map((item, idx) => (
								<SelectItem key={idx + item} value={item}>
									{item}
								</SelectItem>
							))
						) : (
							<></>
						)}
					</Select.Viewport>
					<Select.ScrollDownButton className="SelectScrollButton">
						<RxChevronDown />
					</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};
const SelectItem = forwardRef(
	(props: Select.SelectItemProps, ref: Ref<HTMLDivElement>) => {
		const { className, children, ...otherProps } = props;
		return (
			<Select.Item
				className={classnames(
					"px-3 p-1 hover:bg-slate-500 hover:text-white flex justify-between items-center ",
					className
				)}
				{...otherProps}
				ref={ref}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className="SelectItemIndicator">
					<MdCheck />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}
);
