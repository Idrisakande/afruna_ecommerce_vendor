import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ComponentType, FC, useEffect } from "react";
import {
	TOriginalComponentProps,
	TResultComponentProps,
} from "@/types/auth.type";
import { RootState } from "@/types/store.type";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { verifyToken } from "@/utils/decode_jwt";
// import {isAuthenticated} from "@/lib/is_authenticated";

const withAuth = <P extends TOriginalComponentProps>(
	WrappedComponent: ComponentType<P>,
): ComponentType<TResultComponentProps> => {
	const AuthComponent: FC<TResultComponentProps> = (props) => {
		const { isAuthenticated } = useSelector(
			(state: RootState) => state.auth,
		);
		const router = useRouter();
		const { pathname } = router;

		useEffect(() => {
			const token = Cookies.get("token");

			if (isProtectedRoute(pathname)) {
				if (!token) {
					toast.warn("Unauthorized Attempted!");
					// Redirect to login page if token doesn't exist
					router.push("/auth/login");
				} else {
					// Verify token validity
					const tokenValid = verifyToken(token);
					if (!tokenValid) {
						toast.warn("Session expired!");
						// Redirect to login page if token is invalid
						router.push("/auth/login");
					}
					if (!isAuthenticated) {
						toast.warn("Login required!");
						router.push("/auth/login");
					}
				}
			}
		}, []);

		// Render the wrapped component if the user is logged in
		return <WrappedComponent {...(props as P)} />;
	};

	return AuthComponent;
};

export default withAuth;

const protectedRoutes = [
	"/chat",
	"/dashboard",
	"/orders",
	"/products",
	"/report",
	"/settings",
	"/transactions",
];

const isProtectedRoute = (pathname: string) => {
	return protectedRoutes.includes(pathname);
};
const UN_PROTECTED_PATH = ["/"];
const isPublicRoute = (pathname: string) => {
	return UN_PROTECTED_PATH.includes(pathname);
};
