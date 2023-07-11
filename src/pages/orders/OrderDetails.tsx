import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { OrderStatus } from "@/components/widgets/OrderStatus";
import { OrderDetailsTable } from "@/components/widgets/tables/OrderDetailsTable";
import { Main } from "@/layouts/Main";
import Link from "next/link";
import { FC } from "react";
import { BsTruck } from "react-icons/bs";
import { RiFileListFill } from "react-icons/ri";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface OrderDetailsProps {}

export const OrderDetails: FC<OrderDetailsProps> = ({}) => {
  return (
    <Main breadcrumbs={<Breadcrumbs />}>
      <main className="m-7 pb-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:max-w-[96%] sm:mx-auto">
          <h2 className="text-xl font-semibold">Order ID: #6565</h2>
          <div className="flex justify-start sm:justify-end items-center">
            <Link
              href={"/orders/invoice"}
              className="px-6 py-2 text-white bg-gradient-lightBluebutton flex gap-1 justify-center items-center rounded"
            >
              <RiFileListFill size={20} />
              <span className="tracking-tight">Invoice</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row lg:ml-3 gap-6 mt-8 justify-start sm:items-center">
          <div className="py-4 px-6 text-xs bg-gradient-green rounded-md h-[9rem] w-full max-w-[16rem]">
            <h2 className="text-lg mb-2 font-semibold tracking-tight ">
              Buyer Info
            </h2>
            <p className="text-[0.85rem] font-semibold mb-1 tracking-tight ">
              Leo Paula Jaboati dexk
            </p>
            <p className="tracking-tight mb-1">LeoPj@menu.comcom</p>
            <span className="tracking-tight ">+234074653864</span>
          </div>
          <div className="py-4 px-6 text-xs bg-gradient-purple rounded-md h-[9rem] w-full max-w-[16rem]">
            <h2 className="text-lg mb-2 font-semibold tracking-tight ">
              Shipping Address
            </h2>
            <p className="text-[0.85rem] font-semibold mb-1 tracking-tight max-w-[12.115rem] ">
              No 23, Luis Jamar crescent Taskira, Abuja Nigeria.
            </p>
            <span className="tracking-tight ">+234074653864</span>
          </div>
        </div>
        <div className="flex justify-end mt-5 md:-mt-5 max-w-[97.5%] mx-auto">
          <Link
            href={"/orders/invoice"}
            className="px-5 py-2 text-white bg-gradient-deepSmallBlue flex gap-1 justify-center items-center rounded"
          >
            <BsTruck size={15} />
            <span className="tracking-tight">Track Order</span>
          </Link>
        </div>
        <div className="flex flex-wrap justify-between w-full mt-4">
          <div className="w-full max-w-[65%]">
            <OrderDetailsTable />
          </div>
          <div className="w-full max-w-[34%]">
            <ScrollArea.Root className="ScrollAreaRoot w-full h-[72vh] bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
              <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full pb-6">
                <div className="border-b pt-4 pb-3 px-6 border-slate-300 flex justify-start items-center text-lg font-semibold">
                  Payment Details
                </div>
                <div className=" w-full pt-6 px-6 flex flex-col gap-4 justify-between items-center">
                  <div className="mt-4 flex w-full min-w-full gap-4 justify-start items-center">
                    <h3 className="text-sm text-[#777687] min-w-[50%] font-semibold">
                      Transactions id:
                    </h3>
                    <h3 className="text-sm text-[#777687] pr-[0.1rem] min-w-[50%] font-semibold">
                      #VLZ34673467e3
                    </h3>
                  </div>
                  <div className="mt-4 flex w-full min-w-full gap-4 justify-start items-center">
                    <h3 className="text-sm text-[#777687] min-w-[48%] font-semibold">
                      Payment Method:
                    </h3>
                    <h3 className="text-sm text-[#777687] min-w-[52%] font-semibold">
                      Debit
                    </h3>
                  </div>
                  <div className="mt-4 flex w-full min-w-full gap-4 justify-start items-center">
                    <h3 className="text-sm text-[#777687] min-w-[50%] font-semibold">
                      Card Number:
                    </h3>
                    <h3 className="text-sm text-[#777687] pr-[0.1rem] min-w-[50%] font-semibold">
                      XXXX XXXX XXXX 2567
                    </h3>
                  </div>
                  <div className="mt-4 flex w-full min-w-full gap-4 justify-start items-center">
                    <h3 className="text-sm text-[#777687] min-w-[50%] font-semibold">
                      Card Holder Name:
                    </h3>
                    <h3 className="text-sm text-[#777687] pr-[0.1rem] min-w-[50%] font-semibold">
                      Dainel Gonizer
                    </h3>
                  </div>
                  <div className="mt-4 flex w-full min-w-full gap-4 justify-start items-center">
                    <h3 className="text-sm text-[#777687] min-w-[50%] font-semibold">
                      Total Amount:
                    </h3>
                    <h3 className="text-sm text-[#777687] min-w-[50%] font-semibold">
                      $5756.95
                    </h3>
                  </div>
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
          </div>
        </div>
        <OrderStatus />
      </main>
    </Main>
  );
};
