/** @format */

// src/components/common/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
	isAllowed: boolean;
	redirectPath?: string;
	children: ReactNode;
}

const ProtectedRoute = ({
	isAllowed,
	redirectPath = "/auth",
	children,
}: ProtectedRouteProps) => {
	const location = useLocation();

	if (!isAllowed) {
		return <Navigate to={redirectPath} state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
