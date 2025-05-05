/** @format */

// src/App.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/layout/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import AllCourses from "./pages/Courses/AllCourses";
import CourseDetails from "./pages/Courses/CourseDetails";
import { AuthProvider } from "./services/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<LandingPage />} />
				<Route path='auth' element={<AuthPage />} />
				<Route
					path='all-courses'
					element={
						<ProtectedRoute allowedRoles={["Student", "Teacher"]}>
							<AllCourses />
						</ProtectedRoute>
					}
				/>
				<Route
					path='all-courses/:id'
					element={
						<ProtectedRoute allowedRoles={["Student", "Teacher"]}>
							<CourseDetails />
						</ProtectedRoute>
					}
				/>
				{/* Future routes:
                <Route
                    path='payment/:courseId'
                    element={
                        <ProtectedRoute allowedRoles={["Student"]}>
                            <PaymentPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='payment-success'
                    element={
                        <ProtectedRoute allowedRoles={["Student"]}>
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
