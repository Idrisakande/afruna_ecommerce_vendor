import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ComponentType, FC } from "react";
import {
	TOriginalComponentProps,
	TResultComponentProps,
} from "@/types/auth.type";
import { isAuthenticated } from "@/utils/is_authenticated";

const UN_PROTECTED_PATH = ["/", "/auth/login", "/auth/register"];

const withAuth10 = <P extends TOriginalComponentProps>(
	WrappedComponent: ComponentType<P>,
): ComponentType<TResultComponentProps> => {
	const AuthComponent: FC<TResultComponentProps> = (props) => {
		// const { isAuthenticated } = useSelector((state: RootState) => state.auth);
		const router = useRouter();
		const { pathname} = router;

		/**
		 * @Description: Redirect to login page when not logged in and
		 *              path is among protected routes.
		 *  @Type: Path redirect.
		 * */
		if (!isAuthenticated() && isProtectedRoute(pathname)) {
			router.replace("/auth/login");
			return;
		}

		// Render the wrapped component if the user is logged in
		return <WrappedComponent {...(props as P)} />;
	};

	return AuthComponent;
};

export default withAuth10;
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

const isPublicRoute = (pathname: string) => {
	return UN_PROTECTED_PATH.includes(pathname);
};