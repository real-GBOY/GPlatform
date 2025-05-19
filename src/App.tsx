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
import AssisstantCourses from "./Assisstant/AssisstantCourses";
import AssistantPaymentTables from "./Assisstant/AssisstantPaymentTables";
import StudentDashboard from "./Students/StudentDashboard";
import StudentDashboardLayout from "./Students/StudentDashboardLayout";
import Courses from "./Students/pages/Courses";
import LiveSessions from "./Students/pages/LiveSessions";
import Schedule from "./Students/pages/Schedule";
import LearningPath from "./Students/pages/LearningPath";
import Certificates from "./Students/pages/Certificates";
import Messages from "./Students/pages/Messages";
import Notifications from "./Students/pages/Notifications";
import Settings from "./Students/pages/Settings";
import HelpCenter from "./Students/pages/HelpCenter";
import StudentDetails from "./Assisstant/StudentDetails";
import CourseReview from "./Assisstant/CourseReview";
import ExamManagement from "./Assisstant/ExamManagement";
import Exams from "./Students/pages/Exams";
import Pricing from "./pages/Pricing";
import SubscriptionManagement from "./components/subscription/SubscriptionManagement";

function AppRoutes() {
	return (
		<Routes>
			{/* Main public/auth routes with standard layout */}
			<Route path='/' element={<Layout />}>
				<Route index element={<LandingPage />} />
				<Route path='auth' element={<AuthPage />} />
				<Route path='pricing' element={<Pricing />} />
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

			{/* Student Dashboard Routes */}
			<Route
				path='/dashboard'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<StudentDashboard />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/courses'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<Courses />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/courses/:courseId/exams'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<Exams />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/live-sessions'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<LiveSessions />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/schedule'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<Schedule />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/learning-path'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<LearningPath />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/certificates'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<Certificates />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/messages'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<Messages />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/notifications'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<Notifications />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/settings'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<Settings />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/help'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<HelpCenter />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/dashboard/subscription'
				element={
					<ProtectedRoute allowedRoles={["Student"]}>
						<StudentDashboardLayout>
							<SubscriptionManagement />
						</StudentDashboardLayout>
					</ProtectedRoute>
				}
			/>

			{/* Assistant Dashboard Routes */}
			<Route
				path='/assistant'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<AssistantDashboard />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/assistant/students'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<StudentTables />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/assistant/students/:id'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<StudentDetails />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/assistant/students/:id/edit'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<StudentDetails />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/assistant/courses'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<AssisstantCourses />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/assistant/courses/:id'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<CourseReview />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/assistant/courses/:id/exams'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<ExamManagement />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/assistant/courses/:id/exams/new'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<ExamManagement />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/assistant/payments'
				element={
					<ProtectedRoute allowedRoles={["Teacher"]}>
						<DashboardLayout>
							<AssistantPaymentTables />
						</DashboardLayout>
					</ProtectedRoute>
				}
			/>
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
