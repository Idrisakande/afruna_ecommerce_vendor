import React, {Ref} from "react";
import * as Select from "@radix-ui/react-select";
import classNames from "classnames";
import { CheckIcon } from "@radix-ui/react-icons";

export const SelectItem = React.forwardRef(
	(
		{ children, className, ...props }: Select.SelectItemProps,
		forwardedRef: Ref<HTMLDivElement>
	) => {
		return (
			<Select.Item
				className={classNames("flex gap-2 p-1 items-center", className)}
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