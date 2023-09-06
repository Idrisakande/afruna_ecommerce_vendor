import { FC, useEffect, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { orderStatus } from "@/constants/data";
import * as Progress from "@radix-ui/react-progress";
import { IoMdCheckmark } from "react-icons/io";

interface OrderStatusProps {}

export const OrderStatus: FC<OrderStatusProps> = ({}) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollArea.Root className="ScrollAreaRoot mt-5 mb-12 w-full pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
      <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full">
        <div className="w-screen lg:w-full">
          <div className="flex justify-between items-center px-12 py-6">
            <h3 className="text-xl font-semibold tracking-tight">
              Order Status
            </h3>
            <button
            
              className="px-8 py-3 rounded font-semibold tracking-tight bg-[#FFE7E5]
"
            >
              Update Status
            </button>
          </div>
          <div className="border-t border-slate-300" />
          <div className="flex justify-between relative items-center max-w-[88%] pt-12 pb-28 mx-auto">
            {orderStatus.map(({ status, date, order_status }) => {
              return (
                <div
                  key={status}
                  className="flex flex-col gap-8 justify-center items-center"
                >
                  <div
                    className={`w-10 h-10 z-40 rounded-full flex justify-center ring-4 ring-[#D3D3D3] items-center ${
                      order_status
                        ? "bg-[#009a49] ring-green-400 text-white"
                        : "bg-[#D3D3D3] text-black"
                    }`}
                  >
                    <IoMdCheckmark size={20} className="" />
                  </div>
                  <div className="flex justify-center gap-3 flex-col items-center">
                    <h3 className="text-sm font-semibold">{status}</h3>
                    <span
                      className={`text-xs text-gray-300 ${
                        order_status && "text-gray-800"
                      }`}
                    >
                      {date}
                    </span>
                  </div>
                </div>
              );
            })}
            <Progress.Root
              className="absolute top-[25%] left-0 right-0 overflow-hidden max-w-[88%] mx-auto bg-[#D3D3D3] rounded-full w-full h-[2px]"
              style={{
                // Fix overflow clipping in Safari
                // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
                transform: "translateZ(0)",
              }}
              value={progress}
            >
              <Progress.Indicator
                className="bg-green-400 w-full h-full transition-transform duration-[660ms] "
                style={{ transform: `translateX(-${100 - progress}%)` }}
              />
            </Progress.Root>
          </div>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
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
  );
};
