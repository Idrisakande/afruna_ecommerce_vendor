import { useCallback, useState } from "react";
import { MdSearch } from "react-icons/md";
import Image, { StaticImageData } from "next/image";

import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { Main } from "@/layouts/Main";
import { images } from "@/constants/images";
import { InputLabel } from "@/components/widgets/Input/InputLabel";
import { InputLabelNumber } from "@/components/widgets/Input/InputLabelNumber";

export default function Transfer() {
	const [selectedUsers, setSelectedUsers] = useState<
		{ image: StaticImageData; id: string; fullname: string }[]
	>([]);

	const onSelect = useCallback(
		(user: { image: StaticImageData; id: string; fullname: string }) => {
			let isSelected = selectedUsers.includes(user);
			let updatedSelectedOptions;
			if (isSelected) {
				updatedSelectedOptions = selectedUsers.filter(
					(opt) => opt !== user
				);
			} else {
				updatedSelectedOptions = [...selectedUsers, user];
			}
			setSelectedUsers(updatedSelectedOptions);
		},
		[selectedUsers]
	);
	return (
		<Main breadcrumbs={<Breadcrumbs />}>
			<div className="grid grid-cols-10 gap-8 mx-10 my-12 pb-24">
				<div className="col-span-4 bg-white rounded-2xl border p-4 space-y-2">
					<header className="flex flex-col">
						<h1 className="text-2xl text-slate-950">{`Seller's select(${selectedUsers.length})`}</h1>
					</header>
					<fieldset className="flex justify-between items-center p-1 border border-slate-300 rounded-md">
						<input
							type="text"
							placeholder="Search"
							className="px-4 py-1 w-full"
						/>
						<button className="text-slate-300">
							<MdSearch size={32} />
						</button>
					</fieldset>
					<div>
						{[
							{
								image: images.userImg1,
								id: "#dzkd33c",
								fullname: "Hammer Head",
							},
							{
								image: images.userImg1,
								id: "#dydycuc",
								fullname: "Kami Cranel",
							},
						].map((user, _) => (
							<div
								className="flex items-center p-1"
								key={_ + user.id}
							>
								<button
									onClick={() => onSelect(user)}
									className="flex justify-center items-center w-[25px] h-[25px] rounded-sm border border-slate-900"
								>
									{/* {selectedUsers.includes(user) ? (
										<MdCheck />
									) : null} */}
								</button>
								<Image
									src={user.image}
									alt="avatar"
									width={50}
									height={50}
									className="mx-4 rounded-full object-contain"
								/>
								<div className="font-semibold">
									<h2>{user.fullname}</h2>
									<span className="text-sm text-slate-700">
										{user.id}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="col-span-6 flex flex-col bg-white rounded-2xl border p-4">
					<InputLabel
						type="text"
						getValue={(val) => {}}
						headerTitle="Seller's Name"
						placeholder="Hammer Head"
					/>
					<InputLabel
						type="text"
						getValue={(val) => {}}
						headerTitle="Seller's ID"
						placeholder="#dzkd33c"
					/>
					<div className="grid grid-cols-2 gap-8">
						<InputLabel
							type="text"
							getValue={(val) => {}}
							headerTitle="Bank Name"
							placeholder="POS"
						/>
						<InputLabelNumber
							getValue={(val) => {}}
							headerTitle="Account Number"
							max={10}
							placeholder="9095783044"
						/>
					</div>
					<InputLabelNumber
						getValue={(val) => {}}
						headerTitle="Phone Number"
						max={14}
						placeholder="+2349095783044"
					/>
					<div className="grid grid-cols-2">
						<InputLabelNumber
							getValue={(val) => {}}
							headerTitle="Enter Amount"
							max={14}
							placeholder="5000"
						/>
					</div>
					<button className="bg-green-500 p-2 self-end rounded-md my-10 text-white">
						Transfer
					</button>
				</div>
			</div>
		</Main>
	);
}
