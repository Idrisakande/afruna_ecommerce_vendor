/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import { joiResolver } from "@hookform/resolvers/joi";

import AuthLayout from "@/interfaces/auth.layout";
import {
	FieldValue,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import Joi from "joi";
import Head from "next/head";
import { ChangeEventHandler, ReactNode, useCallback, useState } from "react";
import Image from "next/image";
import { images } from "@/constants/images";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import ReactFlagsSelect from "react-flags-select";
import "react-international-phone/style.css";

const schema = Joi.object({
	firstName: Joi.string().required(),
	age: Joi.number().positive().integer().required(),
}).required();

export default function Register() {
	const [agreed, setAgreed] = useState(false);
	// const [email, setEmail] = useState("");
	// const [firstname, setFirstname] = useState("");
	// const [lastname, setLastname] = useState("");
	// const [hashword, setHash] = useState("");
	// const [consfirm_hashword, setConfirmHash] = useState("");
	const [locale, setLocale] = useState("");
	const [phone, setPhone] = useState("");
	const [ishidden, setHidden] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(schema),
	});
	const router = useRouter();
	const onSubmit = (data: FieldValue<{}>) => console.log(data);
	const handleAgreed: ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => setAgreed(event.target.checked),
		[]
	);
	const handleLoccale = useCallback((value: string) => setLocale(value), []);
	const handlePhone = useCallback((value: string) => setPhone(value), []);
	return (
		<AuthLayout>
			<Head>
				<title>Afruna :: Seller&apos;s Registeration</title>
				<meta http-equiv="X-UA-Compatible" content="IE=7" />
				<link
					rel="shortcut icon"
					href="../../assets/imgs/logo.svg"
					type="image/x-icon"
				/>
			</Head>

			<h1 className="relative top-16 bg-white rounded-lg w-fit mx-auto p-10 text-slate-700 text-2xl font-bold">
				Seller&apos;s Registeration
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
				className="w-3/4 mx-auto rounded-2xl shadow-md p-10 bg-white border-[1px] text-xs my-10"
			>
				<section className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<aside className="col-span-full md:col-span-1">
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="firstname">
								First Name
								<span className="text-red-500">
									{errors.firstname?.message as ReactNode}
								</span>
							</label>
							<input
								{...register("firstname")}
								type="firstname"
								name="firstname"
								id="firstname"
								className="p-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md"
								placeholder="firstname address"
							/>
						</fieldset>
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="lastname">
								Last Name
								<span className="text-red-500">
									{errors.lastname?.message as ReactNode}
								</span>
							</label>
							<input
								{...register("lastname")}
								type="lastname"
								name="lastname"
								id="lastname"
								className="p-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md"
								placeholder="lastname address"
							/>
						</fieldset>
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="email">
								Your Email
								<span className="text-red-500">
									{errors.email?.message as ReactNode}
								</span>
							</label>
							<input
								{...register("email")}
								type="email"
								name="email"
								id="email"
								className="p-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md"
								placeholder="email address"
							/>
						</fieldset>
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="phone">
								Phone Number
								<span className="text-red-500">
									{errors.phone?.message as ReactNode}
								</span>
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
						</fieldset>
					</aside>
					<aside className="col-span-full md:col-span-1">
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="phone">
								Country
								<span className="text-red-500">
									{errors.phone?.message as ReactNode}
								</span>
							</label>
							<ReactFlagsSelect
								onSelect={handleLoccale}
								selected={locale}
							/>
						</fieldset>
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="password">Password </label>
							<span className="text-red-500">
								{errors.password?.message as ReactNode}
							</span>
							<div className="flex justify-between items-center px-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md">
								<input
									{...register("password")}
									type={ishidden ? "password" : "text"}
									name="password"
									id="password"
									className="w-full bg-transparent py-3"
									placeholder="*******"
								/>
								<span
									onClick={() => setHidden((prev) => !prev)}
								>
									{ishidden ? (
										<FaEye size={20} />
									) : (
										<FaEyeSlash size={20} />
									)}
								</span>
							</div>
						</fieldset>
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="confirm_password">
								Confirm Password
							</label>
							<span className="text-red-500">
								{errors.confirm_hashword?.message as ReactNode}
							</span>
							<div className="flex justify-between items-center px-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md">
								<input
									{...register("confirm_hashword")}
									type={ishidden ? "password" : "text"}
									name="confirm_hashword"
									id="confirm_hashword"
									className="w-full bg-transparent py-3"
									placeholder="*******"
								/>
								<span
									onClick={() => setHidden((prev) => !prev)}
								>
									{ishidden ? (
										<FaEye size={20} />
									) : (
										<FaEyeSlash size={20} />
									)}
								</span>
							</div>
						</fieldset>
					</aside>
				</section>
				<section className="w-full text-xs md:text-sm md:w-1/2 mx-auto mt-10">
					<fieldset className="flex justify-center items-center w-full mb-2">
						<input
							onChange={handleAgreed}
							className="w-5 h-5 focus-within:border-slate-400"
							type="checkbox"
							id="agreed"
						/>
						<label className="ml-2" htmlFor="agreed">
							I agree to the
						</label>
						<span className="underline hover:cursor-pointer capitalize mx-1">
							Terms
						</span>
						<span>&</span>
						<span className="underline hover:cursor-pointer capitalize mx-1">
							Conditions
						</span>
					</fieldset>
					<button
						disabled={!agreed}
						className={`${
							!agreed && "cursor-not-allowed"
						} bg-gradient-y-deepblue hover:bg-gradient-whitishblue my-2  p-2 text-white w-full rounded-md`}
					>
						Register
					</button>
					<div className="flex justify-center items-center my-3">
						{/* <Hr.Root style={{ margin: "15px 0" }} />
							<span className="p-3">or</span>
							<Hr.Root style={{ margin: "15px 0" }} /> */}
					</div>
					<div className="flex space-x-1 justify-center items-center my-3 text-center">
						<p>Already have an account?</p>
						<button
							onClick={() => router.push("login")}
							type="button"
							className="font-semibold "
						>
							Login
						</button>
					</div>
					<button
						type="button"
						className="p-2 text-slate-700 justify-center items-center w-full rounded-md my-2 flex border-[1px] border-slate-300"
					>
						<Image
							src={images.google_icon}
							width={30}
							alt="google_icon"
						/>
						<span className="ml-2">Log in with Google</span>
					</button>
				</section>
			</form>
		</AuthLayout>
	);
}
