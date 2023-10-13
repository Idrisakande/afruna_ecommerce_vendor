import {
	FC,
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
import { MdAdd, MdDelete, MdImage } from "react-icons/md";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { InputLabelNumber } from "../widgets/Input/InputLabelNumber";
import CheckBoxLabel from "../widgets/CheckBoxLabel";
import ColorSelector from "../widgets/ColorSelector";
import { InputLabel } from "../widgets/Input/InputLabel";
import { InputMetadata } from "../widgets/Input/InputMetadata";
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

export const CreateProduct: FC<{}> = memo(({ }) => {
	const router = useRouter()
	const { tab } = useContext(productcontext) as IProductContext;
	const opt = useContext(AppContext) as T_app_provider;
	const { categories } = useSelector((state: RootState) => state.categories);
	const [category, setCategory] = useState<{ _id: string; name: string }>({
		_id: "",
		name: "",
	});
	const [brand, setBrand] = useState<string>();
	const [color, setColor] = useState<string>();
	const [colors, setColors] = useState<string[]>([]);
	const [condition, setCondition] = useState<string>();
	const [desc, setDescription] = useState<string>();
	const [deliveryLocations, setdeliveryLocations] = useState<string[]>([]);
	const [discount, setDiscount] = useState<number>();
	const [metaData, setMetadata] = useState<string[]>([]);
	const [name, setName] = useState<string>();
	const [price, setPrice] = useState<number>();
	const [quantity, setQuantity] = useState<number>();
	const [size, setSizes] = useState<string[]>([]);

	const [files, setFiles] = useState<ExtFile[]>([]);

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
		if (!category._id) {
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
		if (!discount) {
			toast.warn("Product discount required");
			return;
		}
		if (!price || price <= 0) {
			toast.warn("Product price must be provided!");
			return;
		}
		if (!quantity) {
			toast.warn("Product quantity must be provided!");
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
			categoryId: category._id,
		};

		const gp_delivery_loc = groupData<string, {}>(
			deliveryLocations,
			"deliveryLocations",
		);
		const gp_meta = groupData<string, {}>(metaData, "metaData");
		const gp_colors = groupData(colors, "color");

		const products = Object.assign(
			{},
			gp_colors,
			gp_meta,
			gp_delivery_loc,
			data,
		);

		const formData = objectToFormData(products);
		for (let i = 0; i < files.length; i++) {
			formData.append("images", files[i].file as Blob);
		}

		const productService = new Products();
		productService.createProduct(formData as unknown as IProduct, {
			setIsloading: opt.setIsloading,
		}).finally(() => {
			router.push("/products")
		});

		/**
		 *
		 * @RESET all state
		 */
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
		category._id,
	]);

	const handleColorAddition = useCallback(() => {
		let COLORS: string[] = [];
		const newColors = new Set([...colors, color]);
		newColors.forEach((set) => COLORS.push(set as string));
		setColors(COLORS);
	}, [color, colors]);

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
				<div className="col-span-full md:col-span-7 p-10 space-y-4 ">
					<ItemLabelPicker
						items={categories.map((i) => i.name)}
						headerTitle="Categories"
						placeholder="Select categories"
						key={"Items"}
						contentClassName="z-20"
						triggerClassName="flex text-sm space-x-1 items-center text-afruna-blue border border-afruna-gray/30 p-3 rounded-md"
						getSelected={(val: string) => {
							const cat = categories.find((i) => i.name === val);
							setCategory(cat as { _id: string; name: string });
						}}
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
						<InputLabelNumber
							getValue={(val) =>
								setQuantity(val as unknown as number)
							}
							headerTitle="Quantiy"
							placeholder="0"
							suffix
						/>
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
					<InputMetadata
						getMetadata={(meta) => setMetadata(meta)}
						headerTitle="Meta Data"
						placeholder="keywords"
					/>
					<InputMetadata
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
							<button className="px-4 py-3 text-[12px] font-semibold md:text-sm border-[1px] border-slate-300 rounded-md">
								Add More Attributes
							</button>
							<button
								onClick={handleSubmit}
								className="px-6 py-3 text-[12px] font-semibold md:text-sm bg-gradient-y-deepblue hover:bg-gradient-whitishblue rounded-md text-white"
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
