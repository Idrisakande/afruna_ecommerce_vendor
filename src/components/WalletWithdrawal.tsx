import { IAccount } from "@/interfaces/ITransaction";
import { RootState } from "@/types/store.type";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { SelectItem } from "./widgets/SelectItem";
import { CustomLoader } from "./widgets/CustomLoader";
import Transaction from "@/services/transactions.service";
import { toast } from "react-toastify";
import NumberInput from "./widgets/Input/NumberInput";
import { AxiosResponse } from "axios";

interface IWalletWithdrawalProps {
	open: boolean;
	onClose: () => void;
}
const transactionApi = new Transaction();
export const WalletWithdrawal: React.FC<IWalletWithdrawalProps> = ({
	open,
	onClose,
}) => {
	const { wallet } = useSelector((state: RootState) => state.transaction);
	const [withdrawableAmount, setWithdrawableAmount] = useState(0);
	const [selectedAccount, setSelectedAccount] = useState<IAccount>();
	const [loading, setLoading] = useState(false);

	const handleAccountChange = useCallback((account: string) => {
		setSelectedAccount(account as unknown as IAccount);
	}, []);

	const handleWithdrawal = useCallback(() => {
		if (!selectedAccount) {
			toast.warn("Select an acount to withdraw into.");
		}
		if (wallet.balance > 0) {
			setLoading(true);
			transactionApi
				.withdraw({
					accountId: selectedAccount?._id as string,
					amount: withdrawableAmount,
				})
				.then((response) => {
					const data = response as AxiosResponse<any>;
					if (data.data.success) {
						toast.success(
							"Congratulations! Your withdrawal request has been successfully processed",
						);
					}
				})
				.catch(() => {
					toast.warn(
						"We're sorry, but we couldn't process your withdrawal request at this time. Please try again!",
					);
				})
				.finally(() => {
					setLoading(false);
					setSelectedAccount(undefined);
					setWithdrawableAmount(0);
				});
		} else {
			toast.info("Insufficient Wallet Balance");
			setWithdrawableAmount(0);
			setLoading(false);
			onClose();
		}
	}, [withdrawableAmount, selectedAccount?._id, wallet.balance]);

	return (
		<Dialog.Root open={open}>
			<Dialog.Overlay
				onClick={onClose}
				className="fixed inset-0 bg-black opacity-50 z-30"
			/>
			<Dialog.Content className="fixed top-1/2 left-1/2 w-[70vw] sm:w-[50vw] md:w-[40vw] transform -translate-x-1/2 -translate-y-1/2 bg-white z-30 p-4 rounded shadow-md text-afruna-blue">
				<Select.Root onValueChange={handleAccountChange}>
					<Select.Trigger className="p-2 w-full flex items-center justify-start border rounded-md gap-3">
						<Select.Value
							defaultValue={"Select Account"}
							placeholder={"Select Account"}
						/>
						<Select.Icon />
					</Select.Trigger>

					<Select.Portal>
						<Select.Content
							position="popper"
							className="z-30 bg-white absolute px-3 text-xs w-[30vw] h-fit max-h-[40vh]"
						>
							<Select.ScrollUpButton />
							<Select.Viewport>
								{wallet.accounts.map((account) => (
									<SelectItem
										value={account as unknown as string} //assert to string here
										key={account._id}
									>
										{account.accountName}
									</SelectItem>
								))}
								<Select.Separator />
							</Select.Viewport>
							<Select.ScrollDownButton />
						</Select.Content>
					</Select.Portal>
				</Select.Root>
				<div className="flex gap-3 items-center">
					<label>Amount: </label>
					<NumberInput
						value={withdrawableAmount}
						placeholder="100,000"
						onChange={(e) => {
							setWithdrawableAmount(Number(e.target.value));
						}}
					/>
				</div>
				<div className="flex gap-3 items-center justify-end mt-3">
					{selectedAccount ? (
						<button
							title={`${withdrawableAmount === 0 && "Withdrawable amount must be non negative number"}`}
							disabled={withdrawableAmount === 0}
							onClick={handleWithdrawal}
							className={`w-fit text-green-500 text-xs bg-green-50 p-3 rounded-md ${withdrawableAmount === 0 && "cursor-not-allowed"}`}
						>
							Withdraw{" "}
							{loading ? (
								<CustomLoader prompt="...processing" />
							) : null}
						</button>
					) : null}

					<button
						onClick={() => {
							onClose();
							setSelectedAccount(undefined);
							setWithdrawableAmount(0);
						}}
						className="text-red-500 text-xs bg-red-50 p-3 rounded-md"
					>
						Cancel
					</button>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	);
};
