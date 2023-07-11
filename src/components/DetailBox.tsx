import { FC } from "react";
import classnames from "classnames";
import Image, { StaticImageData } from "next/image";

interface DetailBoxProps {
  numbers: number | string;
  text: string;
  OrderStyles?: string;
  idx: number;
  className: string;
  bgImg: StaticImageData;
  order?: boolean;
  bg_gradient: string;
  normalStyles?: string;
}

export const DetailBox: FC<DetailBoxProps> = ({
  numbers,
  text,
  bgImg,
  idx,
  className,
  order,
  bg_gradient,
  OrderStyles,
  normalStyles,
}) => {
  // ${
  //   idx % 2
  //     ? "bg-[url(../assets/imgs/cdBg3.png)] cardbg-left"
  //     : "bg-[url(../assets/imgs/cdBg1.png)] cardbg-right"
  // }
  return (
    <div
      className={classnames(
        `rounded-lg w-full relative overflow-hidden  
        ${order === true ? "p-7" : "p-8 h-36"}`,
        className
      )}
      style={{ background: bg_gradient }}
    >
      <h1
        className={`tracking-normal ${
          order === true ? "text-2xl font-semibold" : "text-3xl font-bold "
        }`}
      >
        {numbers.toLocaleString("us-EN")}
      </h1>
      <p
        className={`text-slate-900 font-semibold text-[1.1rem] mt-2 ${
          order === true ? "mt-2 text-[1rem]" : ""
        }`}
      >
        {text}
      </p>
      <Image
        src={bgImg}
        alt={"image"}
        priority
        className={`absolute  ${
          order === true ? OrderStyles : ""
        } ${normalStyles}`}
      />
    </div>
  );
};
