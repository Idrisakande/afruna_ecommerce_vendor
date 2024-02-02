import Image from "next/image";
import { images } from "@/constants/images";

export default function () {
	return (
		<>
			<div id="preloader">
                <div id="loader" />
                <Image width={100} height={100} className="w-24 h-24" src={images.afruna_logo} alt="logo" id="heartbeat_preload" />
			</div>
				
		</>
	);
}
