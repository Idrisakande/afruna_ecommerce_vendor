import { AddCategory } from "@/components/widgets/Input/AddCategory";
import { SortItem } from "@/components/SortItem";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { categoryData } from "@/constants/data";
import { Main } from "@/layouts/Main";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { GoPlus, GoSearch } from "react-icons/go";
import { IoMdArrowForward } from "react-icons/io";

interface ProductCategoriesProps {}

const ProductCategories: FC<ProductCategoriesProps> = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Main breadcrumbs={<Breadcrumbs />}>
			<main className="m-10 xl:mx-12 pb-20">
				<div className="flex flex-col lg:flex-row justify-between gap-5 bg-white mt-8 p-8 lg:px-10 rounded-xl border border-slate-300">
					<div className="flex flex-wrap flex-col gap-5 md:flex-row lg:min-w-[29rem]">
						<fieldset className="max-w-[20rem] md:max-w-[19rem] lg:min-w-[18rem] w-full overflow-hidden text-[#777777] border border-slate-300 flex justify-between items-center rounded-lg">
							<input
								type="text"
								placeholder="Search Order Id, Customer..."
								name="search"
								className="w-full px-3 placeholder:text-sm text-sm outline-none focus:outline focus:outline-1 focus:outline-blue focus:bg-white"
							/>
							<GoSearch
								size={40}
								className="text-slate-200 pr-3 cursor-pointer"
							/>
						</fieldset>

						<SortItem
							placeholder={"Sort"}
							item_1={"Item 1"}
							item_2={"Item 2"}
							item_3={"Item 3"}
							item_4={"Item 4"}
							className={"max-w-[20rem] md:max-w-[8rem]"}
						/>
					</div>
					<button
						onClick={() => setIsOpen(true)}
						className="flex gap-2 max-w-[20rem] md:max-w-[10rem] p-3 text-sm rounded-lg text-white bg-blue-500 justify-center items-center"
					>
						<GoPlus />
						Add Category
					</button>
				</div>
				<div className="flex justify-center items-center flex-wrap gap-5 mt-6 w-full">
					{categoryData.map((item) => {
						const items = item.items;
						return (
							<div
								key={item.title}
								className="bg-white relative px-6 py-5 flex justify-between flex-col h-full min-h-[18rem] w-full max-w-[21rem] rounded-lg"
							>
								<div className="flex justify-between items-start">
									<div className="flex flex-col">
										<h2 className="text-xl mb-4 font-semibold tracking-tight w-full max-w-[9rem]">
											{item.title}
										</h2>
										{items.map((data, index) => (
											<p
												key={index}
												className=" pl-2 text-[#575859]/90 text-[0.83rem] font-medium tracking-tight"
											>
												{data}
											</p>
										))}
									</div>
									<div className="flex gap-2 justify-end items-center">
										<button className="bg-[#EFF0FF] rounded text-xs py-1 px-2 font-semibold tracking-tight">
											Edit
										</button>
										<button className="bg-[#FFE2DF] rounded text-xs py-1 px-3 font-semibold tracking-tight">
											Delete
										</button>
									</div>
								</div>
								<div>
									<Link
										href={"/"}
										className=" p-2 text-[#575859]/70 text-[0.8rem] font-semibold"
									>
										Read More{" "}
										<IoMdArrowForward
											size={25}
											className="ml-2 inline-block text-black/70"
										/>
									</Link>
								</div>
								<Image
									src={item.img}
									alt={item.title}
									priority
									className="w-28 object-contain absolute bottom-0 right-0"
								/>
							</div>
						);
					})}
				</div>
				<AddCategory
					isOpen={isOpen}
					setIsOpen={setIsOpen as () => void}
				/>
			</main>
		</Main>
	);
};

export default ProductCategories;
