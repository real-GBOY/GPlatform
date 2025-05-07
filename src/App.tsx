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
import AssistantDashboard from "./Assisstant/AssisstantDashboard";
import DashboardLayout from "./Assisstant/DashboardLayout";
import StudentTables from "./Assisstant/StudentsTable";

// Import teacher-specific dashboard pages
// import LessonsPage from "./Assisstant/pages/LessonsPage";
// import TeachersPage from "./Assisstant/pages/TeachersPage";
// import AnalyticsPage from "./Assisstant/pages/AnalyticsPage";
// import SettingsPage from "./Assisstant/pages/SettingsPage";

function AppRoutes() {
	return (
		<Routes>
			{/* Main public/auth routes with standard layout */}
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
				<Route path='*' element={<NotFoundPage />} />
			</Route>

			{/* Dashboard routes - these use the DashboardLayout instead of the standard Layout */}
			<Route
				path='/dashboard'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<AssistantDashboard />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/students'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<StudentTables />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>

			{/* Additional dashboard pages */}
			{/* <Route
				path='/lessons'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<LessonsPage />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/> */}

			{/* <Route
				path='/teachers'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<TeachersPage />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/> */}

			{/* <Route
				path='/analytics'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<AnalyticsPage />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/> */}

			{/* <Route
				path='/settings'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<SettingsPage />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/> */}

			{/* Future routes can be added here */}
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
