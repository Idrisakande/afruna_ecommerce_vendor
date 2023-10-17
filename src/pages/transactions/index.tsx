import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import { Main } from "@/layouts/Main";
import { images } from "@/constants/images";
import TransactionHistory from "@/components/widgets/tables/TransactionHistory";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { useRouter } from "next/router";
import { Content } from "@/components/products/Content";
import { Header } from "@/components/products/Header";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import { RxChevronRight } from "react-icons/rx";
import { HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import PageLoarder from "@/components/widgets/PageLoarder";
import Transactions from "@/services/transactions.service";
import withAuth10 from "@/hooks/withAuth10";

const Index = () => {
	const router = useRouter();
	const [showAFCModel, setShowAFCModel] = useState(false);
	const [showPendingModel, setShowPendingModel] = useState(false);
	const { transactions } = useSelector((state: RootState) => state.transactions)
	useEffect(() => {
		const _ = new Transactions();
	},[])
	if (!transactions) return <PageLoarder />
	return  (
		<Main breadcrumbs={<Breadcrumbs />}>
			<main className="relative my-8 m-12 pb-20">
				<div className="grid grid-cols-7 gap-4">
					<TransactionStat
						className="col-span-full md:col-span-5 lg:col-span-3"
						leftComponent={
							<Image
								className="w-11"
								src={images.wallet}
								alt="Wallet_Image"
							/>
						}
						middelComponent={
							<MiddleComponent
								title={"Available Balance"}
								value={0}
							/>
						}
						rightComponent={
							<button className="md:w-24 text-center rounded-sm bg-gradient-whitishblue p-2 text-white text-[12px]">
								Withdraw
							</button>
						}
					/>
					<TransactionStat
						className="col-span-full md:col-span-5 lg:col-span-2"
						middelComponent={
							<MiddleComponent
								afc
								title={"Afruna Coin"}
								value={0}
							/>
						}
						rightComponent={
							<button
								onClick={() => setShowAFCModel(true)}
								className="text-center rounded-sm bg-afruna-blue p-2 text-white text-[12px]"
							>
								Get coin
							</button>
						}
					/>
					<TransactionStat
						className="col-span-full md:col-span-5 lg:col-span-2"
						middelComponent={
							<MiddleComponent
								title={"Pending Balance"}
								value={0}
							/>
						}
						rightComponent={
							<button
								onClick={() => setShowPendingModel(true)}
								className="font-extrabold text-2xl text-center rounded-sm"
							>
								<RxChevronRight />
							</button>
						}
					/>
				</div>
				<Content>
					<Header
						key={"transaction history"}
						headerTitle={"Transaction history"}
					/>
{transactions.length?(					<TransactionHistory />):(<div className="flex flex-col justify-center items-center h-1/2"><Image height={100} src={images.noResult} alt="no_result" /><h1>No transactional data</h1></div>)}
				</Content>
				<div
					className={`${
						!showAFCModel && "hidden"
					} fixed top-0 left-0 transition-all ease-linear delay-75 w-screen h-screen bg-black/40 z-20`}
				>
					<form className="flex flex-col w-[75vw] md:w-[50vw] h-fit md:h-[80-vh] relative top-20 rounded-md bg-white p-3 m-auto transition-all translate-y-10 delay-1000 ease-linear duration-300">
						<button
							type="button"
							onClick={() => setShowAFCModel(false)}
							className="absolute top-2 right-2 rounded-full p-1 text-afruna-blue text-xs hover:rotate-180 transition duration-200 ease-out"
						>
							<HiX />
						</button>
						<header className={"text-afruna-blue space-y-2"}>
							<h1>Get more coins</h1>
							<div className="flex font-medium flex-col text-xs">
								<p>Save more with bigger bundles</p>
								<span
									className={
										"text-afruna-gray/70 text-[12px]"
									}
								>
									Prices of Afruna coins at VAT inclusive.
								</span>
							</div>
						</header>
						<div className="flex flex-col items-center space-y-1">
							{[{ afc: 50, discount: 5, price: 25 }].map(
								({ afc, discount, price }, idx) => (
									<div
										key={idx}
										className={
											"text-[12px] flex w-full flex-wrap justify-around items-center"
										}
									>
										<p className="space-x-2">
											<span
												className={
													"text-lg2 font-extrabold"
												}
											>
												{afc}
											</span>
											<button
												className="rounded-full w-7 h-7 p-1 text-afruna-blue
											bg-gradient-to-t from-slate-100/40 to-slate-500/90 inset-4"
											>
												AFC
											</button>
										</p>
										<div className=" text-extrabold text-red-500/90 bg-green-500/20 p-2 rounded-full">
											Sales {discount}%
										</div>
										<button
											type="button"
											className="p-2 text-width  w-14 bg-green-500 text-white rounded-sm
										"
										>
											${price}
										</button>
									</div>
								)
							)}
						</div>
					</form>
				</div>
				<div
					className={`${
						!showPendingModel && "hidden"
					} fixed top-0 left-0 transition-all ease-linear delay-75 w-screen h-screen bg-black/40 z-20`}
				>
					<div
						className={
							"w-[75vw] md:w-[50vw] h-fit md:h-[80-vh] relative top-20 m-auto transition-all translate-y-10 delay-1000 ease-linear duration-300"
						}
					>
						<Content>
							<Header
								headerTitle="Pending Transactions"
								rightComponent={
									<button
										className="absolute top-2 right-2 rounded-full p-1 text-afruna-blue text-xs hover:rotate-180 transition duration-200 ease-out"
										onClick={() =>
											setShowPendingModel(false)
										}
									>
										<HiX />
									</button>
								}
							/>
							<Image src={images.noResult} alt="NOT_FOUND" />
						</Content>
					</div>
				</div>
			</main>
			{/* popover coin */}
		</Main>
	)
};

const TransactionStat: FC<{
	middelComponent: ReactNode;

	className?: string;
	leftComponent?: ReactElement;
	rightComponent?: ReactNode;
}> = ({ middelComponent, leftComponent, rightComponent, className }) => (
	<div
		className={classNames(
			"rounded-md border text-afruna-blue border-afruna-gray/5 p-3 flex justify-around space-x-0 items-center w-full bg-white",
			className
		)}
	>
		{leftComponent && leftComponent}
		{middelComponent}
		{rightComponent && rightComponent}
	</div>
);
const MiddleComponent: FC<{ value: number; title: string; afc?: boolean }> = ({
	value,
	title,
	afc,
}) => (
	<div className="space-y-2">
		<h1 className={"text-afruna-text/70 text-[14px]"}>{title}</h1>
		<p className="text-xl font-semibold">
			
			{afc
				? `${value.toLocaleString()} AFC`
				: <>&#x20A6; {" "} {value.toLocaleString()}</>}
		</p>
	</div>
);

export default withAuth10(Index);
