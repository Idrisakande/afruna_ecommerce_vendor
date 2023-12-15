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
import withAuth from "@/hooks/withAuth";
import Transaction from "@/services/transactions.service";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { IConfirmankDetails, ISetBankDetails } from "@/interfaces/ITransaction";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	Cross2Icon,
} from "@radix-ui/react-icons";
import { SelectItem } from "@/components/widgets/SelectItem";

const transationApis = new Transaction();
const Index = () => {
	const router = useRouter();
	const [showAFCModel, setShowAFCModel] = useState(false);
	const [showPendingModel, setShowPendingModel] = useState(false);

	useEffect(() => {
		const _ = new Transactions();
	}, []);
	/* handle modal */
	const [openModalOnConfirm, setOpenModalOnConfirm] = useState(false);
	const [openModalOnWithdrawal, setOpenModalOnWithdrawal] = useState(false);
	const [bankDetails, setBankDetails] = useState<IConfirmankDetails>({
		bankCode: "",
		accountNumber: "",
	});
	const [witdrawalDetail, setWithdrawalDetail] = useState({
		amount: 0,
		accountId: "",
	});
	const [confirmedDetails, setConfirmedDetails] = useState({
		account_name: "",
		account_number: "",
		bank_id: 0,
	});

	const transactions = useSelector(
		(state: RootState) => state.transaction.transactions,
	);
	const banks = useSelector((state: RootState) => state.transaction.banks);
	const userWallet = useSelector(
		(state: RootState) => state.transaction.wallet,
	);
	const totalPages = useSelector((state: RootState) => state.util.totalPages);

	const searchParams = useSearchParams();
	let page = searchParams.get("page") as string;
	const [open, setOpen] = useState(false);
	if (page === null) page = "1";

	const handleBankChange = (bank: any) => {
		setBankDetails({ ...bankDetails, bankCode: bank });
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setBankDetails({ ...bankDetails, [name]: value });
	};
	const handleWithdrawalDetailChange = (e: any) => {
		const { name, value } = e.target;
		setWithdrawalDetail({ ...witdrawalDetail, [name]: value });
	};
	const handleAccountChange = (account: any) => {
		setWithdrawalDetail({ ...witdrawalDetail, accountId: account });
	};
	const confirmBankUpdate = () => {
		let bankName = banks.find((bank) => bank.code === bankDetails.bankCode)
			?.name;
		let payload: ISetBankDetails = {
			accountName: confirmedDetails.account_name,
			accountNumber: confirmedDetails.account_number,
			bankCode: bankDetails.bankCode,
			bankName,
		};

		transationApis.setBankDetails(payload).then((data) => {
			if (data?.success == true) {
				toast.success("Bank details updated");
				cancelBankUpdate();
				cancelConfirmBankUpdate();
				transationApis.getWalletDetails();
			}
		});
	};

	const cancelConfirmBankUpdate = () => {
		// closeModal()
	};
	const cancelBankUpdate = () => {
		setOpenModalOnConfirm(false);
	};

	const confirmBankDetails = (data: IConfirmankDetails) => {
		if (bankDetails.bankCode === "") {
			toast.error("Please provide a bank");
			return;
		}
		if (bankDetails.accountNumber === "") {
			toast.error("Please provide an account number");
			return;
		}
		const confirmationDetails = transationApis.confirmBankDetails(data);
		confirmationDetails
			.then((value) => {
				if (value?.success == true) {
					setOpenModalOnConfirm(value.success);
					setConfirmedDetails({
						account_name: value.data.account_name,
						account_number: value.data.account_number,
						bank_id: value.data.bank_id,
					});
				}
			})
			.catch((error) => {});
	};

	const cancelWithdrawal = () => {
		setOpenModalOnWithdrawal(false);
	};

	const placeWithdrawal = () => {
		if (witdrawalDetail.amount > userWallet.balance) {
			toast.error("Amount can not be larger than balance");
			return;
		}

		if (witdrawalDetail.amount === 0) {
			toast.error("Enter amount");
			return;
		}

		let payload = {
			amount: witdrawalDetail.amount,
			accountId: userWallet.accounts[0]._id,
		};

		transationApis.withdraw(payload).then((data) => {
			toast.success("Withdrawal placed");
		});
	};
	console.log(banks);

	useEffect(() => {
		transationApis.getWalletDetails();
		transationApis.getTransactions(Number(page));
		transationApis.getBanks();
	}, [page]);
	if (!transactions) return <PageLoarder />;
	return (
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
								value={userWallet.balance ?? 0}
							/>
						}
						rightComponent={
							<button
								onClick={() => setOpen(true)}
								className="md:w-24 text-center rounded-sm bg-gradient-whitishblue p-2 text-white text-[12px]"
							>
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
				<Dialog.Root modal open={open}>
					<Dialog.Portal>
						<Dialog.Overlay
							onClick={() => setOpen(false)}
							className="bg-black fixed w-screen h-screen"
						/>
						<Dialog.Content className="bg-white left-1/2 top-[40%] absolute h-fit -translate-x-[50%] -translate-y-[40%] p-3 rounded-md w-1/2 z-30 transition-all shadow-lg">
							<Select.Root onValueChange={()=> {}}>
								<Select.Trigger
									className="flex items-center gap-3"
									aria-label="Banks"
								>
									<Select.Value className="p-1" placeholder="Select your bank" />
									<Select.Icon className="SelectIcon">
										<ChevronDownIcon />
									</Select.Icon>
								</Select.Trigger>
								<Select.Portal>
									<Select.Content className="bg-white z-30 p-3 rounded-sm w-fit h-[40vh]">
										<Select.ScrollUpButton className="SelectScrollButton">
											<ChevronUpIcon />
										</Select.ScrollUpButton>
										<Select.Viewport className="SelectViewport">
											<Select.Group>
												<Select.Label className="SelectLabel">
													Available Banks
												</Select.Label>
												{banks.map((bk) => (
													<SelectItem
														key={bk.id}
														value={bk.id}
													>
														{bk.name}
													</SelectItem>
												))}
											</Select.Group>
										</Select.Viewport>
										<Select.ScrollDownButton className="SelectScrollButton">
											<ChevronDownIcon />
										</Select.ScrollDownButton>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
							<form className="grid my-3 gap-1 lg:grid-cols-2 w-full grid-cols-auto">
								<fieldset>
									<input className="p-2 outline-none focus-within:border-afruna-blue/70 border border-afruna-base/70 rounded-md" type="number" placeholder="Account Number" maxLength={10} />
								</fieldset>
								<fieldset>
									<input className="p-2 outline-none focus-within:border-afruna-blue/70 border border-afruna-base/70 rounded-md" type="number" placeholder="Amount" />
								</fieldset>
							</form>

							<div className="flex justify-end items-end gap-3">
							<Dialog.Close asChild>
								<button
									onClick={() => setOpen(false)}
									className="border border-red-400 text-afruna-blue/90 hover:text-afruna-blue rounded-md p-3 place-self-end text-xs text-center"
									aria-label="Close"
								>
									Cancel
								</button>
							</Dialog.Close>
							<Dialog.Close asChild>
								<button
									onClick={() => setOpen(false)}
									className="border border-green-400 text-afruna-blue/90 hover:text-afruna-blue rounded-md p-3 place-self-end text-xs text-center"
									aria-label="Close"
								>
									Confirm
								</button>
							</Dialog.Close>
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
				<Content>
					<Header
						key={"transaction history"}
						headerTitle={"Transaction history"}
					/>
					{transactions.length ? (
						<TransactionHistory />
					) : (
						<div className="flex flex-col justify-center items-center h-1/2">
							<Image
								height={100}
								src={images.noResult}
								alt="no_result"
							/>
							<h1>No transactional data</h1>
						</div>
					)}
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
								),
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
	);
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
			className,
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
			{afc ? (
				`${value.toLocaleString()} AFC`
			) : (
				<>&#x20A6; {value.toLocaleString()}</>
			)}
		</p>
	</div>
);

export default withAuth(Index);
