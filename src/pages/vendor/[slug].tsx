/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import { VendorDetails } from "./VendorDetails";

export default function () {
  const {
    query: { slug },
  } = useRouter();

  if (slug === "details") return <VendorDetails />;
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
