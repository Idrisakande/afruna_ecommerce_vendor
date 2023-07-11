import { FC } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { GoSearch, GoPlus } from "react-icons/go";
import { useRouter } from "next/router";
import ItemPicker from "@/components/widgets/ItemPicker";
import { SelectItem, SortItem } from "./SortItem";
import { images } from "@/constants/images";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import {
  BsStar,
  BsStarFill,
  BsStarHalf,
  BsThreeDotsVertical,
} from "react-icons/bs";

interface VendorProductsProps {}

export const VendorProducts: FC<VendorProductsProps> = ({}) => {
  const router = useRouter();
  return (
    <ScrollArea.Root className="ScrollAreaRoot relative w-full h-[65vh] px-4 overflow-auto rounded-xl mt-8 border shadow-sm bg-white border-slate-300">
      <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full">
        <div className="w-screen lg:w-full">
          <div className="sticky top-0 left-0 right-0 bg-white flex justify-between items-center border-b border-[#D5D5E6] px-8 py-6">
            <h2 className="text-lg font-semibold">Products by Vendor</h2>
            <div className="flex gap-5 max-w-[37rem] w-full justify-end">
              <SortItem
                placeholder="All"
                item_1="All"
                item_2="Approved"
                item_3="Unapproved"
                className={"max-w-[10rem]"}
              />
              <fieldset className="min-w-[10rem] overflow-hidden text-[#777777] border border-slate-300 flex justify-between items-center rounded-lg">
                <input
                  type="text"
                  placeholder="Search"
                  name="search"
                  className="w-full px-3 placeholder:text-sm text-sm outline-none focus:outline focus:outline-1 focus:outline-blue focus:bg-white"
                />
                <GoSearch
                  size={40}
                  className="text-slate-200 pr-3 cursor-pointer"
                />
              </fieldset>

              <button
                onClick={() => router.push("products/new")}
                className="flex px-6 py-3 text-sm rounded-md text-white bg-blue-500 justify-center items-center"
              >
                <GoPlus size={20} className="mr-1" />
                Add Product
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 w-full p-12 gap-6">
            {[
              {
                img: images.product7,
                name: "Tree Shirt",
                price: `$${485}`,
                mainPrice: `$${325}`,
              },
              {
                img: images.product7,
                name: "Skirt and Gawon",
                price: `$${102}`,
                mainPrice: `$${202}`,
              },
              {
                img: images.product7,
                name: "Bags",
                price: `$${670}`,
                mainPrice: `$${602}`,
              },
              {
                img: images.product7,
                name: "Bag",
                price: `$${670}`,
                mainPrice: `$${602}`,
              },
              {
                img: images.product7,
                name: "Hand",
                price: `$${670}`,
                mainPrice: `$${602}`,
              },
              {
                img: images.product7,
                name: "HandBags",
                price: `$${670}`,
                mainPrice: `$${602}`,
              },
              {
                img: images.product7,
                name: "Hand-Bags",
                price: `$${670}`,
                mainPrice: `$${602}`,
              },
            ].map(({ img, name, price, mainPrice }) => (
              <div
                key={name}
                className="bg-[#FBFBFB] shadow-md py-8 flex flex-col gap-2 w-full rounded-md min-w-[11rem]"
              >
                <div className="flex flex-col gap-2 justify-center items-center">
                  <Image
                    src={img}
                    alt="image"
                    priority
                    className="w-[7rem] object-contain"
                  />
                  <h3 className="text-sm font-semibold">{name}</h3>
                  <div className="flex gap-1 text-[#D3D3D3] text-sm">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                    <BsStar />
                  </div>
                </div>
                <div className="flex mt-4 justify-between px-4 items-center">
                  <p className="text-sm font-semibold">
                    {price}{" "}
                    <span className="text-sm ml-1 line-through text-[#D3D3D3] font-semibold">
                      {mainPrice}
                    </span>
                  </p>
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <button
                        className="cursor-pointer focus:outline-none"
                        aria-label="Update dimensions"
                      >
                        <BsThreeDotsVertical className=" w-5 h-6 hover:bg-slate-100 " />
                      </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        className="PopoverContent -mt-7  ml-20 font-semibold text-xs flex flex-col gap-1 shadow-md bg-white w-[6rem] rounded-md px-2 py-2"
                        sideOffset={5}
                      >
                        <button className="p-1 text-start rounded-sm  hover:bg-slate-200 transition duration-300 outline-none focus:outline-none ">
                          Approve
                        </button>
                        <button className="p-1 text-start rounded-sm hover:bg-slate-200 transition duration-300 outline-none focus:outline-none ">
                          Unapprove
                        </button>
                        <button className="p-1 text-start rounded-sm hover:bg-slate-200 transition duration-300 outline-none focus:outline-none ">
                          View item
                        </button>
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar p-[2px] rounded-xl mb-4 flex bg-slate-100 hover:bg-slate-200"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar p-[2px] rounded-xl mb-4 flex bg-slate-100 hover:bg-slate-200 "
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="" />
    </ScrollArea.Root>
  );
};
