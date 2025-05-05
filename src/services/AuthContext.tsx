/** @format */

// src/services/AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
	user: { token: string } | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	error: string;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<{ token: string } | null>(() => {
		const token = localStorage.getItem("authToken");
		return token ? { token } : null;
	});
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const login = async (email: string, password: string) => {
		setLoading(true);
		setError("");
		try {
			const response = await axios.post<{ token: string }>(
				"http://localhost:5208/api/Account/login",
				{ email, password }
			);
			const newToken = response.data.token;
			localStorage.setItem("authToken", newToken);
			setUser({ token: newToken });
			navigate("/");
		} catch (err) {
			console.error("Login error:", err);
			setError("Invalid username or password.");
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
