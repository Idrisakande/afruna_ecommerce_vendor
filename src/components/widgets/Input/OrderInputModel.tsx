import { FC, useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrdersContext } from "@/contexts/OrdersProvider";
import { IOrederContext } from "@/interfaces/tables.interface";
import * as ScrollArea from "@radix-ui/react-scroll-area";
// import { SortItem } from "../SortItem";
import { SortItem } from "@/components/SortItem";
import { IOrederInput } from "@/interfaces/inputs.interfaces";
import { Model } from "../../Model";
interface OrderInputModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderInputModel: FC<OrderInputModelProps> = ({
  isOpen,
  onClose,
}) => {
  // const [isModelOpen, setIsModelOpen ] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IOrederInput>();

  const onSubmit: SubmitHandler<IOrederInput> = (data) => {
    console.log(data);
  };

  const handleDateChange = (e) => {
    setValue("orderDate", e.target.value);
  };

  return (
    <>
      <Model isOpen={isOpen} onclose={onClose} title="Add Order">
        <div className="bg-white mt-2 w-full mx-auto text-start pr-1">
          <ScrollArea.Root className="ScrollAreaRoot px-6 w-full h-[81vh] overflow-hidden">
            <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 flex-wrap mt-4 pb-16"
              >
                <fieldset className="w-full px-2 gap-2 flex flex-col">
                  <label
                    className="text-[0.9rem] font-semibold"
                    htmlFor="customerName"
                  >
                    Customer Name
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    placeholder="Enter Name"
                    className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                    {...register("customerName", {
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  {errors.customerName && (
                    <p className="text-blue mt-1">
                      {errors.customerName.message}
                    </p>
                  )}
                </fieldset>
                <fieldset className="w-full px-2 gap-2 flex flex-col">
                  <label
                    className="text-[0.9rem] font-semibold"
                    htmlFor="product"
                  >
                    Product
                  </label>
                  <input
                    id="product"
                    type="text"
                    placeholder="Enter Product"
                    className="w-full placeholder:text-[#959191] z-30 px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                    {...register("product", {
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  {errors.product && (
                    <p className="text-blue mt-1">
                      {errors.product.type === "required" &&
                        "This field is required."}
                    </p>
                  )}
                </fieldset>
                <fieldset className="w-full px-2 gap-2 flex flex-col">
                  <label
                    className="text-[0.9rem] font-semibold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full overflow-hidden placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors.email && (
                    <p className="text-blue mt-1">
                      {errors.email.type === "required" &&
                        "This field is required."}
                    </p>
                  )}
                </fieldset>
                <fieldset className="w-full px-2 gap-2 flex flex-col">
                  <label
                    className="text-[0.9rem] font-semibold"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="08107057812"
                    className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                    {...register("phoneNumber", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="text-blue mt-1">
                      {errors.phoneNumber.type === "required" &&
                        "This field is required."}
                    </p>
                  )}
                </fieldset>
                <div className="flex gap-2 w-full">
                  <fieldset className="w-full px-2 gap-2 flex flex-col">
                    <label
                      className="text-[0.9rem] font-semibold"
                      htmlFor="orderDate"
                    >
                      Order Date
                    </label>
                    <input
                      id="orderDate"
                      type="date"
                      placeholder="Select date"
                      className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                      {...register("orderDate", {
                        required: true,
                      })}
                    />
                    {errors.orderDate && (
                      <p className="text-blue mt-1">
                        {errors.orderDate.type === "required" &&
                          "This field is required."}
                      </p>
                    )}
                  </fieldset>
                  <fieldset className="w-full px-2 gap-2 flex flex-col">
                    <label
                      className="text-[0.9rem] font-semibold"
                      htmlFor="delivery_date"
                    >
                      Delivery Date
                    </label>
                    <input
                      id="deliveryDate"
                      type="date"
                      placeholder="Select date"
                      className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                      {...register("deliveryDate", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                    />
                    {errors.deliveryDate && (
                      <p className="text-blue mt-1">
                        {errors.deliveryDate.type === "required" &&
                          "This field is required."}
                      </p>
                    )}
                  </fieldset>
                </div>
                <div className="flex gap-2">
                  <fieldset className="w-full px-2 gap-2 flex flex-col">
                    <label
                      className="text-[0.9rem] font-semibold"
                      htmlFor="amount"
                    >
                      Total Amount
                    </label>
                    <input
                      id="amount"
                      type="number"
                      placeholder="Enter Amount"
                      className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                      {...register("amount", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                    />
                    {errors.amount && (
                      <p className="text-blue mt-1">
                        {errors.amount.type === "required" &&
                          "This field is required."}
                      </p>
                    )}
                  </fieldset>
                  <fieldset className="w-full px-2 gap-2 flex flex-col">
                    <label
                      className="text-[0.9rem] font-semibold"
                      htmlFor="paymentMethod"
                    >
                      Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                      {...register("paymentMethod", {
                        required: true,
                      })}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="stripe">Stripe</option>
                    </select>
                    {errors.paymentMethod && (
                      <span className="error">Payment method is required</span>
                    )}
                  </fieldset>
                </div>
                <fieldset className="w-full px-2 gap-2 flex flex-col">
                  <label
                    className="text-[0.9rem] font-semibold"
                    htmlFor="paymentMethod"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                    {...register("paymentMethod", {
                      required: true,
                    })}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Stripe</option>
                  </select>
                  {errors.paymentMethod && (
                    <span className="error">Payment method is required</span>
                  )}
                </fieldset>
                <fieldset className="w-full px-2 gap-2 flex flex-col">
                  <label
                    className="text-[0.9rem] font-semibold"
                    htmlFor="email"
                  >
                    Acount Status
                  </label>
                  <SortItem
                    placeholder={"Select account Status"}
                    item_1={"Active"}
                    item_2={"Inactive"}
                    className="max-w-full"
                  />
                  {errors.email && (
                    <p className="text-blue mt-1">
                      {errors.email.type === "required" &&
                        "This field is required."}
                      {errors.email.type === "pattern" &&
                        "Invalid email address."}
                    </p>
                  )}
                </fieldset>
                <fieldset className="w-full px-2 gap-2 flex flex-col">
                  <label
                    className="text-[0.9rem] font-semibold"
                    htmlFor="accountStatus"
                  >
                    Account Status
                  </label>
                  <input
                    id="accountStatus"
                    type="accountStatus"
                    placeholder="Acount Status"
                    className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
                    {...register("accountStatus", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors.accountStatus && (
                    <p className="text-blue mt-1">
                      {errors.accountStatus.type === "required" &&
                        "This field is required."}
                    </p>
                  )}
                </fieldset>
                <div className="flex gap-4 items-center justify-end mt-8 xs:mt-10">
                  <button
                    onClick={onClose}
                    className="text-sm font-bold text-[#E93627] px-4 py-2 flex justify-center items-center gap-2 rounded-md outline-none border hover:border-[#E93627] hover:text-blue hover:bg-white transition duration-500 xs:px-6 xs:py-3"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm font-bold text-white px-4 py-2 flex justify-center items-center gap-2 bg-[#1D9F51] rounded-md outline-none hover:bg-[#1D9F51]/80 transition duration-500 xs:px-6 xs:py-3"
                    type="submit"
                  >
                    Add Order
                  </button>
                </div>
              </form>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className="ScrollAreaScrollbar p-[2px] flex "
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="rounded-xl" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="" />
          </ScrollArea.Root>
        </div>
      </Model>
    </>
  );
};
