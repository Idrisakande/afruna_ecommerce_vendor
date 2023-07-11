/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import NewProduct from "./NewProduct";
import ProductCategories from "./ProductCategories";

export default function () {
	const {
		query: { slug },
	} = useRouter();

	if (slug === "new") return <NewProduct />;
	if (slug == "categories") return <ProductCategories />;
}

export function getStaticPaths() {
	return {
		paths: [
			{ params: { slug: "new" } },
			{ params: { slug: "categories" } },
		],
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
