/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import { OrderDetails } from "./OrderDetails";
import { OrderInvoice } from "./OrderInvoice";

export default function () {
  const {
    query: { slug },
  } = useRouter();

  if (slug === "details") return <OrderDetails />;
  if (slug == "invoice") return <OrderInvoice />;
}

export function getStaticPaths() {
  return {
    paths: [{ params: { slug: "details" } }, { params: { slug: "invoice" } }],
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
