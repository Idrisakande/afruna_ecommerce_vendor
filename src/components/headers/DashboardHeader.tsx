import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { svgs } from "@/constants/images";

export function DashboardHeader({
	rightComponent,
}: {
	rightComponent: ReactNode;
}) {
	return (
		<nav className={"bg-gradient-afruna p-2 flex items-center"}>
			<div className="flex justify-between items-center max-w-[90%] mx-auto w-full">
				<Link className={""} href={"/"}>
					<Image src={svgs.logo} width={200} alt="Logo" />
				</Link>
				<aside
					className={
						"flex justify-between items-center min-w-[15%] gap-6"
					}
				>
					{rightComponent ? rightComponent : null}
				</aside>
			</div>
		</nav>
	);
}
