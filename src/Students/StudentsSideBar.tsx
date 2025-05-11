/** @format */

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
	BookOpen,
	GraduationCap,
	Calendar,
	Clock,
	BookMarked,
	MessageSquare,
	Bell,
	Settings,
	HelpCircle,
	ChevronLeft,
} from "lucide-react";

const StudentSidebar = () => {
	const location = useLocation();

	const navItems = [
		{
			section: "Learning",
			items: [
				{
					name: "My Courses",
					path: "/dashboard/courses",
					icon: <BookOpen className='h-5 w-5' />,
				},
				{
					name: "Live Sessions",
					path: "/dashboard/live-sessions",
					icon: <GraduationCap className='h-5 w-5' />,
				},
				{
					name: "Schedule",
					path: "/dashboard/schedule",
					icon: <Calendar className='h-5 w-5' />,
				},
			],
		},
		{
			section: "Progress",
			items: [
				{
					name: "Learning Path",
					path: "/dashboard/learning-path",
					icon: <Clock className='h-5 w-5' />,
				},
				{
					name: "Certificates",
					path: "/dashboard/certificates",
					icon: <BookMarked className='h-5 w-5' />,
				},
			],
		},
		{
			section: "Communication",
			items: [
				{
					name: "Messages",
					path: "/dashboard/messages",
					icon: <MessageSquare className='h-5 w-5' />,
				},
				{
					name: "Notifications",
					path: "/dashboard/notifications",
					icon: <Bell className='h-5 w-5' />,
				},
			],
		},
		{
			section: "Support",
			items: [
				{
					name: "Settings",
					path: "/dashboard/settings",
					icon: <Settings className='h-5 w-5' />,
				},
				{
					name: "Help Center",
					path: "/dashboard/help",
					icon: <HelpCircle className='h-5 w-5' />,
				},
			],
		},
	];

	return (
		<nav className='flex flex-col px-4 py-6'>
			{navItems.map((section, index) => (
				<div key={index} className='mb-6'>
					<h3 className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
						{section.section}
					</h3>
					<div className='mt-2 space-y-1'>
						{section.items.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
									location.pathname === item.path
										? "bg-teal-600 text-white"
										: "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
								}`}>
								{item.icon}
								{item.name}
								{location.pathname === item.path && (
									<ChevronLeft className='ml-auto h-5 w-5' />
								)}
							</Link>
						))}
					</div>
				</div>
			))}
		</nav>
	);
};

export default StudentSidebar;
