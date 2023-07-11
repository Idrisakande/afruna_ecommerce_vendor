// /* eslint-disable react/display-name */
// import React from "react";
// import * as Select from "@radix-ui/react-select";
// import classnames from "classnames";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { GiWorld } from "react-icons/gi";

// export const Picker = ({
// 	data,
// }: {
// 	data: [
// 		{
// 			leftIcon?: React.ReactElement;
// 			value: string;
// 		}
// 	];
// }) => (
// 	<Select.Root>
// 		<Select.Trigger
// 			className="flex w-fit p-2 justify-evenly items-center"
// 			aria-label="languages"
// 		>
// 			<GiWorld className="text-slate-500" />
// 			<Select.Value className="" placeholder="" />
// 			<FaChevronDown className="text-slate-500" />
// 		</Select.Trigger>
// 		<Select.Portal>
// 			<Select.Content className="-ml-4 bg-slate-100 w-[100px]">
// 				<Select.ScrollUpButton className="">
// 					<FaChevronUp className="text-slate-300" />
// 				</Select.ScrollUpButton>
// 				<Select.Viewport className="">
// 					{data?.map(({ value, leftIcon }) => (
// 						<SelectItem
// 							key={value}
// 							className="flex w-auto p-1 justify-between items-center hover:bg-slate-300 hover:cursor-pointer"
// 							value={value}
// 						>
// 							{leftIcon && leftIcon}
// 							{value}
// 						</SelectItem>
// 					))}
// 				</Select.Viewport>
// 				<Select.ScrollDownButton className="SelectScrollButton">
// 					<FaChevronDown className="text-slate-500" />
// 				</Select.ScrollDownButton>
// 			</Select.Content>
// 		</Select.Portal>
// 	</Select.Root>
// );
// const SelectItem = React.forwardRef(
// 	(
// 		{
// 			children,
// 			className,
// 			...props
// 		}: { children: React.ReactNode; className: string },
// 		forwardedRef
// 	) => {
// 		return (
// 			<Select.Item
// 				className={classnames("", className)}
// 				{...props}
// 				ref={forwardedRef}
// 			>
// 				<Select.ItemText>{children}</Select.ItemText>
// 				{/* <Select.ItemIndicator className="SelectItemIndicator">
// 					<FaCheck className="text-blue-700" />
// 				</Select.ItemIndicator> */}
// 			</Select.Item>
// 		);
// 	}
// );
