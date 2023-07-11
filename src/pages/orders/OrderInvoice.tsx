import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { InvoiceTable } from "@/components/widgets/tables/InvoiceTable";
import { images } from "@/constants/images";
import { Main } from "@/layouts/Main";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BsPrinter } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface OrderInvoiceProps {}

export const OrderInvoice: FC<OrderInvoiceProps> = ({}) => {
  return (
    <Main breadcrumbs={<Breadcrumbs />}>
      <main className="m-7 pb-28">
        <div className="flex items-center justify-start max-w-[96%] mx-auto">
          <h2 className="text-xl font-semibold">Invoice</h2>
        </div>
        <ScrollArea.Root className="ScrollAreaRoot w-full lg:max-w-[93%] mx-auto py-6 bg-white overflow-auto rounded-xl border mt-10 shadow-sm border-slate-300">
          <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full pb-6">
            <div className="py-8 px-10 flex justify-between items-start">
              <Image
                src={images.logo}
                alt="logo"
                priority
                width={150}
                className=""
              />
              <div className="flex flex-col gap-2 text-sm font-semibold justify-start items-start">
                <span>Email: support@afruna.com</span>
                <span>
                  Website:{" "}
                  <Link href={"www.afruna.com"} className="text-blue-300">
                    www.afruna.com
                  </Link>
                </span>
                <span>Contact No: 08064527467</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-start items-start py-2 px-14">
              <h1 className="text-[#A3A3B1] text-2xl">Address</h1>
              <p className="text-[#0C0E3B] text-[0.9rem] font-semibold max-w-[15rem]">
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore mag
              </p>
            </div>
            <div className=" border-t border-b border-slate-300 my-8 py-6 px-14 flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h1 className="text-[#A3A3B1] text-2xl">Order ID</h1>
                <p className="text-[#0C0E3B] font-semibold ">#3764883463287</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#A3A3B1] text-2xl">Date</h1>
                <p className="text-[#0C0E3B] font-semibold ">
                  23 May, 2023{" "}
                  <span className="text-sm text-[#A3A3B1]">07:15PM</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-start items-start">
                <h1 className="text-[#A3A3B1] text-2xl">Payment Status</h1>
                <div className="flex bg-green-100 justify-start p-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-green-700" />
                  <p className="text-xs text-green-500 ml-1">Paid</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#A3A3B1] text-2xl">Total Amount</h1>
                <p className="text-[#0C0E3B] font-semibold ">$3740.99</p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start py-2 px-14">
              <h1 className="text-[#A3A3B1] text-2xl">Shipping Address</h1>
              <p className="mt-4 text-[#0C0E3B] text-[0.9rem] font-semibold max-w-[15rem]">
                No 23, Luis Jamar crescent Taskira, Abuja Nigeria.
              </p>
              <span className="text-xs mt-2 font-semibold text-[#0C0E3B]">
                +2348175243664
              </span>
            </div>
            <InvoiceTable />
            <div className="bg-[#EAFAFF] rounded-md mb-8 mt-16 max-w-[80%] mx-auto py-6 px-16 text-xs font-semibold">
              <strong className="text-[0.9rem]">NOTE:</strong> Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse
            </div>
            <div className="flex mb-4 text-white justify-end items-center gap-8 max-w-[83%] mx-auto">
              <button className="px-6 p-2 flex gap-2 justify-center items-center bg-gradient-lightGreenGradient rounded-md">
                <BsPrinter />
                <span>Print</span>
              </button>
              <button className="px-6 p-2 text-white bg-gradient-lightBluebutton rounded-md flex items-center justify-center gap-2">
                <HiOutlineDownload />
                <span>Download</span>
              </button>
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar "
            orientation="vertical"
          >
            <ScrollArea.Thumb className="" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar lg:hidden p-[2px] rounded-xl` flex bg-slate-100 hover:bg-slate-200 "
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-slate-100 hover:bg-slate-200" />
        </ScrollArea.Root>
      </main>
    </Main>
  );
};
