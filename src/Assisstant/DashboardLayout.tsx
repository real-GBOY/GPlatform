/** @format */

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Bell, Search, User, BookOpen, DollarSign } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import Sidebar from "../components/layout/SideBar";
import AssistantDashboard from "./AssisstantDashboard";

// Define prop types for the DashboardLayout component
interface DashboardLayoutProps {
	children?: ReactNode;
	userName?: string;
	userRole?: string;
}

const DashboardLayout = ({
	children,
	userName = "محمود نايل",
	userRole = "معلم",
}: DashboardLayoutProps) => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const location = useLocation();

	const navTabs = [
		{
			name: "الطلاب",
			path: "/assistant/students",
			icon: <User size={18} className='ml-1' />,
		},
		{
			name: "الكورسات",
			path: "/assistant/courses",
			icon: <BookOpen size={18} className='ml-1' />,
		},
		{
			name: "المدفوعات",
			path: "/assistant/payments",
			icon: <DollarSign size={18} className='ml-1' />,
		},
	];

	return (
		<div className='flex h-screen bg-gray-50' dir='rtl'>
			{/* Sidebar */}
			<Sidebar userName={userName} userRole={userRole} />

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
									placeholder='البحث عن الدروس، المعلمين...'
									className='mr-2 flex-1 bg-transparent outline-none text-gray-600'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex items-center space-x-4'>
							<Link to='/assistant/notifications'>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className='p-2 rounded-full bg-gray-50 relative'>
									<Bell size={20} className='text-gray-600' />
									<span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500'></span>
								</motion.button>
							</Link>

							<Link to='/assistant/profile'>
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
								مرحباً، {userName.split(" ")[0]}. هنا ملخص نشاطات اليوم.
							</p>
						</div>

						{children || <AssistantDashboard />}
					</div>
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
