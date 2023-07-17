/* eslint-disable react/display-name */
import { FC, ReactElement, memo } from "react";
import classnames from "classnames";

export const CreateBtn: FC<{
	placeholder: string;
	placeholderClassName?: string;
	prefixIcon?: ReactElement;
	suffixIcon?: ReactElement;
}> = memo((props) => (
	<button className="flex justify-around items-center rounded-md text-xs w-fit py-2 px-5  text-white bg-gradient-y-deepblue hover:bg-gradient-whitishblue ">
		{props.prefixIcon ? props.prefixIcon : null}
		<span className={classnames("mx-3", props.placeholderClassName)}>
			{props.placeholder}
		</span>
		{props.suffixIcon ? props.suffixIcon : null}
	</button>
));
