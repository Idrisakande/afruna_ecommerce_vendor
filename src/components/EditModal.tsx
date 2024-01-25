import { Model } from "@/components/Model";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { InputLabel } from "./widgets/Input/InputLabel";
import { groupData } from "@/utils/grouped_field.util";
import Products from "@/services/products.service";
import { IProduct } from "@/interfaces/IProductItem";
import { InputLabelNumber } from "./widgets/Input/InputLabelNumber";
import CheckBoxLabel from "./widgets/CheckBoxLabel";
import ItemLabelPicker from "./widgets/ItemLabelPicker";
import { objectToFormData } from "@/utils/obj_to_formdata.util";
import { AppContext } from "@/contexts/AppProvider";
import { T_app_provider } from "@/types/t";

interface EditModalProps {
	isOpen: boolean;
	onClose: () => void;
	comfirmCallback: (val: boolean) => void;
	product?:IProduct
}

export const EditModal: FC<EditModalProps> = ({
	isOpen,
	onClose,
	comfirmCallback,
	product
	//   onDelete
}) => {
	const EditModel = true;
	const opt = useContext(AppContext) as T_app_provider;
	// const { categories } = useSelector((state: RootState) => state.categories);
	const [category, setCategory] = useState<{ _id: string; name: string }>({
		_id: "",
		name: "",
	});
	const [brand, setBrand] = useState(product?.brand);
	const [color, setColor] = useState<string>();
	const [colors, setColors] = useState([product?.color]);
	const [condition, setCondition] = useState(product?.condition);
	const [desc, setDescription] = useState(product?.desc);
	const [deliveryLocations, setdeliveryLocations] = useState(product?.deliveryLocations);
	const [discount, setDiscount] = useState(product?.discount);
	// const [metaData, setMetadata] = useState<string[]>([]);
	// const [name, setName] = useState<string>();
	// const [price, setPrice] = useState<number>();
	const [quantity, setQuantity] = useState(product?.quantity);
	const [size, setSizes] = useState([product?.size]);
	const [isLoading,setIsloading] = useState(false)

	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "flex";
	}, []);

	const handleSubmit = useCallback(async () => {

		comfirmCallback(true);
									onClose();

		const data = {
			// brand,
			condition,
			desc,
			discount,
			// name,
			// price,
			// quantity,
			// size,
			// color,
			// categoryId: category._id,
		};

		// const gp_delivery_loc = groupData<string, {}>(
		// 	deliveryLocations as string[],
		// 	"deliveryLocations",
		// );
		// const gp_colors = groupData(colors, "color");

		const products = Object.assign({}, 
            // gp_colors, gp_delivery_loc, 
            data);

		const formData = objectToFormData(products);
		// for (let i = 0; i < files.length; i++) {
		// 	formData.append("images", files[i].file as Blob);
		// }

		const productService = new Products();
		productService.updateProduct(product?._id as string,formData,{isLoading,setIsloading})
			
		

		/**
		 *
		 * @RESET all state
		 */
		setBrand("");
		setColors([]);
		setCondition("");
		setDescription("");
		setDiscount(0);
		// setMetadata([]);
		// setName("");
		// setPrice(0);
		setQuantity(0);
		setSizes([]);
	}, [
		brand,
		colors,
		condition,
		desc,
		discount,
		// metaData,
		// deliveryLocations,
		// name,
		// price,
		quantity,
		// size,
	]);

	// const handleColorAddition = useCallback(() => {
	// 	let COLORS: string[] = [];
	// 	const newColors = new Set([...colors, color]);
	// 	newColors.forEach((set) => COLORS.push(set as string));
	// 	setColors(COLORS);
	// }, [color, colors]);

	return (
		<Model
			isOpen={isOpen}
			onclose={onClose}
			title={""}
			rootClassName="max-w-[40%] w-full"
			EditModel={EditModel}
		>
			{/* <div className=""> */}
			{/* <div>texting</div> */}
			<ScrollArea.Root className="ScrollAreaRoot px-6 w-full h-[81vh] overflow-hidden grow">
				<ScrollArea.Viewport className="ScrollAreaViewport w-full h-full grow">
					<div className=" bg-white w-full text-afruna-blue flex flex-col pb-10 gap-6 justify-start px-8 items-start">
						<h1 className="font-bold text-xl">Product Name { product?.name}</h1>
						<form className="flex gap-6 justify-start items-start flex-col w-full">
							{/* <InputLabel
								type="text"
								getValue={(val) => setName(val as string)}
								headerTitle="Product Name"
								placeholder="Name of product"
							/> */}
							{/* <div className="flex flex-col gap-4 w-full">
								<div className="flex flex-col gap-2 justify-start items-start place-items-start">
									<label
										htmlFor="color-picker"
										className="mr-2 text-gray-700  flex flex-col justify-start items-start gap-3 w-fit"
									>
										<h3 className="font-semibold text-sm">
											Choose a color:
										</h3>
										<div className="flex justify-start items-start place-items-start space-x-4 h-fit w-fit ">
											<div className="flex gap-2 justify-start items-center">
												{color && color.length > 0 ? (
													<button
														onClick={
															handleColorAddition
														}
														className={
															"px-2 py-1 border border-afruna-blue rounded text-xs"
														}
													>
														Add color
													</button>
												) : null}
												{colors.length ? (
													<>
														<button
															onClick={() =>
																setColors([])
															}
															className={
																"px-2 py-1 border border-afruna-blue rounded text-xs"
															}
														>
															Reset color
														</button>
													</>
												) : null}
											</div>
											<fieldset className="w-fit justify-start cursor-pointer">
												<input
													type="color"
													id="color-picker"
													className="appearance-none w-8 h-8 "
													onChange={(e) =>
														setColor(e.target.value)
													}
												/>
											</fieldset>
										</div>
									</label>
									<div className="flex flex-wrap justify-start items-center gap-1">
										{colors.map((color, idx) => (
											<span
												key={idx}
												style={{ background: color }}
												className={`h-6 w-8`}
											/>
										))}
									</div>
								</div>
								<CheckBoxLabel
									getselectedChecks={(checks) =>
										setSizes(checks)
									}
									headerTitle="Size"
									placeholders={["S", "M", "L", "XL", "XXL"]}
								/>
							</div>
							<div className="flex gap-3">
                            <InputLabelNumber
								getValue={(val) =>
									setPrice(val as unknown as number)
								}
								headerTitle="Price (in NGN)"
								placeholder="0"
								prefix
								suffix
							/>
							<InputLabelNumber
								getValue={(val) =>
									setDiscount(val as unknown as number)
								}
								headerTitle="Discount (in %)"
								placeholder="0"
								suffix
							/>
                            </div> */}
							{/* <div className="flex gap-3 w-full">
                            
							<ItemLabelPicker
								items={[
									"New",
									">90% New",
									"Used",
									"Refurblished",
									"Old items",
								]}
								contentClassName="z-20"
								triggerClassName="flex text-sm space-x-1 items-center text-afruna-blue border border-afruna-gray/30 p-3 rounded-md"
								getSelected={(val) =>
									setCondition(val as string)
								}
								headerTitle="Product Condition"
								placeholder="Conditon"
							/>
                            <ItemLabelPicker
								items={[
									"Brand X",
									"Brand Y",
									"Brand Z",
									"Brand Z-X",
									"Brand X-Y",
								]}
								contentClassName="z-20"
								triggerClassName="flex text-sm space-x-1 items-center text-afruna-blue border border-afruna-gray/30 p-3 rounded-md"
								getSelected={(val) => setBrand(val as string)}
								headerTitle="Brand"
								placeholder="Select brand"
							/>
                            </div> */}
							<div className="flex flex-col gap-2 place-items-start justify-start">
								<label htmlFor="condition">Condition</label>
									<input type="text" id="condition" className="p-3 border rounded-lg " placeholder="condition" onChange={(e)=> setCondition(e.target.value)} />
							</div>
							
						

							<InputLabelNumber
								getValue={(val) =>
									setDiscount(val as unknown as number)
								}
								headerTitle="Discount"
								placeholder="0"
								suffix
							/>
							<div className="flex flex-col w-full justify-start items-start">
								<h3 className="mb-2 text-sm font-semibold">
									Product Description
								</h3>
								<fieldset className="w-full border-[1px] border-slate-300 rounded-md">
									<textarea
										onChange={(val) =>
											setDescription(val.target.value)
										}
										rows={5}
										className="p-3 w-full resize-none placeholder:text-sm"
										placeholder="Describe your product"
									/>
								</fieldset>
							</div>
						</form>

						<div
							className={`  flex justify-end items-center gap-6 w-full`}
						>
							<button
								type="button"
						onClick={() => {
							comfirmCallback(false);
							onClose();
						}}
						className={` border-slate-500 px-6 py-1 font-bold rounded-md border tracking-tight`}
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSubmit}
								className="px-6 py-1 rounded-md text-white font-bold bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 tracking-tight"
							>
								Edit
							</button>
						</div>
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200"
					orientation="vertical"
				>
					<ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
				</ScrollArea.Scrollbar>
				<ScrollArea.Scrollbar
					className="ScrollAreaScrollbar p-[2px] flex "
					orientation="horizontal"
				>
					<ScrollArea.Thumb className="rounded-xl" />
				</ScrollArea.Scrollbar>
				<ScrollArea.Corner className="bg-slate-100 hover:bg-slate-200" />
			</ScrollArea.Root>
			{/* </div> */}
		</Model>
	);
};
