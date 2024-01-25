import { Model } from "@/components/Model";
import { FC, useCallback, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { IProduct } from "@/interfaces";
import Products from "@/services/products.service";

interface PopupModalProps {
	isOpen: boolean;
	onClose: () => void;
	products?:IProduct[]
	//   onDelete: () => void;
}

export const PopupModal: FC<PopupModalProps> = ({
	isOpen,
	onClose,
	products
	
}) => {

	const deleteproducts = useCallback(async () => {
		console.log(products);
		
		const productsService = new Products();
		if (products) {
		
				
				for (let item of products) { 
					productsService.deleteproduct(item._id)
			
			}
		}
		return;
		
	}, [products,]);
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
						onClick={
							 onClose}
						className={` border-slate-500 px-6 py-1 font-bold rounded-md border tracking-tight`}
					>
						No
					</button>
					<button
						onClick={() => { deleteproducts().finally(() => {
								onClose();
								
							}) }}
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
