export declare interface EventTarget {
	addEventListener(
		type: string,
		listener: (event: Event) => void,
		options?: boolean | AddEventListenerOptions,
	): void;
}
