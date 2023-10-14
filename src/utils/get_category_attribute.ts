import { T_Category } from "@/types/categories.type";
export function getCategoryOptions(
	categories: T_Category[],
	category: { name: string; _id: string },
) {
	const attributes: { [x: string]: string[] } = {};
	categories.forEach((item) => {
		if (item._id === category._id) {
			if (item.options) {
				attributes[item.name] = item.options;
			}
		}
	});
	return attributes;
}
