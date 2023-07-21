/* eslint-disable react/display-name */
import { FC, FunctionComponent, Ref, forwardRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

const useSelect = (
	data: string[] | number[],
	placeholder: string,
	headerTitle?: string | undefined
): { selected: string; ItemPicker: FunctionComponent } => {
	const [selected, setSelected] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const ItemPicker: FC<{}> = ({}) => {
		return (
			<div className="text-xs">
				{headerTitle ? <h2 className="my-2">{headerTitle}</h2> : null}

				<Select.Root
					onOpenChange={setIsOpen}
					onValueChange={setSelected}
				>
					<Select.Trigger
						className={classnames(
							"w-full p-2 bg-white focus:bg-white text-sm text-afruna-blue border border-afruna-gray/20 flex justify-between items-center rounded-lg"
						)}
					>
						<Select.Value
							placeholder={selected ? selected : placeholder}
						/>
						<Select.Icon
							className={`${
								isOpen && "rotate-180"
							} transition ease-in-out delay-200 duration-500 `}
						>
							<ChevronDownIcon className="w-5 h-5 text-black font-extrabold" />
						</Select.Icon>
					</Select.Trigger>
					<Select.Portal className="z-10 bg-slate-50 rounded-md shadow-md text-[12px] text-afruna-blue transition-all ease-out duration-200 delay-700">
						<Select.Content position={"popper"}>
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
		forwarded: Ref<HTMLDivElement>
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
