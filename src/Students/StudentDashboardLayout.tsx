/** @format */

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Bell, Search, BookOpen, Calendar, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import StudentSidebar from "../components/layout/StudentSidebar";
import StudentDashboard from "./StudentDashboard";

// Define prop types for the StudentDashboardLayout component
interface StudentDashboardLayoutProps {
	children?: ReactNode;
	userName?: string;
	userRole?: string;
}

const StudentDashboardLayout = ({
	children,
	userName = "أحمد محمد",
	userRole = "طالب الصف العاشر",
}: StudentDashboardLayoutProps) => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const location = useLocation();

	const navTabs = [
		{
			name: "الدورات",
			path: "/dashboard/courses",
			icon: <BookOpen size={18} className='ml-1' />,
		},
		{
			name: "الجدول",
			path: "/dashboard/schedule",
			icon: <Calendar size={18} className='ml-1' />,
		},
		{
			name: "الجلسات المباشرة",
			path: "/dashboard/live-sessions",
			icon: <GraduationCap size={18} className='ml-1' />,
		},
	];

	return (
		<div className='flex h-screen bg-gray-50' dir='rtl'>
			{/* Student Sidebar */}
			<div className='w-64 bg-white border-l border-gray-200 shadow-sm'>
				<div className='p-4 border-b border-gray-200'>
					<div className='flex items-center'>
						<div className='h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold'>
							{userName.charAt(0)}
						</div>
						<div className='mr-3'>
							<h3 className='text-sm font-medium text-gray-800'>{userName}</h3>
							<p className='text-xs text-gray-500'>{userRole}</p>
						</div>
					</div>
				</div>
				<StudentSidebar />
			</div>

			{/* Main Content */}
			<div className='flex-1 flex flex-col overflow-hidden'>
				{/* Top Navigation */}
				<header className='bg-white border-b border-gray-200'>
					<div className='px-6 py-4 flex items-center justify-between'>
						<div className='flex-1 flex items-center'>
							<div className='max-w-md w-full bg-gray-50 rounded-md flex items-center px-3 py-2'>
								<Search size={20} className='text-gray-400' />
								<input
									type='text'
									placeholder='البحث عن الدورات، المهام، الموارد...'
									className='mr-2 flex-1 bg-transparent outline-none text-gray-600'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex items-center space-x-4'>
							<Link to='/dashboard/notifications'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='p-2 rounded-full bg-gray-50 relative'>
									<Bell size={20} className='text-gray-600' />
									<span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500'></span>
								</motion.button>
							</Link>

							<Link to='/dashboard/live-sessions'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='p-2 rounded-full bg-gray-50'>
									<GraduationCap size={20} className='text-gray-600' />
								</motion.button>
							</Link>

							<Link to='/dashboard/settings'>
								<div className='flex items-center'>
									<div className='h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-medium'>
										{userName.charAt(0)}
									</div>
									<span className='mr-2 text-sm font-medium text-gray-700 hidden md:block'>
										{userName.split(" ")[0]}
									</span>
								</div>
							</Link>
						</div>
					</div>

					{/* Navigation Tabs */}
					<div className='px-6 flex space-x-8 border-b border-gray-200'>
						{navTabs.map((tab) => (
							<Link
								key={tab.path}
								to={tab.path}
								className={`flex items-center pb-2 font-medium ${
									location.pathname === tab.path
										? "text-teal-600 border-b-2 border-teal-600"
										: "text-gray-500 hover:text-gray-700"
								}`}>
								{tab.icon}
								<span>{tab.name}</span>
							</Link>
						))}
					</div>
				</header>

				{/* Main Content Area */}
				<main className='flex-1 overflow-y-auto p-6'>
					<div className='max-w-7xl mx-auto'>
						<div className='mb-8'>
							<h1 className='text-2xl font-bold text-gray-800'>لوحة التحكم</h1>
							<p className='text-gray-600'>
								مرحباً، {userName.split(" ")[0]}. هنا تقدمك التعليمي والمهام
								القادمة.
							</p>
						</div>

						{children || <StudentDashboard />}
					</div>
				</main>
			</div>
		</div>
	);
};

export default StudentDashboardLayout;
