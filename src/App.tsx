/** @format */

// src/App.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/layout/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import AllCourses from "./pages/Courses/AllCourses";
import CourseDetails from "./pages/Courses/CourseDetails";
import { AuthProvider, useAuth } from "./services/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

function AppRoutes() {
	const { user } = useAuth();

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<LandingPage />} />
				<Route path='auth' element={<AuthPage />} />
				<Route
					path='all-courses'
					element={
						<ProtectedRoute isAllowed={!!user}>
							<AllCourses />
						</ProtectedRoute>
					}
				/>
				<Route
					path='all-courses/:id'
					element={
						<ProtectedRoute isAllowed={!!user}>
							<CourseDetails />
						</ProtectedRoute>
					}
				/>
				{/* <Route
					path='payment/:courseId'
					element={
						<ProtectedRoute isAllowed={!!user}>
							<PaymentPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='payment-success'
					element={
						<ProtectedRoute isAllowed={!!user}>
							<PaymentSuccessPage />
						</ProtectedRoute>
					}
				/> */}
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

function App() {
	return (
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	);
}

export default App;
