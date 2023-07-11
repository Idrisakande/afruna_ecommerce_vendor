import React, { useContext, useEffect, useState } from "react";
import { GoPlus, GoSearch } from "react-icons/go";

import { orderCardDetails } from "@/constants/data";
import { DetailBox } from "@/components/DetailBox";
import { SortItem } from "@/components/SortItem";
import { SortDate } from "@/components/SortDate";
import { SortOrder } from "@/components/SortOrder";
import { OrderTable } from "@/components/widgets/tables/OrderTable";
import { OrderInputModel } from "@/components/widgets/Input/OrderInputModel";
import { OrdersContext, OrdersProvider } from "@/contexts/OrdersProvider";
// import { IOrederContext } from "@/interfaces/tables.interface";

export default function Index() {
  // const { toggleOrderButton } = useContext(OrdersContext) as TOrderContext;
  const [isOrderModelOpen, setIsOrderModelOpen] = useState(false);

  // useEffect(() => {
  //   setOpen(false);
  // }, []);
  const order = true;
  return (
    <OrdersProvider>
      <main className="m-6 pb-20">
        <div className="flex gap-4 flex-wrap ">
          {orderCardDetails.map(
            ({ numbers, text, bg_gradient, bgImg, OrderStyles }, idx) => (
              <DetailBox
                className="max-w-[15.5rem]"
                idx={idx}
                key={text}
                numbers={numbers}
                text={text}
                bgImg={bgImg}
                OrderStyles={OrderStyles}
                order={order}
                bg_gradient={bg_gradient}
              />
            )
          )}
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-5 bg-white mt-10 p-8 lg:px-4 rounded-xl border border-slate-300">
          <div className="flex flex-wrap flex-col gap-5 md:flex-row lg:min-w-[45rem]">
            <fieldset className="max-w-[20rem] md:max-w-[22rem] lg:max-w-[17rem] w-full overflow-hidden text-[#777777] border border-slate-300 flex justify-between items-center rounded-lg">
              <input
                type="text"
                placeholder="Search Order Id, Customer..."
                name="search"
                className="w-full px-3 placeholder:text-sm text-sm outline-none focus:outline focus:outline-1 focus:outline-blue focus:bg-white"
              />
              <GoSearch
                size={40}
                className="text-slate-200 pr-3 cursor-pointer"
              />
            </fieldset>

            <SortDate className={"max-w-[20rem] md:max-w-[8rem]"} />
            <SortItem
              placeholder={"All"}
              item_1={"Item 1"}
              item_2={"Item 2"}
              item_3={"Item 3"}
              item_4={"Item 4"}
              className={"max-w-[20rem] md:max-w-[8rem]"}
            />
            <SortOrder className={"max-w-[20rem] md:max-w-[8rem]"} />
          </div>
          <button
            onClick={() => setIsOrderModelOpen(true)}
            className="flex p-3 text-sm rounded-lg max-w-[20rem] md:max-w-[10rem] text-white bg-blue-500 justify-center items-center"
          >
            Create an Order
          </button>
          <OrderInputModel
            isOpen={isOrderModelOpen}
            onClose={() => setIsOrderModelOpen(false)}
          />
        </div>
        <OrderTable />
      </main>
    </OrdersProvider>
  );
}
