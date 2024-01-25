import { conversations } from "@/constants/data";
import { images } from "@/constants/images";
import { verifyImageUrl } from "@/utils/verify_image_url";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface CurrentUsersConversationsProps {
  img: string|undefined;
  message: string;
  time: string;
  isOwn: boolean;
}

export const CurrentUsersConversations: FC<CurrentUsersConversationsProps> = ({
  img,
  message,
  time,
  isOwn,
}) => {
  return (
    <div className={`flex gap-3 w-full p-2 ${isOwn && "justify-end"}`}>
      <Image
      height={40}
      width={40}
      src={verifyImageUrl(img as string)}
      alt="img"
      priority
      className={`w-8 h-8 rounded-full ${isOwn && "order-2"}`}
      />
      <div
        className={`flex flex-col gap-1 max-w-xs w-full ${
          isOwn && "items-end"
        }`}
      >
        <p
          className={`text-xs font-normal w-fit overflow-hidden rounded-[0.7rem] py-2 px-3 ${
            isOwn
              ? "bg-[#8E9EA4] text-white"
              : "border border-[#06AEEE] text-[#06AEEE]"
          }`}
        >
          {message}
        </p>
        <span className="text-xs text-[#333333]">{time}</span>
      </div>
    </div>
  );
};
