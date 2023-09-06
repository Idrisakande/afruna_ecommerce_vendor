export declare interface EventTarget {
	addEventListener(
		type: string,
		listener: (event: Event) => void,
		options?: boolean | AddEventListenerOptions,
	): void;
}

export type T_app_provider = {isLoading?:boolean, setIsloading?:(arg:boolean)=>void}
