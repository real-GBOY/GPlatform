/** @format */

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Bell, Search, BookOpen, Calendar, GraduationCap } from "lucide-react";

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
	userName = "Alex Johnson",
	userRole = "10th Grade Student",
}: StudentDashboardLayoutProps) => {
	const [searchQuery, setSearchQuery] = useState<string>("");

	return (
		<div className='flex h-screen bg-gray-50'>
			{/* Student Sidebar */}
			<div className='w-64 bg-white border-r border-gray-200 shadow-sm'>
				<div className='p-4 border-b border-gray-200'>
					<div className='flex items-center'>
						<div className='h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold'>
							{userName.charAt(0)}
						</div>
						<div className='ml-3'>
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
									placeholder='Search courses, assignments, resources...'
									className='ml-2 flex-1 bg-transparent outline-none text-gray-600'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex items-center space-x-4'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='p-2 rounded-full bg-gray-50 relative'>
								<Bell size={20} className='text-gray-600' />
								<span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500'></span>
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='p-2 rounded-full bg-gray-50'>
								<GraduationCap size={20} className='text-gray-600' />
							</motion.button>

							<div className='flex items-center'>
								<div className='h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-medium'>
									{userName.charAt(0)}
								</div>
								<span className='ml-2 text-sm font-medium text-gray-700 hidden md:block'>
									{userName.split(" ")[0]}
								</span>
							</div>
						</div>
					</div>

					{/* Navigation Tabs */}
					<div className='px-6 py-2 flex space-x-6 border-b border-gray-100'>
						<button className='text-teal-600 font-medium flex items-center pb-2 border-b-2 border-teal-600'>
							<BookOpen size={18} className='mr-1' />
							<span>Courses</span>
						</button>
						<button className='text-gray-500 hover:text-gray-700 flex items-center pb-2'>
							<Calendar size={18} className='mr-1' />
							<span>Schedule</span>
						</button>
						<button className='text-gray-500 hover:text-gray-700 flex items-center pb-2'>
							<span>Grades</span>
						</button>
						<button className='text-gray-500 hover:text-gray-700 flex items-center pb-2'>
							<span>Resources</span>
						</button>
					</div>
				</header>

				{/* Main Content Area */}
				<main className='flex-1 overflow-y-auto p-6'>
					<div className='max-w-7xl mx-auto'>
						<div className='mb-8'>
							<h1 className='text-2xl font-bold text-gray-800'>
								Student Dashboard
							</h1>
							<p className='text-gray-600'>
								Welcome, {userName.split(" ")[0]}. Here's your learning progress
								and upcoming tasks.
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
