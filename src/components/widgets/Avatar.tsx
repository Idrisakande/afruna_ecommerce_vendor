import { images } from "@/constants/images";
import { verifyImageUrl } from "@/utils/verify_image_url";
import Image, { StaticImageData } from "next/image";
import { FC, memo } from "react";

interface AvatarProps {
  img: string|undefined;
  active?: boolean;
  isOwn?: boolean;
  convo?: boolean;
}

export const Avatar: FC<AvatarProps> = memo(({ img, active, isOwn, convo }) => {
  return (
    <div className="flex relative ">
      <Image
      height={40}
      width={40}
      src={ verifyImageUrl(img as string)}
      alt="image"
        priority
        className={`${convo ? "w-8 h-8" : "w-12 h-12"} rounded-full ${
          isOwn && "order-2"
        }`}
      />
      <span
        className={`${active ? "bg-blue-500" : "bg-slate-400"} ${
          convo ? "hidden" : ""
        } absolute rounded-full h-2 w-2 ${
          convo ? "bottom-6" : "bottom-1"
        }  right-1 ring-2 ring-white`}
      />
    </div>
  );
});
