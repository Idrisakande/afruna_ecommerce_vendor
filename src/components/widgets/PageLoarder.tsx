import Image from "next/image";
import { images } from "@/constants/images";

export default function () {
	return (
		<>
			<div id="pageloader">
				<div id="loader" />
			</div>
				<div id="page_heartbeat_box">
					<Image src={images.afruna_logo} alt="logo" id="heartbeat" />
				</div>
		</>
	);
}
