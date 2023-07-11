import { AuthHeader } from "@/components/headers/AuthHeader";
import { IAUTHLayout } from "@/interfaces/auth.interface";
import { FC } from "react";

const AuthLayout: FC<IAUTHLayout> = ({ children }) => {
	return (
		<>
			<AuthHeader />
			<main
				className={
					"relative wallpaper h-screen overflow-y-auto bg-cover text-afruna-blue pb-20"
				}
			>
				{children}
			</main>
		</>
	);
};

export default AuthLayout;
