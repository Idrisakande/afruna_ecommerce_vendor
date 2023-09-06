import { useRouter } from "next/router";
import { Button } from "@/components/Button";
import RecentOrderTable from "@/components/widgets/tables/RecentOrderTable";

export function RecentOrders() {
	const router = useRouter();
	
	return (
		<div className="my-10 w-full">
			<div className="w-full h-fit] pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
				<div className="relative w-full h-full pb-6">
					<div className="bg-white px-4  z-10 sticky top-0 left-0 right-0 w-full flex justify-between items-center border-b border-[#D5D5E6] py-4">
						<h1 className="font-bold text-afruna-blue text-sm md:text-lg">
							Recent Orders
						</h1>
						<Button
							skyBlue
							onClick={() => router.push("/orders")}
							className="text-xs w-fit px-2 md:w-24 text-white bg-gradient-y-deepblue hover:bg-gradient-whitishblue "
						>
							Veiw all
						</Button>
					</div>
					<RecentOrderTable />
				</div>
			</div>
		</div>
	);
}
