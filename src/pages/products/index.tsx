import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import ItemPicker from "@/components/widgets/ItemPicker";
import { Main } from "@/layouts/Main";
import { useRouter } from "next/router";
import React from "react";
import { GoPlus, GoSearch } from "react-icons/go";
import ProductsTable from "@/components/widgets/tables/ProductsTable";
import { SortItem } from "@/components/SortItem";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { CategoryDropdownMenu } from "@/components/widgets/CategoryDropdownMenu";

function Products() {
  const router = useRouter();
  return (
    <Main breadcrumbs={<Breadcrumbs />}>
      <main className="mx-10 my-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 bg-white mt-8 p-8 lg:px-4 rounded-xl border border-slate-300">
          <button className="flex gap-2 w-fit items-center">
            <CategoryDropdownMenu>
              <Link href={"/products/categories"}>
                <DropdownMenu.DropdownMenuItem className="cursor-pointer flex justify-between items-center outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300">
                  <p>All</p>
                  <span>513</span>
                </DropdownMenu.DropdownMenuItem>
              </Link>
              <Link href={"/products/categories"}>
                <DropdownMenu.DropdownMenuItem className="cursor-pointer flex justify-between items-center outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300">
                  <p>Fashion</p>
                  <span>100</span>
                </DropdownMenu.DropdownMenuItem>
              </Link>
              <Link href={"/products/categories"}>
                <DropdownMenu.DropdownMenuItem className="cursor-pointer flex justify-between items-center outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300">
                  <p>Art & Craft</p>
                  <span>100</span>
                </DropdownMenu.DropdownMenuItem>
              </Link>
              <Link href={"/products/categories"}>
                <DropdownMenu.DropdownMenuItem className="cursor-pointer flex justify-between items-center outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300">
                  <p>Afruna Books</p>
                  <span>13</span>
                </DropdownMenu.DropdownMenuItem>
              </Link>
              <Link href={"/products/categories"}>
                <DropdownMenu.DropdownMenuItem className="cursor-pointer flex justify-between items-center outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300">
                  <p>Afruna Movie</p>
                  <span></span>
                </DropdownMenu.DropdownMenuItem>
              </Link>
              <Link href={"/products/categories"}>
                <DropdownMenu.DropdownMenuItem className="cursor-pointer flex justify-between items-center outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300">
                  <p>Electronics</p>
                  <span>50</span>
                </DropdownMenu.DropdownMenuItem>
              </Link>
              <Link href={"/products/categories"}>
                <DropdownMenu.DropdownMenuItem className="cursor-pointer flex justify-between items-center outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-[#F3F6F9] transition duration-300">
                  <p>Foot Wears</p>
                  <span>45</span>
                </DropdownMenu.DropdownMenuItem>
              </Link>
            </CategoryDropdownMenu>
            <h2 className="text-xl font-semibold">All Category</h2>
          </button>

          <div className="flex flex-wrap gap-4 lg:min-w-[25.1rem]">
            <fieldset className=" w-full sm:max-w-[14.5rem] overflow-hidden text-[#777777] border border-slate-300 flex justify-between items-center rounded-lg">
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
            <SortItem
              placeholder={"Sort"}
              item_1={"All"}
              item_2={"Alphabetically"}
              item_3={"Ascending"}
              item_4={"Decending"}
              item_5={"Newiy Listed"}
              className={"sm:max-w-[9.5rem]"}
            />
          </div>
          <div className="flex lg:justify-end lg:items-end">
            <button
              onClick={() => router.push("products/new")}
              className="flex py-3 px-6 text-sm rounded-lg text-white bg-blue-500 justify-center items-center"
            >
              <GoPlus size={23} />
              <span className="ml-2">Add Product</span>
            </button>
          </div>
        </div>
        {/* <div className="my-8 pb-12 w-full"> */}
        <ProductsTable />
        {/* </div> */}
      </main>
    </Main>
  );
}

export default Products;
