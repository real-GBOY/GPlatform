/** @format */

// src/components/common/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

interface ProtectedRouteProps {
	allowedRoles: string[];
	redirectPath?: string;
	children: ReactNode;
}

const ProtectedRoute = ({
	allowedRoles,
	redirectPath = "/auth",
	children,
}: ProtectedRouteProps) => {
	const { user } = useAuth();
	const location = useLocation();

	if (!user || !user.role) {
		return <Navigate to={redirectPath} state={{ from: location }} replace />;
	}

	// Check access based on role
	// Special handling for Assistant role - it has the same access as Teacher
	const effectiveRole = user.role === "Assistant" ? "Teacher" : user.role;

	// Check if the effective role is allowed
	if (!allowedRoles.includes(effectiveRole)) {
		return <Navigate to={redirectPath} state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
