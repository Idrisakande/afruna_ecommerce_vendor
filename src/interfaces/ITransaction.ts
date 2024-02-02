export interface ITransaction {
	success: boolean;
	userId: string;
	event: string;
	amount: number;
	date: string;
	description: string;
	reference: string;
	customId?: string;
}

export interface IWallet {
	accounts: IAccount[];
	balance: number;
	userId: string;
	_id: string;
}

export interface IBank {
	active: boolean;
	code: string;
	country: string;
	createdAt: string;
	currency: string;
	gateway: string;
	id: number;
	is_deleted: boolean;
	longcode: string;
	name: string;
	pay_with_bank: boolean;
	slug: string;
	type: string;
	updatedAt: string;
}

export interface IAccount {
	_id: string;
	accountName: string;
	accountNumber: number;
	bankCode: string;
	bankName: string;
}

export interface IConfirmankDetails {
	accountNumber: string;
	bankCode: string;
}

export interface IConfirmBankDetailsResponse {
	account_name: string;
	account_number: string;
	bank_id: number;
}

export interface ISetBankDetails {
	accountName: string;
	accountNumber: string;
	bankName: string;
	bankCode: string;
}
