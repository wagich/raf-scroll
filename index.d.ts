declare module "raf-scroll" {
	const rafScroll: RafScroll;
	export default rafScroll;

	export type RafScrollCallback = (event: RafScrollEvent) => void;

	export class RafScroll {
		/**
		 * Will call callback maximum once per frame, if the scroll value has changed. An event will be passed containing the current scrollY as well as the deltaY.
		 * @param callback
		 */
		add(callback: RafScrollCallback): void;

		/**
		 * Same than add but only trigger the event once, then automatically unbinds itself. Useful for triggering behavior when user scrolls.
		 * @param callback
		 */
		addOnce(callback: RafScrollCallback): void;

		/**
		 * Unbind the listener. Passing no callback will unbind all previous callbacks.
		 * @param callback
		 */
		remove(callback: RafScrollCallback): void;

		/**
		 * Manually get the event (containing last scrollY/deltaY). Note that you need to wait at least 1 frame to have valid values since the scroll data is read in a requestAnimationFrame.
		 */
		getCurrent(): RafScrollEvent;

		/**
		 * Clean the singleton.
		 */
		destroy(): void;
	}

	export class RafScrollEvent {
		scrollY: number;
		deltaY: number;
	}
}
