/** @format */

// src/services/AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Make sure to install this package: npm install jwt-decode

interface AuthContextType {
	user: { token: string; role: string } | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	error: string;
	loading: boolean;
}

interface JwtPayload {
	role: string;
	[key: string]: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<{ token: string; role: string } | null>(
		() => {
			const token = localStorage.getItem("authToken");
			if (token) {
				try {
					const decoded = jwtDecode<JwtPayload>(token);
					const role = decoded.role;
					return { token, role };
				} catch (error) {
					console.error("Error decoding token:", error);
					localStorage.removeItem("authToken");
					return null;
				}
			}
			return null;
		}
	);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const login = async (email: string, password: string) => {
		setLoading(true);
		setError("");
		try {
			console.log("Attempting login with:", { email });
			const response = await axios.post(
				"http://localhost:5208/api/Account/login",
				{ email, password }
			);

			console.log("Raw API response:", response.data);

			// The response structure appears to be { data: { ... }, message: 'Login successful' }
			// Check if we have data and extract the token properly
			const responseData = response.data.data || response.data;

			// Check if token exists in the correct location
			if (!responseData || !responseData.token) {
				console.error(
					"Token not found in response. Response structure:",
					response.data
				);
				throw new Error("No token received from server");
			}

			const newToken = responseData.token;

			let role;
			// Try to get role from token first
			try {
				const decoded = jwtDecode<JwtPayload>(newToken);
				role = decoded.role;
				console.log("Successfully decoded token, found role:", role);
			} catch (decodeError) {
				console.warn(
					"Could not decode token, using role from response:",
					decodeError
				);
				// Fallback to role from response data
				role = responseData.role || "Student"; // Default to Student if no role provided
			}

			localStorage.setItem("authToken", newToken);

			setUser({ token: newToken, role });
			console.log("Login successful:", { token: "REDACTED", role });
			navigate("/");
		} catch (err: any) {
			console.error("Login error:", err);
			// More specific error messages
			if (err.response) {
				console.error("Error response:", err.response.data);
				setError(
					`Login failed: ${
						err.response.data.message ||
						err.response.statusText ||
						"Server error"
					}`
				);
			} else if (err.request) {
				setError(
					"Network error: Server not responding. Please try again later."
				);
			} else {
				setError(`Error: ${err.message || "Unknown error occurred"}`);
			}
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setUser(null);
		navigate("/auth");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, error, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
