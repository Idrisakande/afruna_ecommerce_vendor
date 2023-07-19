/* eslint-disable react/display-name */
import { FC, memo, useContext, useEffect, useMemo, useState } from "react";
import { Content } from "./Content";
import { IProductContext } from "@/interfaces/IProductContext";
import { productcontext } from "@/contexts/ProductProvider";
import Image from "next/image";
import { images } from "@/constants/images";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import { FaCheck, FaDotCircle } from "react-icons/fa";
export const ProductReviews: FC<{}> = memo(({ }) => {
  const { handleViewReview } = useContext(productcontext) as IProductContext;
  const router = useRouter();
  const [reviewed_products] = useState([
    {
      id: 1,
      name: "Men Tshirt vintage",
      category: "Fashion",
      status: "Rejected",
      image: images.product,
    },
    {
      id: 2,
      name: "Men Tshirt Burberry",
      category: "Fashion",
      status: "Delivered",
      image: images.product1,
    },
    {
      id: 3,
      name: "Iphone13",
      category: "Phones",
      status: "Pending",
      image: images.product2,
    },
    {
      id: 4,
      name: "Blouse ans skirts",
      category: "Fashion",
      status: "Pending",
      image: images.product4,
    },
    {
      id: 5,
      name: "Men Tshirt vintage",
      category: "Fashion",
      status: "Rejected",
      image: images.product7,
    },
  ]);
  useEffect(() => {
    const hiddenBTN = document.querySelector(
      "button.bg-gradient-y-deepblue",
    ) as HTMLButtonElement;
    hiddenBTN.style.display = "none";
  }, []);
  return (
    <Content>
      <div className={"px-3 py-5 w-full"}>
        {reviewed_products.map(({ category, id, image, name, status }, idx) => {
          const RenderStatus = useMemo((): JSX.Element => {
            let render: JSX.Element;
            switch (status) {
              case "Rejected":
                render = (
                  <p
                    className={
                      "flex text-[12px] space-x-2 items-center  text-red-500/70"
                    }
                  >
                    <MdCancel />
                    <span>{status}</span>
                  </p>
                );
                break;
              case "Delivered":
                render = (
                  <p
                    className={
                      "flex text-[12px] space-x-2 items-center  text-green-500/70"
                    }
                  >
                    <FaCheck />
                    <span>{status}</span>
                  </p>
                );
                break;
              default:
                render = (
                  <p
                    className={
                      "flex space-x-2 text-[12px] items-center text-slate-500/70"
                    }
                  >
                    <FaDotCircle />
                    <span>{status}</span>
                  </p>
                );
                break;
            }
            return render;
          }, []);
          return (
            <div
              key={idx}
              className={
                "grid grid-cols-5 text-[14px] border border-afruna-gray/20 rounded-md my-3 p-3"
              }
            >
              <Image
                alt={"Product_Image"}
                src={image}
                className={"md:col-span-1 w-[150px]"}
              />
              <div className={"md:col-span-3 font-bold"}>
                <span className={"text-afruna-gold/70"}>#{id}</span>
                <p className={"text-afruna-blue/70"}>{name}</p>
                <span className={"text-slate-500 font-thin text-[10px]"}>
                  {category}
                </span>
                {RenderStatus}
              </div>
              <div className="md:col-span-1">
                <button
                  onClick={() => {
                    handleViewReview({ category, id, image, name, status });
                    router.push("/products/product-review");
                  }}
                  className={
                    "text-afruna-gold/70 block tracking-tight font-semibold"
                  }
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Content>
  );
});
