import React, { useCallback, useState } from "react";
import { GoPlus, GoSearch } from "react-icons/go";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { buyers_details } from "@/constants/data";
import { DetailBox } from "@/components/DetailBox";
import { Main } from "@/layouts/Main";
import { SortMonth } from "@/components/SortMonth";
import { SortItem } from "@/components/SortItem";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import BuyersTable from "@/components/widgets/tables/BuyersTable";
import { Model } from "@/components/Model";

export default function Index() {
  const [isOpen, setIsopen] = useState(false);
  const onClose = useCallback(() => setIsopen(false), []);
  const handleOpenModel = useCallback(() => setIsopen((prev) => !prev), []);
  return (
    <Main breadcrumbs={<Breadcrumbs />}>
      <main className="m-7 pb-20">
        <div className="flex flex-wrap gap-7">
          {buyers_details.map(
            ({ numbers, text, bgImg, bg_gradient, normalStyles }, idx) => (
              <DetailBox
                className="max-w-[19rem]"
                idx={idx}
                key={text}
                numbers={numbers}
                text={text}
                bgImg={bgImg}
                normalStyles={normalStyles}
                bg_gradient={bg_gradient}
              />
            )
          )}
        </div>
        <div className="grid grid-cols-12 gap-8 bg-white mt-10 p-8 rounded-xl border border-slate-300">
          <div className="col-span-full md:col-span-8 lg:col-span-9 grid grid-cols-4 gap-8">
            <fieldset className="xs:col-span-full lg:col-span-2 overflow-hidden text-[#777777] border border-slate-300 flex justify-between items-center rounded-xl">
              <input
                type="text"
                placeholder="Search"
                name="search"
                className="w-full text-base p-3 outline-none focus:outline focus:outline-1 focus:outline-blue focus:bg-white"
              />
              <GoSearch className="text-slate-200 w-16 text-2xl cursor-pointer" />
            </fieldset>

            <SortItem
              item_1="Item One"
              item_2="Item Two"
              placeholder="Select item"
            />
            <SortMonth className="" />
            {/* <SelectItem children={<undefined>} className={""}/> */}
          </div>
          <button
            onClick={handleOpenModel}
            className="col-span-full max-w-[9rem] lg:w-full md:col-span-full lg:col-span-3 flex p-3 rounded-lg text-sm text-white bg-blue-500 justify-center items-center"
          >
            <GoPlus size={20} />
            <span className="ml-2">Add User</span>
          </button>

          <Model isOpen={isOpen} onclose={onClose} title="Add User">
            <ScrollArea.Root className="ScrollAreaRoot px-6 w-full h-[81vh] overflow-hidden">
              <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full">
                <form className="flex flex-col text-start" role="buyer form">
                  <fieldset>
                    <label className="text-md font-medium" htmlFor="first-name">
                      First Name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      name="first-name"
                      placeholder="Enter user's first name"
                      className="w-full placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
                    />
                  </fieldset>
                  <fieldset>
                    <label className="text-md font-medium" htmlFor="last-name">
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      name="last-name"
                      placeholder="Enter user's last name"
                      className="w-full placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
                    />
                  </fieldset>

                  <fieldset>
                    <label className="text-md font-medium" htmlFor="user-email">
                      Email
                    </label>
                    <input
                      id="user-email"
                      type="email"
                      name="user-email"
                      placeholder="Enter user's name"
                      className="w-full placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
                    />
                  </fieldset>

                  <fieldset>
                    <label className="text-md font-medium" htmlFor="phone-no">
                      Phone Number
                    </label>
                    <input
                      data-phone-no="phone-no"
                      id="phone-no"
                      type="number"
                      max={11}
                      maxLength={11}
                      name="phone-no"
                      placeholder="Enter user number"
                      className="w-full data-[phone-no=phone-no]:textfield appearance-none placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
                    />
                  </fieldset>
                  <div className="space-x-4 place-self-end mt-10">
                    <button className="p-3 rounded-sm text-sm text-red-500 bg-white">
                      <span className="ml-2">Cancel</span>
                    </button>
                    <button className="p-3 rounded-sm text-sm text-white bg-green-600">
                      <span className="ml-2">Add User</span>
                    </button>
                  </div>
                </form>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </Model>
        </div>
        <BuyersTable />
      </main>
    </Main>
  );
}
