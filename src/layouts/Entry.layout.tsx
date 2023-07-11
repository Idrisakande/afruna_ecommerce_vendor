/* eslint-disable react/display-name */
import {
	FC,
	ReactElement,
	ReactNode,
	Ref,
	forwardRef,
	useCallback,
	useState,
} from "react";
import classnames from "classnames";
import Image from "next/image";
import * as Select from "@radix-ui/react-select";

import { svgs } from "@/constants/images";
import { MdHelp, MdMenu } from "react-icons/md";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import {
	FaAppStore,
	FaDotCircle,
	FaFacebookF,
	FaGooglePay,
	FaGooglePlay,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
} from "react-icons/fa";
import { TiSocialInstagram, TiSocialYoutube } from "react-icons/ti";
import { BiWorld } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

interface IEntryLayout {
	children: ReactNode;
}

export default function EntryLayout({ children }: IEntryLayout) {
	const router = useRouter();
	const register = useCallback(() => router.push("auth/register"), [router]);
	const login = useCallback(() => router.push("auth/login"), [router]);
	return (
		<main className="relative bg-fixed bg-afruna-opaque h-screen overflow-y-auto">
			{/* Header */}
			<header className="sticky top-0 bg-gradient-afruna z-10">
				<nav className="relative flex justify-between font-bold items-center md:px-20 px-5 py-3">
					<Link className="place-self-start" href={""}>
						<Image
							className=" w-[300]"
							src={svgs.logo}
							alt="Logo"
						/>
					</Link>
					<div className="hidden md:flex items-center space-x-4">
						<Picker
							items={["Help?", "Supports?", "Contact us"]}
							getSelected={(value) => console.log(value)}
							prefixHeaderIconComponent={<MdHelp />}
							isprefixHeaderIcon
						/>
						<Picker
							items={["FR", "EN", "CN"]}
							getSelected={(value) => console.log(value)}
							prefixHeaderIconComponent={<BiWorld />}
							isprefixHeaderIcon
							headerPlaceholder="Lang"
						/>
						<div className="text-xs flex items-center space-x-4">
							<button
								onClick={register}
								className="p-2 text-white bg-gradient-y-deepblue rounded-md"
							>
								Register Now
							</button>
							<button
								onClick={login}
								className="p-2 text-afruna-blue"
							>
								Sign in
							</button>
						</div>
					</div>
					<button className="md:hidden justify-self-end">
						<MdMenu size={40} />
					</button>
					{/* <div className="absolute left-0 top-0 w-[70vw] h-screen p-3 bg-gradient-afruna"></div> */}
				</nav>
			</header>
			{/* Main */}

			{children}
			{/* Footer */}

			<footer>
				<div className="bg-afruna-opaque grid grid-cols-9 gap-2 md:gap-4 text-afruna-blue">
					<div className="col-span-full md:col-span-3">
						<div className="flex p-5 md:p-10 flex-col justify-center items-center ">
							<Image
								src={svgs.logo}
								alt="Afruna Logo"
								className="md:w-52"
							/>
							<p className="text-xs">App comming soon...</p>
							<div className="flex flex-row justify-between items-center space-x-1">
								<StoreBtn
									iconComponent={<FaAppStore size={27} />}
									title={"App Store"}
									subtitle={"Download on the"}
								/>
								<StoreBtn
									iconComponent={<FaGooglePlay size={27} />}
									title={"Google Play"}
									subtitle={"GET IT ON"}
								/>
							</div>
						</div>
					</div>
					<div className="col-span-full md:col-span-4 grid grid-cols-4 gap-4 md:gap-8 p-1">
						<div className="text-xs col-span-1">
							<h3 className="font-bold my-1">About</h3>
							<div className="flex flex-col space-y-2">
								<Link href={""}>About us</Link>
								<Link href={""}>Contact us</Link>
								<Link href={""}>Career</Link>
							</div>
						</div>
						<div className="text-xs col-span-1">
							<h3 className="font-bold my-1">Privacy</h3>
							<div className="flex flex-col space-y-2">
								<Link href={""}>About us</Link>
								<Link href={""}>Find store</Link>
								<Link href={""}>Categories</Link>
								<Link href={""}>Blogs</Link>
							</div>
						</div>
						<div className="text-xs col-span-1">
							<h3 className="font-bold my-1">Let us help you</h3>
							<div className="flex flex-col space-y-2">
								<Link href={""}>Help center</Link>
								<Link href={""}>Money Refund</Link>
								<Link href={""}>Shipping</Link>
								<Link href={""}>Partnership</Link>
								<Link href={""}>F&Q</Link>
							</div>
						</div>
						<div className="text-xs col-span-1">
							<h3 className="font-bold my-1">For users</h3>
							<div className="flex flex-col space-y-2">
								<Link href={""}>Login</Link>
								<Link href={""}>Register</Link>
								<Link href={""}>Settings</Link>
								<Link href={""}>Sell on Afruna</Link>
								<Link href={""}>My Orders</Link>
							</div>
						</div>
					</div>
					<div className="col-span-full md:col-span-2 p-2 space-y-2 text-center md:text-start">
						<h4 className="text-xs">Follow us</h4>
						<div className="flex justify-center md:justify-start items-center space-x-2">
							<Link
								href={""}
								className="bg-afruna-blue p-2 rounded-full"
							>
								<FaFacebookF size={14} className="text-white" />
							</Link>
							<Link
								href={""}
								className="bg-afruna-blue p-2 rounded-full"
							>
								<FaTwitter size={14} className="text-white" />
							</Link>
							<Link
								href={""}
								className="bg-afruna-blue p-2 rounded-full"
							>
								<FaLinkedinIn
									size={14}
									className="text-white"
								/>
							</Link>
							<Link
								href={""}
								className="bg-afruna-blue p-2 rounded-full"
							>
								<TiSocialInstagram
									size={14}
									className="text-white"
								/>
							</Link>
							<Link
								href={""}
								className="bg-afruna-blue p-2 rounded-full"
							>
								<TiSocialYoutube
									size={14}
									className="text-white"
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className="bg-gradient-afruna w-full p-3 space-x-2 space-y-2 text-center text-xs text-afruna-blue">
					<span>&copy; {new Date().getFullYear()}</span>
					<span>Afruna Global Company | All Rights Reserved.</span>
				</div>
			</footer>
		</main>
	);
}

