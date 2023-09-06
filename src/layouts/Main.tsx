import { SiderBar } from "@/components/SiderBar";
import { DashboardHeader } from "@/components/headers/DashboardHeader";
import { HeaderDropdown } from "@/components/widgets/HeaderDropdown";
import LocaleSelector from "@/components/widgets/LocaleSelector";
import { NotificationPopup } from "@/components/widgets/NotificationPopup";
import { SelectPicker } from "@/components/widgets/SelectPicker";
import { images } from "@/constants/images";
import Auth10 from "@/services/auth.service";
import { RootState } from "@/types/store.type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactElement, useCallback } from "react";
import { MdHelp, MdSettings, MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

interface MainProps {
	children: React.ReactNode;
	asideComponent?: ReactElement;
	breadcrumbs?: ReactElement;
}

export const Main: FC<MainProps> = ({
	breadcrumbs,
	children,
	asideComponent,
}) => {
	const router = useRouter();
	const settings = router.route === "/settings" ? true : "";
	const handleLogout = useCallback(() => {
		const authService = new Auth10(router);
		authService.handleLogout();
	}, []);
	const { bio_data } = useSelector((state: RootState) => state.user)
	if (!bio_data) return <></>
	return (
		<>
			{/* sticky p-10 top-0 z-30 flex justify-between items-center w-full */}
			{/*header*/}
			<DashboardHeader
				rightComponent={
					<>
						<SelectPicker
							items={["FAQs", "Contant Us"]}
							placeholder={"Get help"}
							triggerLeftIcon={<MdHelp className="text-lg" />}
							getSelected={(value) => console.log(value)}
							contentClassName="z-20"
							triggerClassName="flex text-xs space-x-1 items-center text-afruna-blue"
						/>
						{/* <NotificationPopup /> */}
						<HeaderDropdown profileSrc={bio_data.avatar} title={`${bio_data.firstName} ${bio_data.lastName}`} subtitle={bio_data.role} >
							<header className="w-full flex justify-between items-center border-b border-dotted p-2 py-4 text-slate-500 font-medium">
								<span>{bio_data.followers} Followers</span>
								<span>{bio_data.following} Followings</span>
							</header>
							{[
								{
									href: "settings",
									icon: <MdSettings size={20} />,
									name: "Settings",
								},
								{
									href: "orders",
									icon: <MdShoppingCart size={20} />,
									name: "My Orders",
								},
							].map(({ href, icon, name }, idx) => (
								<Link
									className="flex justify-start items-center p-2 px-10 hover:text-slate-500 hover:bg-afruna-opaque"
									key={href + idx}
									href={href}
								>
									{icon}
									<span className="ml-2">{name}</span>
								</Link>
							))}
							<button
								onClick={handleLogout}
								className="text-afruna-gold text-center w-full border-t border-dotted p-2 py-4"
							>
								Log out
							</button>
						</HeaderDropdown>
					</>
				}
			/>
			{/*content (sidebar + content)*/}
			<div className="flex overflow-hidden">
				{/* sidebar */}
				<SiderBar />
				<main className="relative w-full overflow-y-auto h-screen">
					{settings === true ? (
						<Image
							src={images.bannar}
							alt="bannar"
							className="sticky top-0 left-0 right-0 h-20"
						/>
					) : (
						<header className="sticky top-0 z-20 flex justify-between items-center bg-white h-20">
							<div className="max-w-[91.5%] mx-auto w-full flex justify-between items-center">
								{breadcrumbs}
								{asideComponent && asideComponent}
							</div>
						</header>
					)}
					{children}
				</main>
				{/* <AddVendor /> */}
			</div>
			{/*footer*/}
		</>
	);
};
