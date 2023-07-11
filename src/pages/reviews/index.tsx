import { useRouter } from "next/router";
import React from "react";

import { Main } from "@/layouts/Main";
import { reviewsRating } from "@/constants/data";
import Image from "next/image";
import { images } from "@/constants/images";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";

export default function Index() {
  const router = useRouter();
  const reviews = router.route === "/reviews" ? "Review and Rating" : "";
  return (
    <>
      <Main breadcrumbs={<Breadcrumbs />}>
        <main className="m-7 mb-40 flex flex-wrap gap-y-8 bg-white border border-slate-300 py-14 px-8 rounded-3xl">
          {reviewsRating.map(({ id, name, date, message }) => {
            return (
              <div className=" max-w-[20.75rem]" key={id}>
                <div>
                  <div className="flex gap-4 justify-start items-start">
                    <Image
                      src={images.review}
                      alt="review"
                      width={50}
                      className=" object-contain"
                    />
                    <div className="text-[#1C1C1C] flex flex-col gap-3">
                      <h2 className="font-semibold tracking-normal text-sm">
                        {name}
                      </h2>
                      <div className="flex gap-1 text-[#FF9E3A] text-sm">
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarHalf />
                        <BsStar />
                      </div>
                      <span className="font-semibold text-[0.83rem] text-[#1C1C1C]/90">
                        {date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[#000000] font-medium text-[14px] mt-1">
                  {message}
                </p>
              </div>
            );
          })}
        </main>
      </Main>
    </>
  );
}
