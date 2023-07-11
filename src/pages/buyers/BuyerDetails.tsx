import { SortItem } from "@/components/SortItem";
import { VendorProducts } from "@/components/VendorProducts";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { BuyerOrderTable } from "@/components/widgets/tables/BuyerOrderTable";
import { images } from "@/constants/images";
import { Main } from "@/layouts/Main";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface BuyerDetailsProps {}

export const BuyerDetails: FC<BuyerDetailsProps> = ({}) => {
  const router = useRouter();
  return (
    <Main breadcrumbs={<Breadcrumbs />}>
      <main className="w-full pb-16">
        <div className="relative">
          <Image
            src={images.bannar}
            alt="bannar"
            priority
            className="w-full h-20"
          />
          <div className="bg-gray-300/50 h-20 top-0 left-0 right-0 absolute" />
        </div>
        <div className="px-8 my-20 pr-20 w-full">
          <div className="relative flex flex-col w-full ">
            <Image
              src={images.userImg}
              alt="image"
              priority
              width={120}
              className="absolute object-contain -top-32 bg-black rounded-full"
            />
            <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold max-w-[22.7rem] tracking-tight">
                  Edward Diana
                </h2>
                <h4 className="text-xs text-[#7C7C7C] font-semibold max-w-[22.7rem] tracking-tight">
                  <span className="text-sm text-black font-semibold tracking-tight">
                    Joined:
                  </span>{" "}
                  Since 22 May, 2022
                </h4>
              </div>
              <div className="flex flex-col">
                <button className="text-sm border border-blue-500 font-semibold rounded-md tracking-tight px-5 py-2">
                  Remove Buyer
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <p className="text-xs mt-1 text-[#7C7C7C] font-semibold">
                  Biningora, Nigeria
                </p>
                <span className="text-xs mt-1 text-[#7C7C7C] font-semibold">
                  uyor@fashion.com
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col mt-8 gap-3 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex gap-8">
                {/* <div>
                  <h4 className="text-sm font-semibold tracking-tight">3005</h4>
                  <span className="text-sm text-[#7C7C7C] font-semibold">
                    Followers
                  </span>
                </div> */}
                <div>
                  <h4 className="text-sm font-semibold tracking-tight">50</h4>
                  <span className="text-sm text-[#7C7C7C] font-semibold">
                    Following
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-16">
            {[
              {
                number: `$${2578}`,
                text: "Total Spent",
                bgImg: images.cardBg1,
                bg_gradient:
                  "linear-gradient(180deg, #CDDFFD 0%, #FCFDFF 100%)",
                bgImgStyles: "top-4 right-0",
              },
              {
                number: `$${8578}`,
                text: "Orders Placed",
                bgImg: images.cardBg2,
                bg_gradient:
                  "linear-gradient(180deg, #FCF2DA 0%, #FCFDFF 100%)",
                bgImgStyles: "top-0 right-0",
              },
            ].map(({ number, text, bg_gradient, bgImg, bgImgStyles }) => (
              <div
                key={text}
                style={{ background: bg_gradient }}
                className="relative flex flex-col gap-1 w-full p-8 shadow-md rounded-lg max-w-[16rem]"
              >
                <h3 className="text-sm font-semibold">{number}</h3>
                <p className="text-sm font-semibold">{text}</p>
                <Image
                  src={bgImg}
                  alt="bannar"
                  priority
                  className={`absolute ${bgImgStyles}`}
                />
              </div>
            ))}
          </div>
          <div className="my-10 w-full">
            <ScrollArea.Root className="ScrollAreaRoot w-full h-[70vh] px-4 pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
              <ScrollArea.Viewport className="ScrollAreaViewport relative w-full h-full pb-6">
                <div className="bg-white z-10 sticky top-0 left-0 right-0 w-full flex justify-between items-center border-b border-[#D5D5E6] px-8 py-4">
                  <h2 className="text-xl font-semibold">Orders</h2>
                  <div className="flex gap-5 min-w-[22rem] justify-end items-center">
                    <SortItem
                      placeholder="All"
                      item_1="All"
                      item_2="Approved"
                      item_3="Unapproved"
                      className={"max-w-[10rem]"}
                    />
                    <SortItem
                      placeholder="This Mouth"
                      item_1="All"
                      item_2="Approved"
                      item_3="Unapproved"
                      className={"max-w-[10rem]"}
                    />
                  </div>
                </div>
                <BuyerOrderTable />
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Scrollbar
                className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200 "
                orientation="horizontal"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="" />
            </ScrollArea.Root>
          </div>
        </div>
      </main>
    </Main>
  );
};
