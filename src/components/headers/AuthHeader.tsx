/* eslint-disable react/display-name */
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdHelp } from "react-icons/md";

import { SelectPicker } from "../widgets/SelectPicker";
import { svgs } from "@/constants/images";

export const AuthHeader = memo(() => (
	<header className="sticky top-0 bg-gradient-afruna z-10 h-fit">
		<nav className="relative flex items-center justify-between  md:justify-center  p-4">
			<Link href={"/"}>
				<Image width={250} src={svgs.logo} alt="Afruna_Logo" />
			</Link>
			<SelectPicker
				items={["item one", "item two", "item three"]}
				placeholder={"Help"}
				triggerLeftIcon={<MdHelp />}
				getSelected={(value) => console.log(value)}
			/>
		</nav>
	</header>
));
