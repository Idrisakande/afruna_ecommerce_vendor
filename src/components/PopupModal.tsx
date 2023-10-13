import { Model } from "@/components/Model";
import { FC, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface PopupModalProps {
	isOpen: boolean;
	onClose: () => void;
	comfirmCallback:(val:boolean) => void;
	//   onDelete: () => void;
}

export const PopupModal: FC<PopupModalProps> = ({
	isOpen,
	onClose,
	comfirmCallback
	
}) => {
	return (
		<Model
			isOpen={isOpen}
			onclose={onClose}
			title={""} 
			rootClassName="max-w-[30%] w-full"
			//   deleteModel={deleteModel}
		>
			<div className="bg-white w-full flex flex-col pb-10 gap-6 justify-center items-center">
				<h2 className="font-semibold text-afruna-blue text-sm">
					Are you sure you want to delete the products?
				</h2>

				<div className={`  flex justify-end items-center gap-6`}>
					<button
						type="button"
						onClick={() => {
							comfirmCallback(false);
							onClose();
						}}
						className={` border-slate-500 px-6 py-1 font-bold rounded-md border tracking-tight`}
					>
						No
					</button>
					<button
						onClick={() => { comfirmCallback(true); onClose(); }}
						//   onClick={onDelete}
						type="button"
						className="px-6 py-1 rounded-md text-white font-bold bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 tracking-tight"
					>
						Yes
					</button>
				</div>
			</div>
		</Model>
	);
};
