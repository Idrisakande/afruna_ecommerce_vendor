import { useRouter } from "next/router";
import React from "react";

export default function Breadcrumbs() {
	const {
		pathname,
		query: { slug },
	} = useRouter();
	const r = pathname.split("[")[0];
	const route = r === "/" ? "Dashboard" : r.split("/")[1];
	return (
		<section>
			<h1 className="capitalize">
				{route}
				<span className="text-slate-700 font-medium">
					{" "}
					{slug ? " > ".concat(slug as string) : ""}
				</span>
			</h1>
		</section>
	);
}
