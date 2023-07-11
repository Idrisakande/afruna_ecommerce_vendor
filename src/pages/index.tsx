/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
// import { BgWrapper } from "@/components/widgets/BgWrapper";
import { images } from "@/constants/images";
import EntryLayout from "@/layouts/Entry.layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo, useCallback } from "react";

export default function () {
	const router = useRouter();
	const register = useCallback(() => router.push("auth/register"), [router]);
	return (
		<EntryLayout>
			<div className="grid grid-cols-2 text-afruna-blue">
				<div className="col-span-full md:col-span-1 p-7 md:p-10 space-y-2 md:space-y-4">
					<h1 className="text-xl md:text-3xl p-2 font-extrabold">
						Welcome to Afruna SELL
					</h1>
					<p className="text-xs md:text-lg p-2">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Libero natus repellat placeat consectetur! Adipisci ex
						incidunt natus, nemo distinctio inventore ducimus
						quidem, libero nam consequuntur autem hic nesciunt
						reprehenderit assumenda?
					</p>
					<button
						onClick={register}
						className="text-xs md:text-sm text-center text-white font-medium bg-gradient-y-deepblue p-3  rounded-md w-fit md:w-44"
					>
						Register Now
					</button>
				</div>
				<div className="col-span-full md:col-span-1">
					<Image
						src={images.vendorhomeart}
						alt="Logo"
						className=" w-[85%] object-scale-down -mt-10"
					/>
				</div>
			</div>
			<section className="bg-gradient-bob md:h-[50vh] backdrop-blur-md py-10 pb-12 md:pb-20 lg:pb-80 text-afruna-blue">
				<h1 className="text-xl md:text-3xl font-extrabold px-12 md:px-24">
					How do I stand to Get? Guaranteed
				</h1>
				<div className="p-8 md:p-10 md:px-28 grid grid-cols-3 gap-4 md:gap-8">
					<Offercard
						title={"Convenience"}
						description={
							"A one-stop e-commerce platfom for African goods buyers and vendors."
						}
					/>
					<Offercard
						title={"Global reach"}
						description={
							"Expand your footprint to all cornrs of the globe with Afruna platform."
						}
					/>
					<Offercard
						title={"Profitable"}
						description={
							"An irresistible offer that promises substantial gains and lucrative returns."
						}
					/>
				</div>
			</section>
			<div className="relative text-afruna-blue bg-white bg-opacity-40 flex flex-col justify-center items-center p-7 md:p-10 space-y-2 md:space-y-4">
				<Image
					className="absolute top-10 right-0"
					src={images.clipart_1}
					alt="right_clipart"
					width={70}
				/>
				<Image
					className="absolute bottom-0 left-0"
					src={images.clipart_2}
					alt="left_clipart"
					width={70}
				/>
				<h1 className="text-xl md:text-3xl font-extrabold">
					Ready to start selling!
				</h1>
				<p className="text-md md:text-xl">
					We can get you started in a few minutes.
				</p>
				<button className="text-xs md:text-md p-3 md:w-44 rounded-md font-semibold bg-gradient-set-store">
					Set up your Store
				</button>
			</div>
			<div className="relative bg-afruna-slate flex flex-col justify-center items-center  space-y-4 p-10">
				<h2 className="text-md md:text-xl text-afruna-blue font-bold">
					Subscribe on our newsletter
				</h2>
				<p className="text-xs font-thin text-afruna-gray">
					Get daily upcoming offers from many suppliers all over the
					world.
				</p>
				<form className="flex justify-between items-center rounded-md border-[1px] text-xs">
					<input
						type="email"
						name="subscribe"
						id="subscribe"
						className="p-2 px-5 rounded-s-md w-[50vw] bg-white"
						placeholder="Enter your email address..."
					/>
					<button className="p-2 bg-afruna-blue text-white rounded-e-md">
						Subscribe
					</button>
				</form>
			</div>
		</EntryLayout>
	);
}

const Offercard: FC<{ description: string; title: string }> = memo(
	({ description, title }) => (
		<div className="col-span-full md:col-span-1 border-[1px] border-slate-300 bg-white rounded-md p-4 bg-opacity-60 space-y-4">
			<h2 className="text-md md:text-lg font-semibold">{title}</h2>
			<p className="text-xs md:text-md">{description}</p>
		</div>
	)
);