const StoreBtn: FC<{
	iconComponent: ReactElement;
	title: string;
	subtitle: string;
}> = ({ iconComponent, subtitle, title }) => (
	<button className="flex items-center bg-afruna-blue p-1 rounded-md text-white">
		{iconComponent}
		<div className="flex items-start flex-col p-1">
			<p className="text-[8px] font-thin">{subtitle}</p>
			<p className="text-[12px] font-semibold">{title}</p>
		</div>
	</button>
);

interface IPicker {
	getSelected: (val: any) => void;
	items: any[];
	isprefixHeaderIcon?: boolean;
	headerPlaceholder?: string;
	prefixHeaderIconComponent?: ReactElement;
}

const Picker: FC<IPicker> = ({
	getSelected,
	items,
	isprefixHeaderIcon,
	headerPlaceholder,
	prefixHeaderIconComponent,
}) => {
	const [selected, setSelected] = useState("");
	const handleSelection = useCallback(
		(val: any) => {
			setSelected(val);
			getSelected(val);
		},
		[getSelected]
	);
	return (
		<Select.Root onValueChange={handleSelection}>
			<Select.Trigger className="flex p-1 justify-between items-center text-afruna-blue">
				<Select.Icon className="mr-1">
					{isprefixHeaderIcon &&
						(prefixHeaderIconComponent ?? <FaDotCircle />)}
				</Select.Icon>
				<span className="text-xs">
					<Select.Value
						placeholder={
							selected ? selected : headerPlaceholder ?? "Select"
						}
					/>
				</span>
				<Select.Icon className="ml-1">
					<RxChevronDown />
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					asChild
					className="bg-white rounded-md max-w-md"
					position="popper"
					sticky="always"
				>
					<Select.Viewport>
						<Select.ScrollUpButton>
							<RxChevronUp size={20} />
						</Select.ScrollUpButton>
						{items.map((item, _) => (
							<SelectItem
								className="p-1 text-xs cursor-pointer text-afruna-blue hover:bg-afruna-blue hover:text-white  hover:border-y-2"
								value={item}
								key={_}
							>
								{item}
							</SelectItem>
						))}
						<Select.ScrollUpButton>
							<RxChevronUp size={20} />
						</Select.ScrollUpButton>
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};

const SelectItem = forwardRef(
	(
		{
			children,
			className,
			value,
			...props
		}: {
			children: React.ReactNode;
			value: string | number;
			className?: string;
		},
		forwarded: Ref<HTMLDivElement>
	) => {
		return (
			<Select.Item
				value={value as string}
				className={classnames("", className)}
				{...props}
				ref={forwarded}
			>
				<Select.ItemText>{children}</Select.ItemText>
			</Select.Item>
		);
	}
);
