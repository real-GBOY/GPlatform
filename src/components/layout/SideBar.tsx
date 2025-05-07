/** @format */

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
	Home,
	BookOpen,
	Users,
	BarChart2,
	Settings,
	LogOut,
	Menu,
	ChevronLeft,
	Bell,
	MessageSquare,
} from "lucide-react";

// Define interface for navigation items
interface NavItem {
	name: string;
	icon: JSX.Element;
	path: string;
	active: boolean;
}

// Define props interface for Sidebar component
interface SidebarProps {
	userName?: string;
	userRole?: string;
}

const Sidebar = ({
	userName = "Admin User",
	userRole = "Administrator",
}: SidebarProps) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
	const location = useLocation();

	const navItems: NavItem[] = [
		{
			name: "Dashboard",
			icon: <Home />,
			path: "/dashboard",
			active: location.pathname === "/" || location.pathname === "/dashboard",
		},
		{
			name: "Lessons",
			icon: <BookOpen />,
			path: "/lessons",
			active: location.pathname === "/lessons",
		},
		{
			name: "Teachers",
			icon: <Users />,
			path: "/teachers",
			active: location.pathname === "/teachers",
		},
		{
			name: "Analytics",
			icon: <BarChart2 />,
			path: "/analytics",
			active: location.pathname === "/analytics",
		},
		{
			name: "Settings",
			icon: <Settings />,
			path: "/settings",
			active: location.pathname === "/settings",
		},
	];

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<motion.div
			initial={{ width: 280 }}
			animate={{ width: isCollapsed ? 80 : 280 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className='h-screen bg-white border-r border-gray-200 flex flex-col'>
			{/* Logo & Toggle */}
			<div className='flex items-center justify-between p-5 border-b border-gray-100'>
				{!isCollapsed && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='flex items-center'>
						<div className='h-8 w-8 rounded-md bg-teal-600 flex items-center justify-center'>
							<span className='text-white font-bold'>ED</span>
						</div>
						<span className='ml-3 font-semibold text-gray-800'>EduReview</span>
					</motion.div>
				)}
				<button
					onClick={toggleSidebar}
					className='p-2 rounded-md hover:bg-gray-100 transition-colors'>
					{isCollapsed ? (
						<Menu size={20} className='text-gray-600' />
					) : (
						<ChevronLeft size={20} className='text-gray-600' />
					)}
				</button>
			</div>

			{/* User Profile */}
			<div className='p-5 border-b border-gray-100'>
				{!isCollapsed ? (
					<div className='flex items-center'>
						<div className='h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center'>
							<span className='text-teal-600 font-medium'>
								{userName
									.split(" ")
									.map((name) => name[0])
									.join("")}
							</span>
						</div>
						<div className='ml-3'>
							<p className='text-sm font-medium text-gray-800'>{userName}</p>
							<p className='text-xs text-gray-500'>{userRole}</p>
						</div>
					</div>
				) : (
					<div className='flex justify-center'>
						<div className='h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center'>
							<span className='text-teal-600 font-medium'>
								{userName
									.split(" ")
									.map((name) => name[0])
									.join("")}
							</span>
						</div>
					</div>
				)}
			</div>

			{/* Navigation */}
			<nav className='flex-1 py-4 overflow-y-auto'>
				<ul className='space-y-1'>
					{navItems.map((item, index) => (
						<li key={index}>
							<a
								href={item.path}
								className={`flex items-center ${
									isCollapsed ? "justify-center" : "justify-between"
								} px-5 py-3 ${
									item.active
										? "bg-teal-50 text-teal-600"
										: "text-gray-600 hover:bg-gray-50"
								} transition-colors`}>
								<div className='flex items-center'>
									<span
										className={`${
											item.active ? "text-teal-600" : "text-gray-500"
										}`}>
										{item.icon}
									</span>
									{!isCollapsed && (
										<span className='ml-3 font-medium'>{item.name}</span>
									)}
								</div>
								{!isCollapsed && item.active && (
									<div className='h-2 w-2 rounded-full bg-teal-600'></div>
								)}
							</a>
						</li>
					))}
				</ul>
			</nav>

			{/* Notifications & Messages */}
			{!isCollapsed && (
				<div className='px-5 py-4 border-t border-gray-100'>
					<div className='flex justify-between mb-3'>
						<a
							href='#'
							className='flex items-center text-gray-600 hover:text-teal-600'>
							<Bell size={20} />
							<span className='ml-3 text-sm'>Notifications</span>
						</a>
						<span className='bg-teal-600 text-white text-xs px-2 py-1 rounded-full'>
							3
						</span>
					</div>
					<div className='flex justify-between'>
						<a
							href='#'
							className='flex items-center text-gray-600 hover:text-teal-600'>
							<MessageSquare size={20} />
							<span className='ml-3 text-sm'>Messages</span>
						</a>
						<span className='bg-teal-600 text-white text-xs px-2 py-1 rounded-full'>
							5
						</span>
					</div>
				</div>
			)}

			{/* Logout */}
			<div className='p-5 border-t border-gray-100'>
				<button
					className={`flex items-center ${
						isCollapsed ? "justify-center" : ""
					} text-gray-600 hover:text-red-600 transition-colors`}>
					<LogOut size={20} />
					{!isCollapsed && <span className='ml-3'>Logout</span>}
				</button>
			</div>
		</motion.div>
	);
};

export default Sidebar;
