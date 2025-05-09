/** @format */

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaMoneyBill, FaPeopleGroup } from "react-icons/fa6";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Home, LogOut, Menu, ChevronLeft } from "lucide-react";
import { useAuth } from "../../services/AuthContext"; // Adjust the import path as necessary
// Define interface for navigation items
interface NavItem {
	name: string;
	icon: JSX.Element;
	path: string;
}

// Define props interface for Sidebar component
interface SidebarProps {
	userName?: string;
	userRole?: string;
}

const Sidebar = ({}: SidebarProps) => {
	const { logout } = useAuth();

	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
	const location = useLocation();

	const navItems: NavItem[] = [
		{
			name: "لوحة التحكم",
			icon: <Home size={20} />,
			path: "/dashboard",
		},
		{
			name: "الطلاب",
			icon: <FaPeopleGroup size={18} />,
			path: "/Assisstant-students",
		},
		{
			name: "الكورسات",
			icon: <FaBook size={18} />,
			path: "/Assisstant-courses",
		},
		{
			name: "المدفوعات",
			icon: <FaMoneyBill size={18} />,
			path: "/analytics",
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
						<Link to='/dashboard' className='flex items-center'>
							<div className='h-8 w-8 rounded-md bg-teal-600 flex items-center justify-center'>
								<span className='text-white font-bold'>GB</span>
							</div>
							<span className='ml-3 font-semibold text-gray-800'>
								منصه تعليمية
							</span>
						</Link>
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

			{/* Navigation */}
			<nav className='flex-1 py-4 overflow-y-auto'>
				<ul className='space-y-1'>
					{navItems.map((item, index) => {
						// Check if the current path matches this item's path
						const isActive =
							location.pathname === item.path ||
							(item.path === "/dashboard" &&
								(location.pathname === "/" ||
									location.pathname === "/dashboard"));

						return (
							<li key={index}>
								<NavLink
									to={item.path}
									className={({ isActive }) => `
                    flex items-center ${
											isCollapsed ? "justify-center" : "justify-between"
										} 
                    px-5 py-3 
                    ${
											isActive
												? "bg-teal-50 text-teal-600"
												: "text-gray-600 hover:bg-gray-50"
										}
                    transition-colors
                  `}>
									{({ isActive }) => (
										<>
											<div className='flex items-center'>
												<span
													className={`${
														isActive ? "text-teal-600" : "text-gray-500"
													}`}>
													{item.icon}
												</span>
												{!isCollapsed && (
													<span className='mr-3 font-medium'>{item.name}</span>
												)}
											</div>
											{!isCollapsed && isActive && (
												<div className='h-2 w-2 rounded-full bg-teal-600'></div>
											)}
										</>
									)}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Logout */}
			<div className='p-5 border-t border-gray-100'>
				<button
					onClick={logout}
					className={`flex items-center ${
						isCollapsed ? "justify-center" : ""
					} text-gray-600 hover:text-red-600 transition-colors`}>
					<LogOut size={20} />
					{!isCollapsed && <span className='ml-3'>تسجيل الخروج</span>}
				</button>
			</div>
		</motion.div>
	);
};

export default Sidebar;
