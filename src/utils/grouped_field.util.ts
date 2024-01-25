export function groupData<T, A>(data: T[], key: string, accum?: A) {
	return data.reduce((acc: any, word, idx) => {
		const id = `${key}[${idx}]`;
		acc[id] = word;
		return acc;
	}, {});
}
