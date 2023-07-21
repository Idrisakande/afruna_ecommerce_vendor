/* eslint-disable react/display-name */
import useSelect from "@/hooks/useSelect";
import { IItemPicker } from "@/interfaces/ItemPicker";
import { memo } from "react";

export default memo(function ({
	headerTitle,
	items,
	placeholder,
	getSelected,
}: IItemPicker) {
	const { ItemPicker, selected } = useSelect(items, placeholder, headerTitle);
	getSelected(selected);
	return <ItemPicker />;
});
