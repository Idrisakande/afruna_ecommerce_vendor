/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

const useSelect = (
	data: string[] | number[],
	placeholder: string,
	headerTitle?: string | undefined
): { selected: string; ItemPicker: () => JSX.Element } => {
	const [selected, setSelected] = useState("");
	const ItemPicker = () => {
		return (
			<div>
				{headerTitle ? <h2 className="my-2">{headerTitle}</h2> : null}

				<Select.Root onValueChange={(val) => setSelected(val)}>
					<Select.Trigger className="w-full p-[18px] bg-white focus:bg-white text-sm text-slate-900 border border-slate-300 flex justify-between items-center rounded-lg">
						<Select.Value
							placeholder={selected ? selected : placeholder}
						/>
						<Select.Icon className="">
							<ChevronDownIcon className="w-5 h-5 text-black font-extrabold" />
						</Select.Icon>
					</Select.Trigger>
					<Select.Portal>
						<Select.Content className="SelectContent">
							<Select.ScrollUpButton className="">
								<ChevronUpIcon />
							</Select.ScrollUpButton>
							<Select.Viewport className="SelectViewport">
								{data.map((datum) => (
									<SelectItem
										key={datum}
										value={datum}
										className=""
									>
										{datum}
									</SelectItem>
								))}
							</Select.Viewport>
							<Select.ScrollDownButton className="SelectScrollButton">
								<ChevronDownIcon />
							</Select.ScrollDownButton>
						</Select.Content>
					</Select.Portal>
				</Select.Root>
			</div>
		);
	};
	return {
		selected,
		ItemPicker,
	};
};

const SelectItem = forwardRef(
	(
		{
			children,
			className,
			value,
			...props
		}: {
			children: React.ReactNode;
			className: string;
			value: string | number;
		},
		forwarded
	) => {
		return (
			<Select.Item
				value={value as string}
				className={classnames("", className)}
				{...props}
				ref={forwarded}
			>
				<Select.ItemText>{children}</Select.ItemText>
			</Select.Item>
		);
	}
);

export default useSelect;
