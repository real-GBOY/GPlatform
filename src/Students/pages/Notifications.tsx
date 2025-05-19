/** @format */

import React from "react";
import { Bell, BookOpen, Calendar, MessageSquare, Award } from "lucide-react";

const Notifications = () => {
	const notifications = [
		{
			id: 1,
			type: "course",
			title: "دورة جديدة متاحة",
			message: "تم إضافة دورة جديدة في تطوير الويب المتقدم",
			time: "منذ 5 دقائق",
			icon: <BookOpen className='h-5 w-5 text-blue-500' />,
			read: false,
		},
		{
			id: 2,
			type: "session",
			title: "جلسة مباشرة قادمة",
			message: "جلسة React.js غداً في الساعة 2:00 مساءً",
			time: "منذ ساعة",
			icon: <Calendar className='h-5 w-5 text-green-500' />,
			read: false,
		},
		{
			id: 3,
			type: "message",
			title: "رسالة جديدة",
			message: "لديك رسالة جديدة من المدرب أحمد محمد",
			time: "منذ 3 ساعات",
			icon: <MessageSquare className='h-5 w-5 text-purple-500' />,
			read: true,
		},
		{
			id: 4,
			type: "achievement",
			title: "إنجاز جديد",
			message: "تهانينا! لقد أكملت دورة البرمجة الأساسية",
			time: "منذ يوم",
			icon: <Award className='h-5 w-5 text-yellow-500' />,
			read: true,
		},
	];

	const getTypeColor = (type: string) => {
		switch (type) {
			case "course":
				return "bg-blue-100";
			case "session":
				return "bg-green-100";
			case "message":
				return "bg-purple-100";
			case "achievement":
				return "bg-yellow-100";
			default:
				return "bg-gray-100";
		}
	};

	return (
		<div className='p-6' dir='rtl'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold'>الإشعارات</h1>
				<button className='text-sm text-teal-600 hover:text-teal-700'>
					تحديد الكل كمقروء
				</button>
			</div>
			<div className='space-y-4'>
				{notifications.map((notification) => (
					<div
						key={notification.id}
						className={`bg-white rounded-lg shadow-md p-4 ${
							!notification.read ? "border-r-4 border-teal-500" : ""
						}`}>
						<div className='flex gap-4'>
							<div
								className={`p-2 rounded-full ${getTypeColor(
									notification.type
								)}`}>
								{notification.icon}
							</div>
							<div className='flex-1'>
								<div className='flex justify-between items-start'>
									<div>
										<h3 className='font-medium text-gray-900'>
											{notification.title}
										</h3>
										<p className='text-sm text-gray-600 mt-1'>
											{notification.message}
										</p>
									</div>
									<span className='text-xs text-gray-500'>
										{notification.time}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Notifications;
