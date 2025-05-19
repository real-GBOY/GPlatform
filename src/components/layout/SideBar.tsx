/** @format */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Home,
	Users,
	BookOpen,
	DollarSign,
	Settings,
	HelpCircle,
	Menu,
	ChevronLeft,
	LogOut,
} from "lucide-react";
import { useAuth } from "../../services/AuthContext";

interface SidebarProps {
	userName?: string;
	userRole?: string;
}

interface NavItem {
	name: string;
	icon: JSX.Element;
	path: string;
}

const Sidebar = ({
	userName = "سارة أحمد",
	userRole = "معلمة",
}: SidebarProps) => {
	const { logout } = useAuth();
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
	const location = useLocation();

	const navItems: NavItem[] = [
		{
			name: "لوحة التحكم",
			icon: <Home size={20} />,
			path: "/assistant",
		},
		{
			name: "الطلاب",
			icon: <Users size={18} />,
			path: "/assistant/students",
		},
		{
			name: "الكورسات",
			icon: <BookOpen size={18} />,
			path: "/assistant/courses",
		},
		{
			name: "المدفوعات",
			icon: <DollarSign size={18} />,
			path: "/assistant/payments",
		},
		{
			name: "الإعدادات",
			icon: <Settings size={18} />,
			path: "/assistant/settings",
		},
		{
			name: "المساعدة",
			icon: <HelpCircle size={18} />,
			path: "/assistant/help",
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
			className='h-screen bg-white border-l border-gray-200 flex flex-col'
			dir='rtl'>
			{/* Logo & Toggle */}
			<div className='flex items-center justify-between p-5 border-b border-gray-100'>
				{!isCollapsed && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='flex items-center'>
						<Link to='/assistant' className='flex items-center'>
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

			{/* User Profile */}
			{!isCollapsed && (
				<div className='p-4 border-b border-gray-100'>
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
			)}

			{/* Navigation */}
			<nav className='flex-1 overflow-y-auto py-4'>
				<ul className='space-y-1 px-3'>
					{navItems.map((item) => (
						<li key={item.path}>
							<Link
								to={item.path}
								className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									location.pathname === item.path
										? "bg-teal-50 text-teal-600"
										: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
								}`}>
								<span className='ml-3'>{item.icon}</span>
								{!isCollapsed && <span>{item.name}</span>}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			{/* Logout Button */}
			<div className='p-4 border-t border-gray-100'>
				<button
					onClick={logout}
					className='flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors'>
					<span className='ml-3'>
						<LogOut size={18} />
					</span>
					{!isCollapsed && <span>تسجيل الخروج</span>}
				</button>
			</div>
		</motion.div>
	);
};

export default Sidebar;
