export type T_Category =  {
	_id: string,
	name: string,
	children?: unknown[],
	options?:string[]
}
export type T_Categories = { categories:T_Category[]};