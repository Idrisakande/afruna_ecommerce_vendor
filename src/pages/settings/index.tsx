"use client";

import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { Main } from "@/layouts/Main";
import { images } from "@/constants/images";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
export default function Index() {
	const {
		register,
		setValue,
		formState: { errors },
	} = useForm();
	const [country, setCountry] = useState("");

	// const [open, setOpen] = useState<boolean>(false);

	// const slide = () => {
	//   if (open) {
	//     setOpen(false);
	//   } else {
	//     setOpen(true);
	//   }
	// };
	const handlePhoneInputChange = (value: any) => {
		setValue("phoneNumber", value);
	};

	// const onSubmit = (data: any) => {
	//   // Handle form submission
	//   console.log(data);
	// };
	return (
		<>
			<Main>
				<main className="px-8 py-14 text-xs">
					<div className="relative flex gap-8">
						<Image
							src={images.userImg}
							alt="Image"
							priority
							className=" absolute z-20 -top-28 left-4 w-32 h-32 object-contain rounded-full"
						/>
						<div className="flex justify-end items-end min-w-[19rem]">
							<button className="bg-gradient-deepBluebutton py-1 px-5 text-sm text-white rounded">
								Upload a Photo
							</button>
						</div>
					</div>
					<Accordion.Root
						className="bg-white max-w-[80%] mt-8 border border-slate-300 rounded-lg px-10"
						type="single"
						defaultValue="item-1"
						collapsible
					>
						<Accordion.Item
							className="AccordionItem w-full"
							value="item-1"
						>
							<Accordion.Header className="AccordionHeader">
								<Accordion.Trigger className="AccordionTrigger border-none outline-none w-full flex justify-between items-center py-6">
									<h2 className="text-xl font-bold">
										General Information
									</h2>
									<ChevronDownIcon
										className="
                    AccordionChevron w-6 h-5 transition duration-300"
										aria-hidden
									/>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="pb-12 pt-2 w-full">
								<form className="flex flex-col gap-4">
									<div className="flex gap-4">
										<fieldset className="w-full gap-2 flex flex-col">
											<label
												className="text-[0.9rem] font-semibold"
												htmlFor="first-name"
											>
												First Name
											</label>
											<input
												id="first-name"
												type="text"
												placeholder="Jov"
												className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
												{...register("firstName", {
													required: true,
													maxLength: 100,
												})}
											/>
											{errors.firstName && (
												<p className="text-blue mt-1">
													{errors.firstName.type ===
														"required" &&
														"This field is required."}
													{errors.firstName.type ===
														"maxLength" &&
														"Max length is 100 char."}
												</p>
											)}
										</fieldset>
										<fieldset className="w-full gap-2 flex flex-col">
											<label
												className="text-[0.9rem] font-semibold"
												htmlFor="last-Name"
											>
												Last Name
											</label>
											<input
												id="last-Name"
												type="text"
												placeholder="Dov"
												className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
												{...register("lastName", {
													required: true,
													maxLength: 100,
												})}
											/>
											{errors.lastName && (
												<p className="text-blue mt-1">
													{errors.lastName.type ===
														"required" &&
														"This field is required."}
													{errors.lastName.type ===
														"maxLength" &&
														"Max length is 100 char."}
												</p>
											)}
										</fieldset>
									</div>
									<div className="flex gap-4">
										<fieldset className="w-full gap-2 flex flex-col">
											<label
												className="text-[0.9rem] font-semibold"
												htmlFor="business-name"
											>
												Business Name
											</label>
											<input
												id="business-name"
												type="text"
												placeholder="jovdon.com"
												className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
												{...register("businessName", {
													required: true,
													maxLength: 100,
												})}
											/>
											{errors.businessName && (
												<p className="text-blue mt-1">
													{errors.businessName
														.type === "required" &&
														"This field is required."}
													{errors.businessName
														.type === "maxLength" &&
														"Max length is 100 char."}
												</p>
											)}
										</fieldset>
										<fieldset className="w-full gap-2 flex flex-col">
											<label
												className="text-[0.9rem] font-semibold"
												htmlFor="email-address"
											>
												Email address
											</label>
											<input
												id="vendor-name"
												type="email"
												placeholder="Jondov@gmail.com"
												className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
												{...register("email", {
													required: true,
													pattern:
														/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												})}
											/>
											{errors.email && (
												<p className="text-blue mt-1">
													{errors.email.type ===
														"required" &&
														"This field is required."}
													{errors.email.type ===
														"pattern" &&
														"Invalid email address."}
												</p>
											)}
										</fieldset>
									</div>
									<fieldset className="max-w-[49%] gap-2 flex flex-col">
										<label
											className="text-[0.9rem] font-semibold"
											htmlFor="country"
										>
											Country of Residence
										</label>
										<ReactFlagsSelect
											fullWidth
											selected=""
											onSelect={setCountry}
										/>
										{errors.country && (
											<p className="text-blue mt-1">
												{errors.country.type ===
													"required" &&
													"This field is required."}
											</p>
										)}
									</fieldset>
									<div className="flex items-center justify-end mt-4 xs:mt-2">
										<button
											className="text-sm font-medium bg-[#1F74A2] text-white px-4 py-2 flex justify-center items-center gap-2 bg-blue rounded-md outline-none transition duration-500 xs:px-6 xs:py-3"
											type="submit"
										>
											Update Information
										</button>
									</div>
								</form>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>

					<Accordion.Root
						className="bg-white max-w-[80%] mt-4 border border-slate-300 rounded-lg px-10"
						type="single"
						defaultValue="item-1"
						collapsible
					>
						<Accordion.Item
							className="AccordionItem w-full"
							value="item-1"
						>
							<Accordion.Header className="AccordionHeader">
								<Accordion.Trigger className="AccordionTrigger w-full flex justify-between items-center py-6">
									<h2 className="text-xl font-bold">
										Language
									</h2>
									<ChevronDownIcon
										className="AccordionChevron w-6 h-5 transition duration-300"
										aria-hidden
									/>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="pb-12 pt-2 w-full">
								<form className="flex flex-col gap-4">
									<fieldset className="max-w-[49%] gap-2 flex flex-col">
										<label
											className="text-[0.9rem] font-semibold"
											htmlFor="language"
										>
											Preferred Language
										</label>
										<input
											id="language"
											type="text"
											placeholder="English"
											className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
											{...register("language", {
												required: true,
											})}
										/>
										{errors.language && (
											<p className="text-blue mt-1">
												{errors.language.type ===
													"required" &&
													"This field is required."}
											</p>
										)}
									</fieldset>

									<div className="flex items-center justify-end mt-4 xs:mt-2">
										<button
											className="text-sm font-medium bg-[#1F74A2] text-white px-4 py-2 flex justify-center items-center gap-2 bg-blue rounded-md outline-none transition duration-500 xs:px-6 xs:py-3"
											type="submit"
										>
											Update anguage
										</button>
									</div>
								</form>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>

					<Accordion.Root
						className="bg-white max-w-[80%] mt-6 border border-slate-300 rounded-lg px-8"
						type="single"
						defaultValue="item-1"
						collapsible
					>
						<Accordion.Item
							className="AccordionItem w-full"
							value="item-1"
						>
							<Accordion.Header className="">
								<Accordion.Trigger className="AccordionTrigger px-2 w-full flex justify-between items-center py-6">
									<h2 className="text-xl font-bold">
										Security
									</h2>
									<ChevronDownIcon
										className="
                    AccordionChevron w-6 h-5 transition duration-300"
										aria-hidden
									/>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="AccordionContent overflow-hidden pb-12 pt-2 w-full transition duration-500">
								<form className="flex flex-col gap-4">
									<div className="flex gap-2 px-2">
										<fieldset className="w-full gap-2 flex flex-col">
											<label
												className="text-[0.9rem] font-semibold"
												htmlFor="password"
											>
												Password
											</label>
											<input
												id="password"
												type="password"
												placeholder="Password"
												className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
												{...register("password", {
													required: true,
													maxLength: 100,
												})}
											/>
											{errors.password && (
												<p className="text-blue mt-1">
													{errors.password.type ===
														"required" &&
														"This field is required."}
													{errors.password.type ===
														"maxLength" &&
														"Max length is 100 char."}
												</p>
											)}
										</fieldset>
										<fieldset className="w-full px-2 gap-2 flex flex-col">
											<label
												className="text-[0.9rem] font-semibold"
												htmlFor="number"
											>
												Phone Number
											</label>

											<PhoneInput
												// onChange={handlePhoneChange}
												// value={phone}
												defaultCountry="ng"
												inputClassName="ml-2"
												inputProps={{
													...register("phone"),
												}}
												inputStyle={{
													border: "none",
													width: "100%",
												}}
												countrySelectorStyleProps={{
													buttonStyle: {
														border: "none",
													},
												}}
												placeholder="phone number"
												className="flex items-center p-2 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md"
											/>

											{errors.lastName && (
												<p className="text-blue mt-1">
													{errors.lastName.type ===
														"required" &&
														"This field is required."}
													{errors.lastName.type ===
														"maxLength" &&
														"Max length is 100 char."}
												</p>
											)}
										</fieldset>
									</div>
									<div className="flex items-center justify-end mt-4 xs:mt-3">
										<div className="flex gap-4">
											<button
												className="text-[0.9rem] font-semibold px-4 py-2 border border-[#1F74A2] flex justify-center items-center gap-2 rounded-md outline-none transition duration-500 xs:px-4 xs:py-2"
												type="submit"
											>
												Change Password
											</button>
											<button
												className="text-[0.9rem] font-semibold px-4 py-2 border border-[#1F74A2] flex justify-center items-center gap-2 rounded-md outline-none transition duration-500 xs:px-4 xs:py-2"
												type="submit"
											>
												Add Phone Number
											</button>
										</div>
									</div>
								</form>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				</main>
			</Main>
		</>
	);
}
