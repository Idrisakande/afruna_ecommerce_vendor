import { IProduct } from "@/interfaces/IProductItem";
import { useState, useEffect } from "react";
// import { ICategory, IOrder, IProduct, IUsers } from "@/interfaces";
// import { ETimePeriod } from "@/constants/enums";
interface IOrder {
	_id: string;
	vendorId: string;
	productId: {
		_id: string;
		name: string;
		images: string[];
	};
	sessionId: string;
	isPaid: boolean;
	quantity: number;
	total: number;
	deliveryStatus: string;
	isCanceled: boolean;
	options: any[];
	createdAt: string;
	updatedAt: string;
	customId: string;
}
interface IUsers {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	avatar: string;
	country: string;
	phoneNumber: string;
	createdAt: string;
	updatedAt: string;
}
interface ICategory {
	_id: string;
	name: string;
	children?: unknown[];
}
enum ETimePeriod {
	TWO_MONTH = "2 months",
	THIS_MONTH = "this month",
	THREE_DAYS = "3 days",
	ONE_WEEK = "1 week",
	SIX_MONTH = "6 months",
}

type TData = IUsers | IProduct | IOrder | ICategory;

/* export default function useSearchFilter<T extends TData>({
	data = [],
	period,
}: {
	data: T[];
	period?: string;
}) {
	const [searchInput, setSearchInput] = useState("");
	const [timePeriod, setTimePeriod] = useState(period);
	const [sortingType, setSortingType] = useState<"ascending" | "descending">(
		"ascending",
	);
	const [searchResult, setSearchResult] = useState<T[]>([]);

	// Handle changes in searchInput
	useEffect(() => {
		// Your main filtering logic
		const filterData = () => {
			// ... (rest of your filtering logic)
		};
		// Call filterData when searchInput changes
		filterData();
	}, [searchInput, data]);

	// Handle changes in timePeriod and sortingType
	useEffect(() => {
		const filterData = () => {
			// ... (rest of your filtering logic)
		};

		// Call filterData when timePeriod or sortingType changes
		filterData();
	}, [timePeriod, sortingType, data]);

	// Rest of your code remains unchanged

	return {
		searchInput,
		setSearchInput,
		setTimePeriod,
		sortingType,
		setSortingType,
		searchResult,
	};
} */

export default function useSearchFilter<T extends TData>({
	data = [],
	period,
}: {
	data: T[];
	period?: string;
}) {
	const [searchInput, setSearchInput] = useState("");
	const [timePeriod, setTimePeriod] = useState(period);
	const [sortingType, setSortingType] = useState<"ascending" | "descending">(
		"ascending",
	);
	const [searchResult, setSearchResult] = useState<T[]>([]);

	const searchInObject = (obj: TData, search: string): boolean => {
		const validProps: { [key: string]: string } = obj as unknown as {
			[key: string]: string;
		};

		for (const key in validProps) {
			if (typeof validProps[key] === "string") {
				if (
					validProps[key].toLowerCase().includes(search.toLowerCase())
				) {
					return true;
				}
			} else if (typeof validProps[key] === "object") {
				if (
					searchInObject(validProps[key] as unknown as TData, search)
				) {
					return true;
				}
			}
		}
		return false;
	};

	useEffect(() => {
		const filterData = () => {
			const filteredData = data.filter((item) => {
				if (searchInObject(item, searchInput)) {
					return true;
				}
				return false;
			});

			let sortedData = filteredData;

			if (timePeriod) {
				sortedData = filterDataByTimePeriod(filteredData, timePeriod);
			}

			if (sortingType) {
				sortedData = sorting(sortedData, sortingType);
			}

			setSearchResult(sortedData);
		};

		filterData();
	}, [searchInput, data, timePeriod, sortingType]);

	// Handle changes in timePeriod and sortingType
	useEffect(() => {
		const filterData = () => {
			let filteredData = searchResult;

			if (sortingType) {
				const sortedData = sorting(filteredData, sortingType);
				setSearchResult(sortedData);
			}
		};

		filterData();
	}, [timePeriod, sortingType, searchResult]);

	return {
		searchInput,
		setSearchInput,
		setTimePeriod,
		sortingType,
		setSortingType,
		searchResult,
	};
}

