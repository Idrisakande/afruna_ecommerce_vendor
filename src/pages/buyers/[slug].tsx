/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import { BuyerDetails } from "@/pages/buyers/BuyerDetails";

export default function () {
  const {
    query: { slug },
  } = useRouter();

  if (slug === "details") return <BuyerDetails />;
}

export function getStaticPaths() {
  return {
    paths: [{ params: { slug: "details" } }],
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
