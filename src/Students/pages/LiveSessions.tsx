/** @format */

import React from "react";
import { Calendar, Clock, Users } from "lucide-react";

const LiveSessions = () => {
	const sessions = [
		{
			id: 1,
			title: "مقدمة في React.js",
			instructor: "أحمد محمد",
			date: "2024-03-20",
			time: "14:00",
			participants: 25,
			status: "upcoming",
		},
		{
			id: 2,
			title: "تصميم واجهات المستخدم",
			instructor: "سارة أحمد",
			date: "2024-03-21",
			time: "15:30",
			participants: 18,
			status: "upcoming",
		},
		{
			id: 3,
			title: "قواعد البيانات SQL",
			instructor: "محمد علي",
			date: "2024-03-19",
			time: "13:00",
			participants: 30,
			status: "completed",
		},
	];

	return (
		<div className='p-6' dir='rtl'>
			<h1 className='text-2xl font-bold mb-6'>الجلسات المباشرة</h1>
			<div className='space-y-4'>
				{sessions.map((session) => (
					<div
						key={session.id}
						className='bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
						<div className='flex-1'>
							<h2 className='text-xl font-semibold mb-2'>{session.title}</h2>
							<p className='text-gray-600 mb-2'>المدرب: {session.instructor}</p>
							<div className='flex flex-wrap gap-4 text-sm text-gray-500'>
								<div className='flex items-center gap-1'>
									<Calendar className='h-4 w-4' />
									<span>{session.date}</span>
								</div>
								<div className='flex items-center gap-1'>
									<Clock className='h-4 w-4' />
									<span>{session.time}</span>
								</div>
								<div className='flex items-center gap-1'>
									<Users className='h-4 w-4' />
									<span>{session.participants} مشارك</span>
								</div>
							</div>
						</div>
						<div>
							<span
								className={`px-4 py-2 rounded-full text-sm font-medium ${
									session.status === "upcoming"
										? "bg-teal-100 text-teal-800"
										: "bg-gray-100 text-gray-800"
								}`}>
								{session.status === "upcoming" ? "قادم" : "مكتمل"}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LiveSessions;
