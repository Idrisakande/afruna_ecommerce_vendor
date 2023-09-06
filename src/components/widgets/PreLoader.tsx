import Image from "next/image";
import { images } from "@/constants/images";

export default function () {
	return (
		<>
			<div id="preloader">
                <div id="loader" />
                <Image src={images.afruna_logo} alt="logo" id="heartbeat_preload" />
			</div>
				
		</>
	);
}
