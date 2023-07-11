import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import { Main } from "@/layouts/Main";
import ItemPicker from "@/components/widgets/ItemPicker";
import { images } from "@/constants/images";
import { SortItem } from "@/components/SortItem";
import TransactionHistory from "@/components/widgets/tables/TransactionHistory";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { useRouter } from "next/router";

const Index = () => {
	const router = useRouter();
	return (
		<Main breadcrumbs={<Breadcrumbs />}>
			<main className="my-8 m-12 pb-20">
				<div className="grid grid-cols-6 gap-8 my-10 snap-mandatory snap-y snap-center">
					<div className=" col-span-3 bg-white  border-slate-300 rounded-xl border-[1px]">
						<section className="flex items-center justify-between  py-2 px-[1cm]">
							<div className="flex items-center">
								<Image
									src={images.wallet}
									alt=""
									className="p-2 object-fit w-1/3 "
								/>
								<section className="p-2">
									<p className="">Available Balance</p>
									<p className="p-2 text-3xl">$20,000</p>
								</section>
							</div>
							<button
								onClick={() =>
									router.push("transactions/transfer")
								}
								className="text-white font-medium text-sm bg-gradient-bluebutton p-2 border-b-1 border-blue-800 shadow-sm rounded-md w-24 inset-3"
							>
								Transfer
							</button>
						</section>
					</div>
					<div className="col-span-2 bg-white w-full border-slate-300 rounded-xl border-[1px]">
						<section className=" justify-start flex flex-col h-full px-16  py-10 ">
							<p>Available Afruna Coin </p>
							<p className="text-3xl py-3">143,000 AFC</p>
						</section>
					</div>
				</div>

				<div className="w-full bg-white border-[1px]  rounded-lg shadow-sm h-[50h]">
					<header className="p-4 mb-4 flex w-full justify-between">
						<h1 className=" text-xl font-extrabold">
							Transaction History
						</h1>

						<div className="sort_dropdown space-x-8 grid grid-cols-2 mr-8">
							<ItemPicker
								getSelected={(val) => console.log(val)}
								placeholder="Sorts"
								items={[
									"All",
									"By date",
									"By month",
									"Ascending",
									"Descending",
								]}
							/>
							<ItemPicker
								getSelected={(val) => console.log(val)}
								placeholder="Select date"
								items={[
									"All",
									"Jan-Mar",
									"Apr-Jun",
									"Jul-Sept",
									"Oct-Dec",
								]}
							/>
						</div>
					</header>
					<hr className="border-slate-300" />
					<TransactionHistory />
				</div>
			</main>
		</Main>
	);
};

export default Index;
