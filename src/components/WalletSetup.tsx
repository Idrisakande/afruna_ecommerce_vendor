import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { SelectItem } from "./widgets/SelectItem";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import NumberInput from "./widgets/Input/NumberInput";
import { IBank, IConfirmBankDetailsResponse } from "@/interfaces/ITransaction";
import Transaction from "@/services/transactions.service";
import { CustomLoader } from "./widgets/CustomLoader";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

interface IWalletSetup {
	defaultOpen?: boolean;
	titleText?:string;
}
const transactionApi = new Transaction();
const WalletSetup: FC<IWalletSetup> = ({ defaultOpen,titleText = "Add an account" }) => {
	const banks = useSelector((state: RootState) => state.transaction.banks);
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);
	const [account, setAccount] = useState<{
		account_number: string | undefined;
		account_name: string | undefined;
		bank: IBank | undefined;
	}>({
		account_number: undefined,
		account_name: undefined,
		bank: undefined,
	});

	useMemo(() => {
		const { account_number, bank } = account;
		if (account_number && account_number.length === 10 && bank) {
			setLoading(true);
			transactionApi
				.confirmBankDetails({
					accountNumber: account_number,
					bankCode: bank.code,
				})
				.then((response) => {
					const data =
						response as AxiosResponse<IConfirmBankDetailsResponse>;
					setAccount((details) => ({
						...details,
						account_name: data.data.account_name,
					}));
					setResponse("");
				})
				.catch(() => {
					setResponse("Sorry... No account matches yours!");
					setAccount({
						account_name: undefined,
						account_number: undefined,
						bank: undefined,
					});
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [account.account_number, account.bank]);
	const handleAccountSetup = useCallback(() => {
		transactionApi
			.setBankDetails({
				accountName: account.account_name as string,
				accountNumber: account.account_number as string,
				bankCode: account.bank?.code as string,
				bankName: account.bank?.name as string,
			})
			.then((response) => {
				toast.success("Account succesfully added!");
				setAccount({
					account_name: undefined,
					account_number: undefined,
					bank: undefined,
				});
			})
			.catch(() => {
				toast.error("Something went wrong.");
				setAccount({
					account_name: undefined,
					account_number: undefined,
					bank: undefined,
				});
			});
	}, [account.account_name, account.account_number, account.bank]);

	return (
		<Dialog.Root defaultOpen={defaultOpen}>
			<Dialog.Trigger>
				<button className="text-afruna-blue/70 text-sm my-3 border-b border-afruna-blue/30">
				{titleText}
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-30" />
				<Dialog.Content className="fixed top-1/2 left-1/2 w-[70vw] sm:w-[50vw] md:w-[40vw] transform -translate-x-1/2 -translate-y-1/2 bg-white z-30 p-4 rounded shadow-md text-afruna-blue">
					<div className="flex items-start flex-col gap-3">
						<Dialog.Title>Account Setup</Dialog.Title>
						<NumberInput
							maxLength={10}
							onChange={(e) => {
								setAccount((details) => ({
									...details,
									account_number: e.target.value,
								}));
							}}
							required
							placeholder="Account Number"
							className="p-2 border rounded-md w-full"
						/>
						<Select.Root
							onValueChange={(bank) => {
								setAccount((details) => ({
									...details,
									bank: bank as unknown as IBank,
								}));
							}}
						>
							<Select.Trigger className="p-2 w-full flex items-center justify-start border rounded-md gap-3">
								<Select.Value
									defaultValue={"Select operating bank"}
									placeholder={"Select operating bank"}
								/>
								<Select.Icon />
							</Select.Trigger>

							<Select.Portal>
								<Select.Content
									position="popper"
									className="z-30 bg-white fixed h-fit max-h-[40vh]"
								>
									<Select.ScrollUpButton />
									<Select.Viewport>
										{banks.map((bank) => (
											<SelectItem
												value={
													bank as unknown as string
												} //assert to string here
												key={bank.id}
											>
												{bank.name}
											</SelectItem>
										))}
										<Select.Separator />
									</Select.Viewport>
									<Select.ScrollDownButton />
								</Select.Content>
							</Select.Portal>
						</Select.Root>
						{loading ? (
							<CustomLoader prompt="Please wait, verifying..." />
						) : (
							<p className="text-xs text-red-500/90">
								{response}
							</p>
						)}

						{account.account_name && (
							<p className="text-green-500 p-2 text-sm border-l-2 border-green-500 bg-green-50 w-full">
								{account.account_name}
							</p>
						)}
					</div>
					<div className="flex gap-3 items-center justify-end mt-3">
						{account.account_name ? (
							<Dialog.Close asChild>
								<button
									onClick={handleAccountSetup}
									className="text-green-500 text-xs bg-green-50 p-3 rounded-md"
								>
									Add
								</button>
							</Dialog.Close>
						) : null}
						<Dialog.Close asChild>
							<button className="text-red-500 text-xs bg-red-50 p-3 rounded-md">
								Cancel
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
export default WalletSetup;
