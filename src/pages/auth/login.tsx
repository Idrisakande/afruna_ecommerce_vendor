import Image from "next/image";
import { joiResolver } from "@hookform/resolvers/joi";
import {
	FieldValue,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import Joi from "joi";
import Head from "next/head";
import { ChangeEventHandler, ReactNode, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { images } from "@/constants/images";
import AuthLayout from "@/layouts/auth.layout";
import Auth10 from "@/services/auth.service";
import { T_login_data } from "@/types/auth.type";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import withAuth from "@/hooks/withAuth";

const schema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } }) // Simplified email validation for example
		.required()
		.messages({
			"string.base": "Email should be a string",
			"string.email": "Invalid email format",
			"any.required": "Email is required",
		}),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
		.required()
		.messages({
			"string.base": "Password should be a string",
			"string.pattern.base":
				"Password should only contain letters and numbers",
			"any.required": "Password is required",
		}),
}).required();

function Login() {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const [remember_me, set_remember_Me] = useState(false);
	const [ishidden, setHidden] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: joiResolver(schema),
	});
	const router = useRouter();
	const onSubmit = (
		data: FieldValue<{
			email: string;
			password: string;
		}>,
	) => {
		if (!isValid) {
			return;
		}
		// router.push("/dashboard");
		const authService = new Auth10(router);
		const user = data as T_login_data;

		authService.handleLogin({ ...user, remember_me });
	};
	const handleRememberMe: ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => set_remember_Me(event.target.checked),
		[],
	);

	// const handleGoogleLogin = useCallback(async () => {
	// 	const authService = new Auth10();
	// 	authService.googlesignin();
	// }, []);

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
				className="w-3/4 lg:w-2/5 flex flex-col content-between items-center mx-auto rounded-2xl shadow-md p-10 bg-white border-[1px] text-xs my-10 gap-2"
			>
				<fieldset className="flex flex-col w-full gap-2">
					<label htmlFor="email">
						{errors.email && (
							<span className="text-red-500 block bg-red-100 rounded-sm w-fit p-1">
								{errors.email?.message as ReactNode}
							</span>
						)}
						Your Email <sup className="text-red-500 text-xs">*</sup>
					</label>
					<input
						{...register("email")}
						type="email"
						name="email"
						id="email"
						className="p-3 border-[1px] border-slate-300 focus-within:border-slate-400 focus-within:shadow-lg rounded-md"
						placeholder="Email"
					/>
				</fieldset>
				<fieldset className="flex flex-col w-full gap-2">
					<label htmlFor="password">
						{errors.password && (
							<span className="text-red-500 block bg-red-100 rounded-sm w-fit p-1">
								{errors.password?.message as ReactNode}
							</span>
						)}
						Password <sup className="text-red-500 text-xs">*</sup>
					</label>
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
							onChange={handleRememberMe}
							checked={remember_me}
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
				<button
					disabled={!isValid}
					className={`${
						!isValid && "cursor-not-allowed"
					} bg-gradient-y-deepblue p-2 text-white w-full rounded-md hover:bg-gradient-whitishblue my-2`}
				>
					Log in
				</button>
				{/* <div className="flex items-center my-3">
						<Hr.Root style={{ margin: "15px 0" }} />
						<span className="p-3">or</span>
						<Hr.Root style={{ margin: "15px 0" }} />
					</div> */}
				{/* 
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
						*/}

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

export default withAuth(Login);
