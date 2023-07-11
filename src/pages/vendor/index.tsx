import React, { useCallback, useContext, useState } from "react";
import { GoPlus, GoSearch } from "react-icons/go";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { vendorDetails } from "@/constants/data";
import { DetailBox } from "@/components/DetailBox";
import { SortMonth } from "@/components/SortMonth";
import { SortItem } from "@/components/SortItem";
import VendorTable from "@/components/widgets/tables/VendorTable";
import VendorsProvider, { VendorsContext } from "@/contexts/VendorsProvider";
import { Model } from "@/components/Model";
import { Button } from "@/components/Button";
import { MdRemoveRedEye } from "react-icons/md";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { error } from "console";

export default function Index() {
  const {
    register,
    formState: { errors },
  } = useForm();
  const { addVendor } = useContext(VendorsContext);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [vendor_name, setVendorName] = useState<string>("");
  const [isOpen, setIsopen] = useState(false);
  const onClose = useCallback(() => setIsopen(false), []);
  const handleOpenModel = useCallback(() => setIsopen((prev) => !prev), []);
  return (
    <VendorsProvider>
      <main className="m-7 pb-20">
        <div className="flex flex-wrap gap-8">
          {vendorDetails &&
            vendorDetails.map(
              ({ numbers, text, bgImg, bg_gradient, normalStyles }, idx) => (
                <DetailBox
                  className="max-w-[22rem]"
                  idx={idx}
                  key={text}
                  numbers={numbers}
                  text={text}
                  bgImg={bgImg}
                  bg_gradient={bg_gradient}
                  normalStyles={normalStyles}
                />
              )
            )}
        </div>
        <div className="grid grid-cols-12 gap-8 bg-white mt-10 p-8 rounded-xl border border-slate-300">
          <div className="col-span-full md:col-span-8 lg:col-span-9 grid grid-cols-4 gap-4">
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
              placeholder={"All"}
              item_1={"Item 1"}
              item_2={"Item 2"}
              item_3={"Item 3"}
              item_4={"Item 4"}
              className={"xs:col-span-full lg:col-span-1"}
            />
            <SortMonth className={"xs:col-span-full lg:col-span-1"} />
            {/* <SelectItem children={<undefined>} className={""}/> */}
          </div>
          <div className="flex justify-end items-center col-span-full lg:w-full md:col-span-full lg:col-span-3">
            <button
              onClick={handleOpenModel}
              className=" max-w-[10rem] p-3 rounded-lg text-sm text-white bg-blue-500 flex justify-center items-center"
            >
              <GoPlus size={20} />
              <span className="ml-2">Add Vendor</span>
            </button>
          </div>
          <Model title="Add Vendor" isOpen={isOpen} onclose={onClose}>
            <ScrollArea.Root className="ScrollAreaRoot px-6 w-full h-[81vh] overflow-hidden">
              <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full">
                <form className="flex flex-col text-start" role="vendor form">
                  <fieldset>
                    <label
                      className="text-md font-medium"
                      htmlFor="vendor-name"
                    >
                      Vendor Name
                    </label>
                    <input
                      onChange={(val) => setVendorName(val.target.value)}
                      value={vendor_name}
                      id="vendor-name"
                      type="text"
                      name="vendor-name"
                      placeholder="Enter vendor's name"
                      className="w-full placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
                    />
                  </fieldset>

                  <fieldset>
                    <label className="text-md font-medium" htmlFor="shop-name">
                      Shop Name
                    </label>
                    <input
                      id="shop-name"
                      type="text"
                      name="shop-name"
                      placeholder="Enter shop name"
                      className="w-full placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
                    />
                  </fieldset>

                  <fieldset>
                    <label
                      className="text-md font-medium"
                      htmlFor="vendor-email"
                    >
                      Email
                    </label>
                    <input
                      onChange={(val) => setEmail(val.target.value)}
                      value={email}
                      id="vendor-email"
                      type="email"
                      name="vendor-email"
                      placeholder="Enter vendor's name"
                      className="w-full placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
                    />
                  </fieldset>

                  <fieldset>
                    <label className="text-md font-medium" htmlFor="phone-no">
                      Phone Number
                    </label>
                    <input
                      onChange={(val) => setPhone(val.target.value)}
                      value={phone}
                      data-phone-no="phone-no"
                      id="phone-no"
                      type="number"
                      max={11}
                      maxLength={11}
                      name="phone-no"
                      placeholder="Enter vendor number"
                      className="w-full data-[phone-no=phone-no]:textfield appearance-none placeholder:text-slate-900 my-3 px-5 py-3 border-[1px] border-slate-300 rounded-md shadow-sm outline-none focus:outline-slate-900 focus:border-none focus:outline-[1px]"
                    />
                  </fieldset>
                  <div className="space-x-4 place-self-end">
                    <button className="p-3 rounded-sm text-sm text-red-500 bg-white">
                      <span className="ml-2">Cancel</span>
                    </button>
                    <button
                      onClick={() => {
                        addVendor?.({
                          vendor_name,
                          created_at: Date.now().toLocaleString(),
                          email,
                          phone,
                          status: "active",
                          balance: 0,
                          itm_stock: 0,
                        });
                        alert("Upload Successfully");
                      }}
                      className="p-3 rounded-sm text-sm text-white bg-green-600"
                    >
                      <span className="ml-2">Add Vendor</span>
                    </button>
                  </div>
                </form>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </Model>
        </div>
        <VendorTable />
      </main>
    </VendorsProvider>
  );
}