function filterDataByTimePeriod<T extends TData>(
	data: T[],
	timePeriod: string,
) {
	const currentTime = new Date();
	let startDate = new Date().getTime();
	switch (timePeriod.toLowerCase()) {
		case ETimePeriod.THREE_DAYS:
			startDate = new Date(
				currentTime.getTime() - 3 * 24 * 60 * 60 * 1000,
			).getTime();
			break;
		case ETimePeriod.ONE_WEEK:
			startDate = new Date(
				currentTime.getTime() - 8 * 24 * 60 * 60 * 1000,
			).getTime();
			break;
		case ETimePeriod.TWO_MONTH:
			// Calculate the start date as three months ago from the current date
			startDate = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth() - 1, // Subtract 1 to go back 2 months
				1,
			).getTime();
			break;
		case ETimePeriod.SIX_MONTH:
			// Calculate the start date as six months ago from the current date
			startDate = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth() - 6,
				1,
			).getTime();
			break;
		case ETimePeriod.THIS_MONTH:
			// Calucate the start date from current month
			startDate = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth(),
				1,
			).getTime();
			break;
		default:
			startDate = new Date(currentTime.getFullYear()).getTime();
			break;
	}

	const filteredData = data.filter((item) => {
		if ("createdAt" in item && typeof item.createdAt === "string") {
			const itemCreatedAt = new Date(item.createdAt).getTime();
			return (
				itemCreatedAt >= startDate &&
				itemCreatedAt <= currentTime.getTime()
			);
		}
		return false;
	});

	return filteredData;
}

function sorting<T extends TData>(
	items: T[],
	sortingType: "ascending" | "descending",
) {
	return items.slice().sort((a, b) => {
		const multiplier = sortingType === "ascending" ? 1 : -1;

		if ("createdAt" in a && "createdAt" in b) {
			return (
				multiplier *
				(new Date((a as IOrder).createdAt).getTime() -
					new Date((b as IOrder).createdAt).getTime())
			);
		}
		return 0;
	});
}

/* 
function filterDataByTimePeriod<T extends TData>(
	data: T[],
	timePeriod: string
) {
	const currentTime = new Date();

	// Calculate the start date based on the selected time period
	let startDate = new Date().getTime();
	switch (timePeriod.toLowerCase()) {
		case ETimePeriod.THREE_DAYS:
			startDate = new Date(
				currentTime.getTime() - 3 * 24 * 60 * 60 * 1000
			).getTime();
			break;
		case ETimePeriod.ONE_WEEK:
			startDate = new Date(
				currentTime.getTime() - 8 * 24 * 60 * 60 * 1000
			).getTime();
			break;
		case ETimePeriod.TWO_MONTH:
			// Calculate the start date as three months ago from the current date
			startDate = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth() - 1, // Subtract 1 to go back 2 months
				1
			).getTime();
			break;
		case ETimePeriod.SIX_MONTH:
			// Calculate the start date as six months ago from the current date
			startDate = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth() - 6,
				1
			).getTime();
			break;
		case ETimePeriod.THIS_MONTH:
			// Calucate the start date from current month
			startDate = new Date(
				currentTime.getFullYear(),
				currentTime.getMonth(),
				1
			).getTime();
			break;
		default:
			// Handle unsupported time periods or custom logic here
			startDate = startDate = new Date(
				currentTime.getFullYear()
			).getTime();
			break;
	}

	// Filter data based on the createdAt field
	const filteredData = data.filter((item) => {
		const itemCreatedAt = new Date(item.createdAt).getTime();

		// Compare the item's createdAt date with the selected time period
		return (
			itemCreatedAt >= startDate && itemCreatedAt <= currentTime.getTime()
		);
	});

	return filteredData;
}

function sorting<T extends TData>(
	items: T[],
	sortingType: "ascending" | "descending"
) {
	return items.slice().sort((a, b) => {
		// Create a copy using slice()
		const multiplier = sortingType === "ascending" ? 1 : -1;
		return (
			multiplier *
			(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
		);
	});
} */
