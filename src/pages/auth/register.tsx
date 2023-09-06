import Head from "next/head";
import Image from "next/image";
import {
	FieldValue,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import {
	ChangeEventHandler,
	ReactNode,
	useCallback,
	useRef,
	useState,
} from "react";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
	CountryIso2,
	PhoneInput,
	usePhoneValidation,
} from "react-international-phone";
import ReactFlagsSelect from "react-flags-select";
import "react-international-phone/style.css";

import { images } from "@/constants/images";
import AuthLayout from "@/layouts/auth.layout";
import getCountryUtil from "@/utils/get_country.util";
import Auth10 from "@/services/auth.service";
import { T_register_data } from "@/types/auth.type";

const schema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.label("Email") // Simplified email validation for example
		.required()
		.messages({
			"string.base": "Email is required!",
			"string.email": "Invalid email format",
			"any.only": "Email is required!",
		}),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
		.min(8)
		.max(30)
		.label("Password")
		.required()
		.messages({
			"string.pattern.base":
				"{{#label}} should only contain letters and numbers",
		}),
	firstName: Joi.string().trim().label("First Name").required().messages({
		"any.only": "{{#label}} is required!",
	}),
	lastName: Joi.string().trim().label("Last Name").required().messages({
		"any.only": "{{#label}} is required!",
	}),
	confirmPassword: Joi.string()
		.valid(Joi.ref("password"))
		.required()
		.label("Confirm Password")
		.messages({
			"any.only": "{{#label}} does not match the password",
		}),
}).required();

export default function Register() {
	const [agreed, setAgreed] = useState(false);
	const [ishidden, setHidden] = useState(true);
	const [phone, setPhone] = useState("");
	const [currentCountry, setCurrentCountry] = useState<CountryIso2>("ng");
	const [country, setCountry] = useState<{ Code: string; Name: string }>({
		Code: "",
		Name: "",
	}); //returns as {Name: "Nigeria", Code: "NG"}
	const validation = usePhoneValidation(phone);
	const isPhoneValid = validation.isValid;
	const localeRef = useRef<HTMLSpanElement>(null);
	const phoneValidationRef = useRef<HTMLSpanElement>(null);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: joiResolver(schema),
	});
	const onSubmit = useCallback(
		(
			data: FieldValue<{
				email: string;
				phoneNumber: string;
				firstName: string;
				lastName: string;
				password: string;
			}>,
		) => {
			if (!isPhoneValid) {
				phoneValidationRef.current
					? (phoneValidationRef.current.textContent =
							"Phone Number is not provided!")
					: "";
			}
			if (country.Name === "") {
				localeRef.current
					? (localeRef.current.textContent = "Country is required!")
					: "";
			}
			if (!isValid || !isPhoneValid || country.Name === "") {
				return;
			}
			const user_data = {
				...(data as unknown as T_register_data),
				country: country.Name,
				phoneNumber: phone,
			};
			const authService = new Auth10(router);
			authService.handleSignup(user_data);
		},
		[
			isValid,
			isPhoneValid,
			phoneValidationRef.current,
			phone,
			country.Name,
		],
	);
	const handleAgreed: ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => setAgreed(event.target.checked),
		[],
	);

	const handleCountrySelection = useCallback((value: string) => {
		let country = getCountryUtil(value);
		setCountry(country);
	}, []);
	const handleGoogleLogin = useCallback(async () => {
		const authService = new Auth10();
		authService.googlesignin();
	}, []);
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
				className="w-3/4 lg:w-2/4 flex flex-col content-between items-center mx-auto rounded-2xl shadow-md p-10 bg-white border-[1px] text-xs my-10 gap-2"
			>
				<section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
					<aside className="col-span-full md:col-span-1">
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="firstName">
								{errors.firstName && (
									<span className="text-red-500 block bg-red-100 rounded-sm w-fit p-1">
										{errors.firstName?.message as ReactNode}
									</span>
								)}
								First Name{" "}
								<sup className="text-red-500 text-xs">*</sup>
							</label>
							<input
								{...register("firstName")}
								type="text"
								name="firstName"
								id="firstName"
								className="p-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md"
								placeholder="firstname address"
							/>
						</fieldset>
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="lastName">
								{errors.lastName && (
									<span className="text-red-500 block bg-red-100 rounded-sm w-fit p-1">
										{errors.lastName?.message as ReactNode}
									</span>
								)}
								Last Name{" "}
								<sup className="text-red-500 text-xs">*</sup>
							</label>
							<input
								{...register("lastName")}
								type="text"
								name="lastName"
								id="lastName"
								className="p-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md"
								placeholder="lastname address"
							/>
						</fieldset>
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="email">
								{errors.email && (
									<span className="text-red-500 block bg-red-100 rounded-sm w-fit p-1">
										{errors.email?.message as ReactNode}
									</span>
								)}
								Email{" "}
								<sup className="text-red-500 text-xs">*</sup>
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
								{!isPhoneValid && (
									<span
										ref={phoneValidationRef}
										className="text-red-500 block bg-red-100 rounded-sm w-fit p-1"
									></span>
								)}
								Phone Number{" "}
								<sup className="text-red-500 text-xs">*</sup>
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
								placeholder="phone number"
								className="flex items-center p-2 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md"
							/>
						</fieldset>
					</aside>
					<aside className="col-span-full md:col-span-1">
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="phone">
								{country.Name === "" && (
									<span
										ref={localeRef}
										className="text-red-500 block bg-red-100 rounded-sm w-fit p-1"
									></span>
								)}
								Country{" "}
								<sup className="text-red-500 text-xs">*</sup>
							</label>
							<ReactFlagsSelect
								id="country"
								searchable
								onSelect={handleCountrySelection}
								selected={country.Code}
							/>
						</fieldset>
						<fieldset className="flex flex-col w-full my-2">
							<label htmlFor="password">
								{errors.password && (
									<span className="text-red-500 block bg-red-100 rounded-sm w-fit p-1">
										{errors.password?.message as ReactNode}
									</span>
								)}
								Password
								<sup className="text-red-500 text-xs">*</sup>
							</label>
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
							<label htmlFor="confirmPassword">
								{errors.confirmPassword && (
									<span className="text-red-500 block bg-red-100 rounded-sm w-fit p-1">
										{
											errors.confirmPassword
												?.message as ReactNode
										}
									</span>
								)}
								Confirm Password
								<sup className="text-red-500 text-xs">*</sup>
							</label>
							<div className="flex justify-between items-center px-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md">
								<input
									{...register("confirmPassword")}
									type={ishidden ? "password" : "text"}
									name="confirmPassword"
									id="confirmPassword"
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
						onClick={handleGoogleLogin}
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
