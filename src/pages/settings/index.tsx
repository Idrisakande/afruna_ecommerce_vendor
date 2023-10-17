import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FieldValue, useForm } from "react-hook-form";
import {
	CountryIso2,
	PhoneInput,
	usePhoneValidation,
} from "react-international-phone";
import "react-international-phone/style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Main } from "@/layouts/Main";
import { images } from "@/constants/images";
import ReactFlagsSelect from "react-flags-select";
import { FormEventHandler, useCallback, useRef, useState } from "react";
import { RootState } from "@/types/store.type";
import { useSelector } from "react-redux";
import get_countryUtil from "@/utils/get_country.util";
import User from "@/services/user.service";
import { ExtFile, FileInputButton } from "@files-ui/react";
import { toast } from "react-toastify";
import withAuth10 from "@/hooks/withAuth10";
export default withAuth10(function Index() {
	const { bio_data } = useSelector((state: RootState) => state.user);
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [country, setCountry] = useState<{ Code: string; Name: string }>({
		Code: "",
		Name: "",
	});
	const [phone, setPhone] = useState("");
	const [currentCountry, setCurrentCountry] = useState<CountryIso2>("ng");
	const [ishidden, setHidden] = useState(true);
	const validation = usePhoneValidation(phone);

	const phoneRegex = /^\+234-(90|70|80|81|090|070|080|081)(\d{8})$/;

	const isPhoneValid = validation.isValid && phoneRegex.test(phone);
	const phoneValidationRef = useRef<HTMLSpanElement>(null);
	const handleCountrySelection = useCallback((value: string) => {
		let country = get_countryUtil(value);
		setCountry(country);
	}, []);

	/* const handlePhoneSubmit = useCallback(() => {
		const phoneRegex = /^(090|070|080|081)(\d{8})$/;
		if (!phone.length) {
			toast.warn("Phone number required!");
			return;
		}
		if (phone.length < 16 || phone.length > 16) {
			toast.warn("Phone number length is invalid!");
			return;
		}
		if (!phoneRegex.test(phone)) {
			toast.warn("Invalid phone number form!");
			return;
		}
	}, [phone]); */

	const handlePhoneSubmit = useCallback(() => {
		if (isPhoneValid) {
			const userServies = new User();
			userServies.updateMe({ phoneNumber: phone }).then(() => {
				setPhone("");
			});
			return;
		}
		phoneValidationRef.current
			? (phoneValidationRef.current.textContent =
					"Phone number is not valid!")
			: undefined;
		setTimeout(() => {
			if (phoneValidationRef.current) {
				phoneValidationRef.current.textContent = "";
			}
		}, 1200);
		return;
	}, [phone, phoneValidationRef.current]);
	// const handlePhoneInputChange = (value: any) => {
	// 	setValue("phoneNumber", value);
	// };

	// const isPhoneValid = validation.isValid;

	type T_cp = { password: string; oldPassword: string };
	const handlePasswordChange = useCallback(
		(data: T_cp) => {
			const userServices = new User();
			console.log(data);
			if (!data.oldPassword.length) {
				toast.warn("Old password required!");
				return;
			}
			if (!data.password.length) {
				toast.warn("New password require!");
				return;
			}
			userServices.resetPassword({
				password: data.password,
				oldPassword: data.oldPassword,
			});
			setValue("password", "");
			setValue("oldPpassword", "");
		},
		[phone],
	);

	const handleBioDataSubmission = useCallback(
		(data: FieldValue<{ firstname: string; lastName: string }>) => {
			const userServices = new User();
			const entries = Object.entries(data as {});
			const formdata = new FormData();
			for (let i in entries as {}) {
				const [key, value] = entries[i as unknown as number];
				if (value && key !== "oldPassword" && key !== "password") {
					// update
					formdata.append(key, value as string);
				}
			}
			function isFormDataEmpty(data: FormData) {
				for (const _ of data.entries()) {
					return false; // If there's at least one entry, it's not empty
				}
				return true; // If no entries are found, it's empty
			}
			if (!isFormDataEmpty(formdata) && country.Name.length > 0) {
				//if country is selected add it to the formdata and make an update
				formdata.append("country", country.Name);
				userServices.updateMe(formdata);
			} else {
				userServices.updateMe(formdata);
				
			}
		},
		[country],
	);
	const handlePhotoChange = useCallback(async (files: ExtFile[]) => {
		const userServies = new User();
		const formdata = new FormData();
		formdata.append("avatar", files[0].file as Blob);
		userServies.updateMe(formdata);
	}, []);
	return (
		<>
			<Main>
				<main className="px-8 py-14 text-xs">
					<div className="relative flex gap-8">
						<Image
							height={50}
							width={50}
							src={bio_data?.avatar ?? images.afruna_logo}
							alt="Image"
							priority
							className=" absolute z-20 -top-28 left-4 w-32 h-32 object-fill rounded-full"
						/>
						<div className="flex justify-end items-end min-w-[19rem]">
							{/* <button className="">
								Upload a Photo
							</button> */}
							<FileInputButton
								disabled={bio_data?.blocked}
								className={`${
									bio_data?.blocked && "cursor-not-allowed"
								} bg-gradient-deepBluebutton py-1 px-5 text-sm text-white rounded`}
								placeholder="Upload a Photo"
								maxFiles={1}
								onChange={handlePhotoChange}
							>
								Upload a Photo
							</FileInputButton>
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
								<form
									onSubmit={handleSubmit(
										handleBioDataSubmission,
									)}
									className="flex flex-col gap-4"
								>
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
												placeholder={bio_data?.firstName.toLocaleUpperCase()}
												className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
												{...register("firstName", {
													maxLength: 100,
												})}
											/>
											{/* 	{errors.firstName && (
												<p className="text-blue mt-1">
													{errors.firstName.type ===
														"required" &&
														"This field is required."}
													{errors.firstName.type ===
														"maxLength" &&
														"Max length is 100 char."}
												</p>
											)} */}
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
												placeholder={bio_data?.lastName.toLocaleUpperCase()}
												className="w-full placeholder:text-[#959191] px-4 py-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none focus:outline-[#9B9B9B] focus:border-none focus:outline-[1px]"
												{...register("lastName", {
													maxLength: 100,
												})}
											/>
											{/* {errors.lastName && (
												<p className="text-blue mt-1">
													{errors.lastName.type ===
														"required" &&
														"This field is required."}
													{errors.lastName.type ===
														"maxLength" &&
														"Max length is 100 char."}
												</p>
											)} */}
										</fieldset>
									</div>
									<div className="grid grid-cols-2 gap-4">
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
									</div>
									<fieldset className="max-w-[49%] gap-2 flex flex-col">
										<label
											className="text-[0.9rem] font-semibold"
											htmlFor="country"
										>
											Country of Residence
										</label>
										<ReactFlagsSelect
											searchable
											showSelectedLabel
											placeholder={
												<span>{bio_data?.country}</span>
											}
											id="country"
											onSelect={handleCountrySelection}
											selected={country.Code}
										/>
										{/* 	{errors.country && (
											<p className="text-blue mt-1">
												{errors.country.type ===
													"required" &&
													"This field is required."}
											</p>
										)} */}
									</fieldset>
									<div className="flex items-center justify-end mt-4 xs:mt-2">
										<button
											title={
												bio_data?.blocked
													? "blocked"
													: undefined
											}
											disabled={bio_data?.blocked}
											className={`${
												bio_data?.blocked &&
												"cursor-not-allowed"
											} text-sm font-medium bg-[#1F74A2] text-white px-4 py-2 flex justify-center items-center gap-2 bg-blue rounded-md outline-none transition duration-500 xs:px-6 xs:py-3`}
										>
											Update Information
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
										<div className="flex flex-col w-full gap-2">
											<fieldset className="w-full gap-2 flex flex-col">
												<label
													className="text-[0.9rem] font-semibold"
													htmlFor="password"
												>
													Old Password
												</label>
												<div className="flex px-4 py-3 border border-afruna-gray/20 rounded-md shadow-sm focus-within:shadow-lg focus-within:border-afruna-blue/40 focus:[&>input]:outline-none">
													<input
														id="oldPassword"
														type={
															ishidden
																? "password"
																: "text"
														}
														placeholder="*****"
														className="w-full placeholder:text-[#959191] "
														{...register(
															"oldPassword",
															{
																maxLength: 100,
															},
														)}
													/>
													<button
														onClick={() =>
															setHidden(
																(hide) => !hide,
															)
														}
														type="button"
													>
														{ishidden ? (
															<FaEye size={20} />
														) : (
															<FaEyeSlash
																size={20}
															/>
														)}
													</button>
												</div>
												{/* 	{errors.password && (
												<p className="text-blue mt-1">
													{errors.password.type ===
														"required" &&
														"This field is required."}
													{errors.password.type ===
														"maxLength" &&
														"Max length is 100 char."}
												</p>
											)} */}
											</fieldset>
											<fieldset className="w-full gap-2 flex flex-col">
												<label
													className="text-[0.9rem] font-semibold"
													htmlFor="password"
												>
													New Password
												</label>
												<div className="flex px-4 py-3 border border-afruna-gray/20 rounded-md shadow-sm focus-within:shadow-lg focus-within:border-afruna-blue/40 focus:[&>input]:outline-none">
													<input
														id="password"
														type={
															ishidden
																? "password"
																: "text"
														}
														placeholder="****"
														className="w-full placeholder:text-[#959191] "
														{...register(
															"password",
															{
																maxLength: 100,
															},
														)}
													/>
													<button
														onClick={() =>
															setHidden(
																(hide) => !hide,
															)
														}
														type="button"
													>
														{ishidden ? (
															<FaEye size={20} />
														) : (
															<FaEyeSlash
																size={20}
															/>
														)}
													</button>
												</div>
												{/* 	{errors.password && (
												<p className="text-blue mt-1">
													{errors.password.type ===
														"required" &&
														"This field is required."}
													{errors.password.type ===
														"maxLength" &&
														"Max length is 100 char."}
												</p>
											)} */}
											</fieldset>
										</div>
										<fieldset className="w-full px-2 gap-2 flex flex-col">
											<label
												className="text-[0.9rem] font-semibold"
												htmlFor="phone"
											>
												{!isPhoneValid && (
													<span
														ref={phoneValidationRef}
														className="text-red-500 block bg-red-100 rounded-sm w-fit p-1"
													></span>
												)}
												Phone Number{" "}
												<sup className="text-red-500 text-xs">
													*
												</sup>
											</label>
											<PhoneInput
												defaultCountry="ng"
												inputStyle={{
													border: "none",
													width: "100%",
												}}
												onChange={(ph, iso) => {
													setPhone(ph);
													setCurrentCountry(iso);
												}}
												countrySelectorStyleProps={{
													buttonStyle: {
														border: "none",
													},
												}}
												value={
													phone.length
														? phone
														: bio_data?.phoneNumber
												}
												charAfterDialCode="-"
												placeholder="phone number"
												className="flex items-center p-1 border border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md"
											/>
										</fieldset>
									</div>
									<div className="flex items-center justify-end mt-4 xs:mt-3">
										<div className="flex gap-4">
											<button
												type="button"
												onClick={handleSubmit(
													handlePasswordChange as () => void,
												)}
												title={
													bio_data?.blocked
														? "blocked"
														: undefined
												}
												disabled={bio_data?.blocked}
												className={`${
													bio_data?.blocked &&
													"cursor-not-allowed"
												} text-sm font-medium border border-afruna-blue  text-afruna-blue px-4 py-2 flex justify-center items-center gap-2 bg-blue rounded-md outline-none transition duration-500 xs:px-6 xs:py-3`}
											>
												Update Password
											</button>
											<button
												type="button"
												onClick={handlePhoneSubmit}
												title={
													bio_data?.blocked
														? "blocked"
														: undefined
												}
												disabled={bio_data?.blocked}
												className={`${
													bio_data?.blocked &&
													"cursor-not-allowed"
												} text-sm font-medium bg-[#1F74A2] text-white px-4 py-2 flex justify-center items-center gap-2 bg-blue rounded-md outline-none transition duration-500 xs:px-6 xs:py-3`}
											>
												Update Phone Number
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
)