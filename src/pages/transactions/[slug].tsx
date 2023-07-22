/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import Transfer from "./transfers";

export default function () {
	const {
		query: { slug },
	} = useRouter();

	if (slug === "transfer") return <Transfer />;
}

export function getStaticPaths() {
	return {
		paths: [{ params: { slug: "transfer" } }],
		fallback: false,
	};
}
export function getStaticProps() {
	return {
		props: {
			slug: "",
		},
	};
}
