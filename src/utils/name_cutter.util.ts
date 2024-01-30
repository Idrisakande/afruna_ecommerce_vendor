export function nameCutter(name: string, maxLength: number) {
	if (name.length <= maxLength) {
		// If the product name is already shorter than or equal to the desired length, no need to shorten it.
		return name;
	}

	// Calculate how much of the product name to keep to make space for "..." at the end.
	const charsToKeep = maxLength - 3; // Leave room for "..."

	// Shorten the product name and add "..." at the end.
	const shortenedName = name.substring(0, charsToKeep) + "...";

	return shortenedName;
}
