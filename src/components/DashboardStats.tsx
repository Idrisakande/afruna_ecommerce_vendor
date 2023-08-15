import Image from "next/image";
import { images } from "@/constants/images";

export const DashboardStats = () => (
  <div className="grid grid-cols-4 gap-2 md:gap-4 my-10 snap-mandatory snap-y snap-center">
    {[
      { title: "Listed Products", value: 22933 },
      { title: "Total Orders", value: 1137 },
      { title: "Shipped Orders", value: 1202 },
      { title: "Cancelled Orders", value: 4159 },
    ].map(({ title, value }, idx) => (
      <div
        key={idx}
        className={`p-3 h-24 text-afruna-blue relative col-span-full md:col-span-2 lg:col-span-1 space-y-1 border border-slate-200 rounded-md ${
          idx === 0 && "bg-blue-300/60"
        } ${idx === 1 && "bg-fuchsia-600/40"} ${idx === 2 && "bg-teal-300/60"}
							${idx === 3 && "bg-pink-300/60"}`}
      >
        <h1 className="font-extrabold text-sm md:text-xl">{value}</h1>
        <p className="font-medium text-xs md:text-md">{title}</p>
        <Image
          src={images.clipart_3}
          alt="clipArt"
          height={100}
          className="absolute right-0 bottom-0"
        />
        {idx === 0 && (
          <Image
            src={images.clipart_5}
            alt="clipart"
            className="absolute opacity-20 left-0 bottom-0"
          />
        )}
        {(idx + 1) % 2 === 0 && (
          <Image
            src={images.clipart_4}
            alt="clipart"
            className="absolute left-0 bottom-0"
          />
        )}
        {idx === 2 && (
          <Image
            src={images.clipart_6}
            alt="clipart"
            className="absolute left-0 bottom-0"
          />
        )}
      </div>
    ))}
  </div>
);
