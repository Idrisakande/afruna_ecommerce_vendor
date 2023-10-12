import { Table } from "@tanstack/react-table";
import {
	RxChevronLeft,
	RxChevronRight,
	RxDoubleArrowLeft,
	RxDoubleArrowRight,
} from "react-icons/rx";

export function createPaginationWithCustomType<T>() {
	// Create a new type that extends CustomType with an additional property
	type TTable = Table<T>;

	// Define a pagination component that uses the extended table type [TTable]
	return ({ table }: { table: TTable }) => {
		const pageIndex = table.getState().pagination.pageIndex + 1;
		const pageCount = table.getPageCount();
		const next = table.nextPage;
		const previous = table.previousPage;
		const canGoBackward = !table.getCanPreviousPage();
		const canGoForward = !table.getCanNextPage(); //if true negate it to avoid the disable-btn-atribut from be active so when it false it the btn becomes disable
		return (
			<div className="h-fit mt-2 absolute bottom-0 right-0 pb-10">
				<div className="flex text-md text-afruna-blue items-center gap-2">
					<button
						className="w-7 h-7 bg-white rounded p-1"
						onClick={() => table.setPageIndex(0)}
						disabled={canGoBackward}
					>
						<RxDoubleArrowLeft />
					</button>
					<button
						className="w-7 h-7 bg-white rounded p-1"
						onClick={previous}
						disabled={canGoBackward}
					>
						<RxChevronLeft />
					</button>
					{pageCount > 3 && (
						<>
							<button
								onClick={() =>
									table.setPageIndex(pageIndex + 1)
								}
								className={`w-7 h-7 text-sm bg-white rounded p-1 ${
									pageIndex === pageIndex + 1 &&
									"bg-blue-950 text-white"
								}`}
							>
								{pageIndex + 1}
							</button>
							<button
								onClick={() =>
									table.setPageIndex(pageIndex + 2)
								}
								className={`w-7 h-7 text-sm bg-white rounded p-1 ${
									pageIndex === pageIndex + 2 &&
									"bg-blue-950 text-white"
								}`}
							>
								{pageIndex + 2}
							</button>
							<button
								onClick={() =>
									table.setPageIndex(pageIndex + 3)
								}
								className={`w-7 h-7 text-sm bg-white rounded p-1 ${
									pageIndex === pageIndex + 3 &&
									"bg-blue-950 text-white"
								}`}
							>
								{pageIndex + 3}
							</button>
							<span
								className={`w-7 h-7 text-sm bg-white rounded p-1`}
							>
								...
							</span>
							<button
								onClick={() =>
									table.setPageIndex(pageCount - 1)
								}
								className={`w-7 h-7 text-sm bg-white rounded p-1 ${
									pageIndex === pageCount &&
									"bg-blue-950 text-white"
								}`}
							>
								{pageCount}
							</button>
						</>
					)}
					{pageCount > 1 && (
						<>
							<button
								onClick={() => table.setPageIndex(0)}
								className={`w-7 h-7 text-sm bg-white rounded p-1 ${
									pageIndex === 1 && "bg-blue-950 text-white"
								}`}
							>
								1
							</button>
							<button
								onClick={() => table.setPageIndex(1)}
								className={`w-7 h-7 text-sm bg-white rounded p-1 ${
									pageIndex === 2 && "bg-blue-950 text-white"
								}`}
							>
								2
							</button>
							<button
								onClick={() =>
									table.setPageIndex(pageCount - 1)
								}
								className={`w-7 h-7 text-sm bg-white rounded p-1 ${
									pageIndex === pageCount &&
									"bg-blue-950 text-white"
								}`}
							>
								{pageCount}
							</button>
						</>
					)}

					<button
						className="w-7 h-7 bg-white rounded p-1"
						onClick={next}
						disabled={canGoForward}
					>
						<RxChevronRight />
					</button>
					<button
						className="w-7 h-7 bg-white rounded p-1"
						onClick={() =>
							table.setPageIndex(table.getPageCount() - 1)
						}
						disabled={canGoForward}
					>
						<RxDoubleArrowRight />
					</button>
				</div>
			</div>
		);
	};
}
