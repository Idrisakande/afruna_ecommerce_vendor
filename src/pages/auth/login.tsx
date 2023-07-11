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

const schema = Joi.object({
	eamil: Joi.string().email({ tlds: { allow: ["com", "org", "io", "net"] } }),
	password: Joi.string(),
}).required();

export default function Login() {
	const [agreed, setAgreed] = useState(false);
	// const [email, setEmail] = useState("");
	// const [firstname, setFirstname] = useState("");
	// const [lastname, setLastname] = useState("");
	// const [hashword, setHash] = useState("");
	// const [consfirm_hashword, setConfirmHash] = useState("");
	// const [phone, setPhone] = useState("");
	const [ishidden, setHidden] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
	} = useForm({
		resolver: joiResolver(schema),
	});
	const router = useRouter();
	const onSubmit = (
		data: FieldValue<{
			email: string;
			phone: string;
			firstname: string;
			lastname: string;
			password: string;
		}>
	) => {
		if (!isValid) {
			return;
		}
		router.push("/dashboard");
	};
	const handleAgreed: ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => setAgreed(event.target.checked),
		[]
	);
	return (
		<AuthLayout>
			<Head>
				<title>Afruna :: Seller&apos;s Login</title>
				<meta http-equiv="X-UA-Compatible" content="IE=7" />
				<link
					rel="shortcut icon"
					href="../../assets/imgs/logo.svg"
					type="image/x-icon"
				/>
			</Head>

			<h1 className="relative top-16 bg-white rounded-lg w-fit mx-auto p-10 text-slate-700 text-2xl font-bold">
				Seller&apos;s Login
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
				className="w-3/4 lg:w-2/5 flex flex-col content-between items-center mx-auto rounded-2xl shadow-md p-10 bg-white border-[1px] text-xs my-10"
			>
				<fieldset className="flex flex-col w-full my-2">
					<label htmlFor="email">
						Your email
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
					<label htmlFor="password">Password</label>
					<div className="flex justify-between items-center px-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md">
						<input
							{...register("password", {
								required: true,
							})}
							type={ishidden ? "password" : "text"}
							name="password"
							id="password"
							className="w-full bg-transparent py-3"
							placeholder="*******"
						/>
						<span onClick={() => setHidden((prev) => !prev)}>
							{ishidden ? (
								<FaEye size={20} />
							) : (
								<FaEyeSlash size={20} />
							)}
						</span>
					</div>
				</fieldset>
				<fieldset className="flex justify-between items-center w-full">
					<div className="flex justify-between items-center">
						<input
							className="w-5 h-5 focus-within:border-slate-400"
							type="checkbox"
							id="remember"
						/>
						<label className="ml-2" htmlFor="remember">
							Remember me
						</label>
					</div>
					<button
						type="button"
						className="text-afruna-gold font-semibold"
					>
						forgot password
					</button>
				</fieldset>
				<button className="bg-gradient-y-deepblue p-2 text-white w-full rounded-md hover:bg-gradient-whitishblue my-2">
					Log in
				</button>
				{/* <div className="flex items-center my-3">
						<Hr.Root style={{ margin: "15px 0" }} />
						<span className="p-3">or</span>
						<Hr.Root style={{ margin: "15px 0" }} />
					</div> */}
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
				<div className="my-3 text-center">
					<p>Don&apos;t have an account already?</p>
					<button
						onClick={() => router.push("register")}
						type="button"
						className="font-semibold mt-4"
					>
						Register
					</button>
				</div>
			</form>
		</AuthLayout>
	);
}
