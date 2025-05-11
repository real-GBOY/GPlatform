/** @format */

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Bell, Search, User } from "lucide-react";

import Sidebar from "../components/layout/SideBar";
import AssistantDashboard from "./AssisstantDashboard";
import AssisstantCourses from "./AssisstantCourses";


// Define prop types for the DashboardLayout component
interface DashboardLayoutProps {
	children?: ReactNode;
	userName?: string;
	userRole?: string;
}

const DashboardLayout = ({
	children,
	userName = "Sarah Johnson",
	userRole = "Senior Reviewer",
}: DashboardLayoutProps) => {
	const [searchQuery, setSearchQuery] = useState<string>("");

	return (
		<div className='flex h-screen bg-gray-50'>
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
									placeholder='Search lessons, teachers...'
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
								<User size={20} className='text-gray-600' />
							</motion.button>
						</div>
					</div>
				</header>

				{/* Main Content Area */}
				<main className='flex-1 overflow-y-auto p-6'>
					<div className='max-w-7xl mx-auto'>
						<div className='mb-8'>
							<h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
							<p className='text-gray-600'>
								Welcome back, {userName.split(" ")[0]}. Here's what's happening
								today.
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
