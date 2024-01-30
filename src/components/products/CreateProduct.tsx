import {
	FC,
	ReactNode,
	memo,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { IProductContext } from "@/interfaces/IProductContext";
import { productcontext } from "@/contexts/ProductProvider";
import { MdAdd, MdCancel, MdClose, MdDelete, MdImage } from "react-icons/md";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { InputLabelNumber } from "../widgets/Input/InputLabelNumber";
import CheckBoxLabel from "../widgets/CheckBoxLabel";
import { InputLabel } from "../widgets/Input/InputLabel";
import { InputData } from "../widgets/Input/InputData";
import Products from "@/services/products.service";
import { AppContext } from "@/contexts/AppProvider";
import { T_app_provider } from "@/types/t";
import { IProduct } from "@/interfaces/IProductItem";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import PageLoader from "../widgets/PageLoarder";
import { objectToFormData } from "@/utils/obj_to_formdata.util";
import { groupData } from "@/utils/grouped_field.util";
import ItemLabelPicker from "../widgets/ItemLabelPicker";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { T_Category } from "@/types/categories.type";
import { getNonEmptyInputValues } from "@/utils/get_non_empty_input_values";

export const CreateProduct: FC<{}> = memo(({}) => {
	const { bio_data } = useSelector((state: RootState) => state.user);
	console.log(bio_data);

	const router = useRouter();
	const { tab } = useContext(productcontext) as IProductContext;
	const opt = useContext(AppContext) as T_app_provider;
	const { categories } = useSelector((state: RootState) => state.categories);
	const [category, setCategory] = useState<T_Category>();
	const [brand, setBrand] = useState<string>();
	const [color, setColor] = useState<string>();
	const [colors, setColors] = useState<string[]>([]);
	const [condition, setCondition] = useState<string>();
	const [desc, setDescription] = useState<string>();
	const [deliveryLocations, setdeliveryLocations] = useState<string[]>([]);
	const [discount, setDiscount] = useState<number>(0);
	const [metaData, setMetadata] = useState<string[]>([]);
	const [name, setName] = useState<string>();
	const [price, setPrice] = useState<number>();
	const [quantity, setQuantity] = useState<number>();
	const [size, setSizes] = useState<string[]>([]);
	const [files, setFiles] = useState<ExtFile[]>([]);
	const [inputValues, setInputValues] = useState<{
		[key: string]: string[];
	}>({}); //values for all input
	interface IVariant {
		[key: string]: string | number;
	}

	const [productVariants, setProductVariants] = useState<IVariant[]>([]);

	const [isAttributeModalOpen, setIsAttributeModalOpen] =
		useState<boolean>(false);
	//add more variant for the product
	const addProductVariants = useCallback(() => {
		if (category && category.options) {
			const newVariant = category.options.reduce(
				(acc: IVariant, option) => {
					acc[option] = ""; // Initialize with empty values for category options
					return acc;
				},
				{ quantity: 0 },
			);
			setProductVariants((prevVariants) => [...prevVariants, newVariant]);
		}
		return;
	}, [category]);

	// Function to handle user input for product variants
	const handleVariantChange = (
		index: number,
		field: string,
		value: string,
	) => {
		const updatedVariant = [...productVariants]; //get a copy array of the variants;
		updatedVariant[index][field] = value;
		setProductVariants(updatedVariant);
	};
	// Handle changes in input values
	const handleInputChange = useCallback(
		(options: string[], name: string) => {
			setInputValues({
				...inputValues,
				[name.toLowerCase()]: options,
			});
		},
		[inputValues],
	);

	const handleSelectCategory = useCallback(
		(val: string) => {
		  const cat = categories.find((i) => i.name === val);
		  setCategory(cat as { _id: string; name: string });
		  //reset product variant when new category is selecteed
		  if (category && category.name !== val) {
			setProductVariants([]);
		  }
		},
		[categories, category]
	  );

	const updateFiles = useCallback((incommingFiles: ExtFile[]) => {
		if (incommingFiles.length <= 10) {
			setFiles(
				incommingFiles.filter((file) => {
					if (
						(file.size?.toFixed(3) as unknown as number) <
						500 * 1024
					) {
						return file;
					} else {
						alert(`The file size of ${file.name} is too large.`);
						return;
					}
				}),
			);
		} else {
			alert("Maximum files reached!");
		}
	}, []);
	const removeFile = useCallback(
		(id: string | number | undefined) => {
			setFiles(files.filter((x: ExtFile) => x.id !== id));
		},
		[files],
	);
	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "flex";
	}, []);
	const handleSubmit = useCallback(async () => {
		if (category && !category._id) {
			toast.warn("Product category required");
			return;
		}
		if (!name?.length) {
			toast.warn("Product name required");
			return;
		}
		if (!colors?.length) {
			toast.warn("Color(s) required");
			return;
		}
		if (!size?.length) {
			toast.warn("Size field required");
			return;
		}
		if (!condition?.length) {
			toast.warn("Condition field required");
			return;
		}
		if (!desc?.length) {
			toast.warn("Product description required");
			return;
		}
		if (!files?.length) {
			toast.warn("Product images required");
			return;
		}
		if (!price || price <= 0) {
			toast.warn("Product price must be provided!");
			return;
		}
		if (!quantity || quantity === 0) {
			toast.warn("Product quantity required! Proceed by adding attribute(s).");
			return;
		  }
		if (!brand?.length) {
			toast.warn("Product brand required");
			return;
		}
		if (!brand?.length) {
			toast.warn("Product size required");
			return;
		}
		if (!metaData?.length) {
			toast.warn("#MetaData required");
			return;
		}
		if (!deliveryLocations?.length) {
			toast.warn("DeliveryLocation required");
			return;
		}
		const data = {
			brand,
			condition,
			desc,
			discount,
			name,
			price,
			quantity,
			size,
			coverPhoto: files[0].file,
			categoryId: category?._id,
		};

		const nonEmptyInputValues = getNonEmptyInputValues(inputValues);
		const gp_delivery_loc = groupData<string, {}>(
			deliveryLocations,
			"deliveryLocations",
		);

		const gp_meta = groupData<string, {}>(metaData, "metaData");
		const gp_colors = groupData(colors, "color");
		const transformedData = Object.entries(nonEmptyInputValues).reduce(
			(accum, entry) => {
				const [keys, values] = entry;
				if (values.length) {
					values.map((value, idx) => {
						const id = `${keys}[${idx}]`;
						accum[id] = value; //store new key value
					});
				}
				return accum;
			},
			{} as { [key: string]: string },
		);

		const product = Object.assign(
			{},
			gp_colors,
			gp_meta,
			gp_delivery_loc,
			data,
			transformedData,
		);

		const formData = objectToFormData(product);
		for (let i = 0; i < files.length; i++) {
			formData.append("images", files[i].file as Blob);
		}
		formData.append("options", JSON.stringify(productVariants));
		const productService = new Products();
		productService
			.createProduct(formData as unknown as IProduct, {
				setIsloading: opt.setIsloading,
				/**
				 *
				 * @RESET all state
				 */
			})
			.finally(() => {
				setBrand("");
				setColors([]);
				setCondition("");
				setDescription("");
				setDiscount(0);
				setMetadata([]);
				setName("");
				setPrice(0);
				setQuantity(0);
				setSizes([]);
				setFiles([]);
				setInputValues({});
				setIsAttributeModalOpen(false);
				setCategory(undefined);
				setProductVariants([]);
				router.push("/products");
			});
	}, [
		brand,
		colors,
		condition,
		desc,
		discount,
		metaData,
		deliveryLocations,
		name,
		price,
		quantity,
		size,
		files,
		category?._id,
		inputValues,
		productVariants,
	]);

	const handleColorAddition = useCallback(() => {
		let COLORS: string[] = [];
		const newColors = new Set([...colors, color]);
		newColors.forEach((set) => COLORS.push(set as string));
		setColors(COLORS);
		setColor("");
	}, [color, colors]);

	useEffect(() => {
		const totalQauantity = productVariants.reduce(
			(accum, value) => accum + parseInt(value.quantity as string),
			0,
		);
		console.log(totalQauantity);

		setQuantity(totalQauantity);
	}, [productVariants]);
	if (opt.isLoading) {
		return <PageLoader />;
	}

	return (
		<Content>
			<Header headerTitle={tab} />
			<main className="my-8 m-12 pb-20 grid grid-cols-12 bg-white rounded-xl gap-4 md:gap-8">
				<div className="col-span-full md:col-span-5 p-10">
					<div className="">
						<Dropzone
							value={files}
							onChange={updateFiles}
							maxFiles={5}
							maxFileSize={500 * 1024}
							type="image/*"
							default={false}
							header={false}
							footer={false}
							multiple
						>
							<div className="relative flex flex-col items-center text-slate-900">
								<span className="relative">
									<MdImage size={43} />
									<MdAdd
										size={18}
										className="font-bold absolute top-[29px] left-[29px] bg-white rounded-full"
									/>
								</span>
								<button className="my-2 p-2 rounded-[5px] bg-gradient-whitishblue text-white text-[12px] text-xs">
									Select Photo
								</button>
								<h3 className="text-[12px] md:text-xs text-slate-600">
									Or drag photo here{" "}
								</h3>
								<span className="md:text-xs text-slate-400">
									(up to 10 photos)
								</span>
							</div>
						</Dropzone>
						{files.length > 0 && (
							<div className="mt-4 flex flex-wrap gap-4 w-full h-[40vh] overflow-y-auto">
								{files.map((file, id) => (
									<div className="" key={file.id}>
										<header className="flex justify-between items-center relative top-1 z-10 rounded-t-lg bg-gray-800 text-white text-[12px] md:text-xs p-2">
											<h3>Cover</h3>
											<span className="rounded-full font-semibold bg-white text-gray-700 flex justify-center items-center w-5 h-5 ">
												{id + 1}
											</span>
										</header>
										<FileMosaic {...file} preview />
										<span
											onClick={() => removeFile(file.id)}
										>
											<MdDelete size={20} />
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div className="col-span-full md:col-span-7 p-10 space-y-4 transition-all duration-300">
					<ItemLabelPicker
						items={categories.map((cat) => cat.name)}
						headerTitle="Categories"
						placeholder="Select categories"
						key={"Items"}
						contentClassName="z-20 max-h-[30vh] overflow-y-auto"
						triggerClassName="flex text-sm space-x-1 items-center text-afruna-blue border border-afruna-gray/30 p-3 rounded-md"
						getSelected={handleSelectCategory}
					/>
					<InputLabel
						type="text"
						getValue={(val) => setName(val as string)}
						headerTitle="Product Name"
						placeholder="Name of product"
					/>
					<div className="w-full flex flex-col gap-5">
						{/* <ColorSelector
							colors={[
								"red",
								"green",
								"yellow",
								"gray",
								"lightblue",
							]}
							getselectedColor={(color) => setColor(color)}
							headerTitle="Colors"
						/> */}
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2 justify-start items-start place-items-start">
								<label
									htmlFor="color-picker"
									className="mr-2 text-gray-700  flex flex-col justify-start items-start gap-3 w-full"
								>
									<h3 className="font-semibold text-sm">
										Choose a color:
									</h3>
									<div className="flex justify-between items-start place-items-start space-x-4 h-fit w-fit ">
										<div className="flex flex-col gap-2">
											<fieldset className="w-fit justify-start cursor-pointer">
												<input
													type="color"
													id="color-picker"
													className="appearance-none w-16 h-12"
													onChange={(e) =>
														setColor(e.target.value)
													}
												/>
											</fieldset>
											<div className="flex flex-wrap justify-start items-center gap-1">
												{colors.map((color, idx) => (
													<span
														key={idx}
														style={{
															background: color,
														}}
														className={`h-6 w-8`}
													/>
												))}
											</div>
										</div>
										<div className="flex gap-2 justify-start items-center">
											{color && color.length > 0 ? (
												<button
													onClick={
														handleColorAddition
													}
													className={
														"p-3 border border-afruna-blue/70 rounded text-sm"
													}
												>
													Add color
												</button>
											) : null}
											{colors.length ? (
												<>
													<button
														onClick={() => {
															setColors([]);
															setColor("");
														}}
														className={
															"p-3 border border-afruna-gold/70 rounded text-sm"
														}
													>
														Reset colors
													</button>
												</>
											) : null}
										</div>
									</div>
								</label>
							</div>
							<CheckBoxLabel
								getselectedChecks={(checks) => setSizes(checks)}
								headerTitle="Size"
								placeholders={["S", "M", "L", "XL", "XXL"]}
							/>
						</div>
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
						{/* <InputLabelNumber
							getValue={(val) =>
								setQuantity(val as unknown as number)
							}
							headerTitle="Quantiy"
							placeholder="0"
							suffix
						/> */}
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
							getSelected={(val) => setCondition(val as string)}
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
					</div>
					{categories && category && productVariants.length > 0
						? productVariants.map((variant, index) => (
								<div key={index} className="gap-2">
									<div className="flex gap-1 items-center">
										<h1 className="font-bold text-sm">
											Variant {index + 1}
										</h1>
										{/* remove variant */}
										<button
											onClick={() => {
												const newVariants =
													productVariants.filter(
														(_, idx) =>
															index !== idx,
													);
												setProductVariants(newVariants);
											}}
										>
											<MdCancel />
										</button>
									</div>
									<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 border rounded-lg p-2">
										{Object.entries(variant).map(
											([option, value], idx) => (
												<input
													type={
														option === "quantity" ||
														option.toLocaleLowerCase() ===
															"discount"
															? "number"
															: "text"
													}
													className="p-1 rounded-md border"
													key={idx}
													placeholder={option}
													onChange={(e) =>
														handleVariantChange(
															index,
															option,
															e.target.value,
														)
													}
												/>
											),
										)}
									</div>
								</div>
						  ))
						: null}
					<div className="grid grid-rows-2">
						<h1>Total Quantity</h1>
						<input
							type="number"
							className="p-1 rounded-md border"
							placeholder="0"
							value={quantity}
							disabled
						/>
					</div>
					<InputData
						getMetadata={(meta) => setMetadata(meta)}
						headerTitle="Meta Data"
						placeholder="keywords"
					/>
					<InputData
						getMetadata={(locales) => setdeliveryLocations(locales)}
						headerTitle="Delivery Locations"
						placeholder="Locations"
					/>

					<div className="flex gap-2">
						<input
							type="checkbox"
							name="worldwide"
							id="worldwide"
						/>
						<label htmlFor="worldwide" className="text-sm">
							World wide
						</label>
					</div>
					<div className="flex flex-col">
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
						<div className="flex justify-between items-center self-end mt-8 space-x-8">
							{/* <button
								onClick={() =>
									setIsAttributeModalOpen((prev) => !prev)
								}
								className={` ${
									isAttributeModalOpen && "border-gray-300"
								} px-4 py-3 text-[12px] font-semibold md:text-sm border-[1px] border-afruna-blue rounded-md
							`}
							>
								{isAttributeModalOpen
									? "Hide"
									: "Add More Attributes"}
							</button> */}
							<button
								onClick={addProductVariants}
								className=" px-4 py-3 text-[12px] font-semibold md:text-sm border-[1px] border-afruna-blue rounded-md"
							>
								Add Attribuites
							</button>
							<button
								title={
									bio_data?.blocked
										? "You can not create product, contact your administrator"
										: undefined
								}
								disabled={bio_data?.blocked}
								onClick={handleSubmit}
								className={`${
									bio_data?.blocked &&
									"bg-slate-600 hover:bg-slate-600 cursor-not-allowed"
								} px-6 py-3 text-[12px] font-semibold md:text-sm bg-gradient-y-deepblue hover:bg-gradient-whitishblue rounded-md text-white`}
							>
								List Now
							</button>
						</div>
					</div>
				</div>
			</main>
		</Content>
	);
});
