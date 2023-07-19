/* eslint-disable react/display-name */
import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { IProductContext } from "@/interfaces/IProductContext";
import { productcontext } from "@/contexts/ProductProvider";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import ItemPicker from "../widgets/ItemPicker";
import { InputLabelNumber } from "../widgets/Input/InputLabelNumber";
import CheckBoxLabel from "../widgets/CheckBoxLabel";
import ColorSelector from "../widgets/ColorSelector";
import { InputLabel } from "../widgets/Input/InputLabel";
import { MdAdd, MdDelete, MdImage } from "react-icons/md";
import { InputMetadata } from "../widgets/Input/InputMetadata";

export const CreateProduct: FC<{}> = memo(({ }) => {
	const { tab } = useContext(productcontext) as IProductContext;
	const [files, setFiles] = useState<ExtFile[]>([]);
	const updateFiles = useCallback((incommingFiles: ExtFile[]) => {
		if (incommingFiles.length <= 10) {
			setFiles(
				incommingFiles.filter((file) => {
					if ((file.size as number) < 200 * 1024) {
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

	return (
		<Content>
			<Header headerTitle={tab} />
			<main className="my-8 m-12 pb-20 grid grid-cols-12 bg-white rounded-xl gap-4 md:gap-8">
				<div className="col-span-full md:col-span-5 p-10">
					<div className="">
						<Dropzone
							value={files}
							onChange={updateFiles}
							maxFiles={10}
							maxFileSize={200 * 1024}
							type="image/*"
							default={false}
							header={false}
							footer={false}
							multiple
						>
							<div className="relative flex flex-col items-center text-slate-900">
								<text className="relative">
									<MdImage size={43} />
									<MdAdd
										size={18}
										className="font-bold absolute top-[29px] left-[29px] bg-white rounded-full"
									/>
								</text>
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
											<span className="p-[3px] rounded-full font-semibold bg-white text-gray-700 w-[20px] h-[20px] ">
												{id + 1}
											</span>
										</header>
										<FileMosaic {...file} preview />
										<span onClick={() => removeFile(file.id)}>
											<MdDelete size={20} />
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div className="col-span-full md:col-span-7 p-10 space-y-8 ">
					<ItemPicker
						items={["Shoes", "Ties"]}
						headerTitle="Category"
						placeholder="Select categories"
						key={"Items"}
						getSelected={(val) => console.log(val)}
					/>
					<InputLabel
						type="text"
						getValue={(val) => console.log(val)}
						headerTitle="Product Name"
						placeholder="Name of product"
					/>
					<div className="w-full grid grid-cols-2 gap-8">
						<ColorSelector
							colors={["red", "green", "yellow", "gray", "lightblue"]}
							getselectedColor={(color) => console.log(color)}
							headerTitle="Colors"
						/>
						<CheckBoxLabel
							getselectedChecks={(checks) => console.log(checks)}
							headerTitle="Size"
							placeholders={["S", "M", "L", "XL", "XXL"]}
						/>
						<InputLabelNumber
							getValue={(val) => console.log(val)}
							headerTitle="Price (in USD)"
							placeholder="0"
							prefix
							suffix
						/>
						<InputLabelNumber
							getValue={(val) => console.log(val)}
							headerTitle="Discount (in %)"
							placeholder="0"
							suffix
						/>
						<InputLabelNumber
							getValue={(val) => console.log(val)}
							headerTitle="Quantiy"
							placeholder="0"
							suffix
						/>
						<ItemPicker
							items={["New", ">90% New", "Used"]}
							getSelected={(val) => console.log(val)}
							headerTitle="Product Condition"
							placeholder="Conditon"
						/>
						<ItemPicker
							items={[
								"Brand X",
								"Brand Y",
								"Brand Z",
								"Brand Z-X",
								"Brand X-Y",
							]}
							getSelected={(val) => console.log(val)}
							headerTitle="Brand"
							placeholder="Select brand"
						/>
					</div>
					<InputMetadata
						getMetadata={(meta) => console.log(meta)}
						headerTitle="Meta Data"
						placeholder="keywords"
					/>
					<div className="flex flex-col">
						<h3 className="my-2">Product Description</h3>
						<fieldset className="w-full border-[1px] border-slate-300 rounded-md">
							<textarea
								rows={5}
								className="p-2 w-full"
								placeholder="describe products"
							/>
						</fieldset>
						<div className="flex justify-between items-center self-end mt-8 space-x-8">
							<button className="p-3 text-[12px] md:text-xs border-[1px] border-slate-300 rounded-md">
								Add More Attributes
							</button>
							<button className="p-3 text-[12px] md:text-xs bg-gradient-y-deepblue hover:bg-gradient-whitishblue rounded-md text-white">
								List Now
							</button>
						</div>
					</div>
				</div>
			</main>
		</Content>
	);
});
