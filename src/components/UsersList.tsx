import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";
interface UsersListProps {
	active: boolean;
	id: number | string;
	number: number;
	name: string;
	img: string;
	lastMessage: string;
	selectChat: () => void;
}

export const UsersList: FC<UsersListProps> = ({
	id,
	img,
	number,
	name,
	active,
	lastMessage,
	selectChat,
}) => {
	return (
		<button
			onClick={selectChat}
			key={id}
			className="hover:bg-afruna-blue/5 p-4 mr-2 rounded-md flex gap-2 justify-start"
		>
			{/* <Avatar img={img} active={active} /> */}
			<Avatar.Root>
				<Avatar.Image
					className="object-cover rounded-full text-afruna-blue p-1 w-12 h-12"
					src={img}
				/>
				<Avatar.Fallback className="text-afruna-blue p-1 w-12 h-12 justify-center rounded-full bg-afruna-blue/20 flex uppercase items-center">
					{name.at(0)}
					{name.split(" ")[1].at(0)}
				</Avatar.Fallback>
			</Avatar.Root>
			<div className="flex flex-col text-left gap-1 w-full">
				<h2 className="text-sm text-afruna-blue font-semibold tracking-tight">
					{name}
				</h2>
				<p className="text-xs">{lastMessage ?? ""}</p>
				<p className="text-xs text-[#A2A2A2] tracking-tight">
					{(id as string).slice(0, 7)}
				</p>
				{number > 0 && (
					<div className="flex">
						<span className="bg-[#E1E2FF] mr-2 text-[#5D5FEF] text-xs rounded-full h-6 w-6 flex">
							{number}
						</span>
					</div>
				)}
			</div>
		</button>
	);
};
