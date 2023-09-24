import { images } from "@/constants/images";
import Image from "next/image";
import { memo } from "react";

export const ResultsFallback = memo(({fallback_message = "Nothing is found!"}:{fallback_message?:string}) =>  (
			<div className="flex text-afruna-blue justify-center items-center flex-col gap-2 md:gap-4">
				<Image
					className="object-contain h-40 w-40"
					src={images.noResult}
					alt="no_recent_reviews"
				/>
				<h1 className="font-semibold text-xl">{fallback_message}</h1>
			</div>
		));