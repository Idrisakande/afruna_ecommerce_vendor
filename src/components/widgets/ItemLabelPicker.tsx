/* eslint-disable react/display-name */
import { FC, Ref, forwardRef, memo, useState } from "react";
import classnames from "classnames";
import * as Select from "@radix-ui/react-select";
import { MdCheck } from "react-icons/md";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

import { ISelectPicker } from "@/interfaces/selectPicker.interface";

// tailwind style to move div to the right end of the screen
const ItemLabelPicker: FC<
	ISelectPicker & {
		headerTitle?: string;
	}
> = ({
	items,
	placeholder,
	triggerLeftIcon,
	getSelected,
	contentClassName,
	triggerClassName,
	headerTitle,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="flex flex-col justify-start items-start gap-1 w-full">
			<h1 className="my-1 font-semibold text-sm">{headerTitle}</h1>
			<Select.Root onOpenChange={setIsOpen} onValueChange={getSelected}>
				<Select.Trigger
					className={classnames(
						`w-full bg-white focus:bg-white text-sm text-slate-900 border border-slate-300 flex justify-between items-center rounded-lg`,
						triggerClassName,
					)}
				>
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
							} transition ease-in duration-200 w-5 h-5`}
						/>
					</Select.Icon>
				</Select.Trigger>
				<Select.Portal
					className={classnames(
						" bg-slate-50 rounded-md shadow-md text-afruna-blue w-full overflow-y-auto border border-slate-300 transition-all ease-out duration-200 delay-700",
						contentClassName,
					)}
				>
					<Select.Content position="popper">
						<Select.ScrollUpButton className="">
							<RxChevronUp />
						</Select.ScrollUpButton>
						<Select.Viewport className="p-2 gap-2 flex flex-col rounded-md  bg-white">
							{items?.length ? (
								items.map((item, idx) => (
									<SelectItem key={idx + item} value={item} 
									className="text-xs md:text-sm cursor-pointer">
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
		</div>
	);
};
const SelectItem = forwardRef(
	(props: Select.SelectItemProps, ref: Ref<HTMLDivElement>) => {
		const { className, children, ...otherProps } = props;
		return (
			<Select.Item
				className={classnames(
					"px-3 p-1 hover:bg-slate-500 hover:text-white flex justify-between items-center ",
					className,
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
	},
);
export default memo(ItemLabelPicker);
