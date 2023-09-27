import { useMemo, useState } from "react";

export default function useCustomSearch<T>(items: T[] | any[], /* dependencies: string[] */) {
	const [searchTerm, setSearchTerm] = useState("");
	const [dateFilter, setDateFilter] = useState("");
	const [monthFilter, setMonthFilter] = useState("");
	const time = 24 * 60 * 60 * 1000;
	const currentDate = new Date();

	let searchTermMatch = false;
	const filteredItems:T[] = useMemo(() => {
		return items.filter((item) => {
			// First, check if the item matches the searchTerm
			if (searchTerm !== undefined) {
				searchTermMatch = item["productName"].includes(searchTerm.toLowerCase());

			}
			//check if there is month filter
			if (monthFilter) {
				const createdAt = new Date(item.createdAt);
				const timeDiff = currentDate.getTime() - createdAt.getTime();
				switch (monthFilter) {
					case "january":
						return searchTermMatch && timeDiff <= 30 * time;

					case "february":
						return searchTermMatch && timeDiff <= 30 * 2 * time;

					case "march":
						return searchTermMatch && timeDiff <= 30 * 3 * time;

					case "april":
						return searchTermMatch && timeDiff <= 30 * 4 * time;

					case "may":
						return searchTermMatch && timeDiff <= 30 * 5 * time;

					case "june":
						return searchTermMatch && timeDiff <= 30 * 6 * time;

					case "july":
						return searchTermMatch && timeDiff <= 30 * 7 * time;

					case "august":
						return searchTermMatch && timeDiff <= 30 * 8 * time;

					case "september":
						return searchTermMatch && timeDiff <= 30 * 9 * time;

					case "october":
						return searchTermMatch && timeDiff <= 30 * 10 * time;

					case "november":
						return searchTermMatch && timeDiff <= 30 * 11 * time;

					case "december":
						return searchTermMatch && timeDiff <= 30 * 12 * time;

					default:
						return false;
				}
			}

			//check if there is date filter
			if (dateFilter) {
				const createdAt = new Date(item.createdAt);
				const timeDiff = currentDate.getTime() - createdAt.getTime();
				switch (dateFilter) {
					case "any month":
						// Check if createdAt is within the last 30 days
						return searchTermMatch && timeDiff <= 30 * time;
					case "3 days ago":
						// Check if createdAt is within the last 3 days
						return searchTermMatch && timeDiff <= 3 * time;
					case "1 weeks":
						// Check if createdAt is within the last 7 days
						return searchTermMatch && timeDiff <= 7 * time;
					case "1 month":
						// Check if createdAt is within the last month (30 days)
						return searchTermMatch && timeDiff <= 30 * time;
					case "6 months":
						// Check if createdAt is within the last 5 months (150 days)
						return searchTermMatch && timeDiff <= 180 * time;
					default:
						return false;
				}
			}

			// If there's no dateFilter, only consider the searchTerm
			return searchTermMatch;
		});
	}, [items/* , dependencies */, searchTerm, dateFilter, monthFilter]);

	const updateSearchTerm = (term: string) => {
		setSearchTerm(term);
	};

	const updateDateFilter = (filter: string) => {
		setDateFilter(filter);
	};
	const updateMonthFilter = (filter: string) => {
		setDateFilter(filter.toLowerCase());
	};

	return {
		filteredItems,
		updateSearchTerm,
		updateDateFilter,
		updateMonthFilter,
	};
}
