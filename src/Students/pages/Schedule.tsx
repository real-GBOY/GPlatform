/** @format */

import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const Schedule = () => {
	const scheduleItems = [
		{
			id: 1,
			title: "محاضرة البرمجة",
			type: "lecture",
			day: "الأحد",
			date: "2024-03-17",
			time: "10:00 - 12:00",
			location: "القاعة 101",
			instructor: "أحمد محمد",
		},
		{
			id: 2,
			title: "ورشة عمل React",
			type: "workshop",
			day: "الاثنين",
			date: "2024-03-18",
			time: "14:00 - 16:00",
			location: "معمل الحاسوب 2",
			instructor: "سارة أحمد",
		},
		{
			id: 3,
			title: "جلسة مراجعة",
			type: "review",
			day: "الثلاثاء",
			date: "2024-03-19",
			time: "11:00 - 12:00",
			location: "القاعة 203",
			instructor: "محمد علي",
		},
	];

	const getTypeColor = (type: string) => {
		switch (type) {
			case "lecture":
				return "bg-blue-100 text-blue-800";
			case "workshop":
				return "bg-green-100 text-green-800";
			case "review":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getTypeText = (type: string) => {
		switch (type) {
			case "lecture":
				return "محاضرة";
			case "workshop":
				return "ورشة عمل";
			case "review":
				return "مراجعة";
			default:
				return type;
		}
	};

	return (
		<div className='p-6' dir='rtl'>
			<h1 className='text-2xl font-bold mb-6'>الجدول الزمني</h1>
			<div className='space-y-4'>
				{scheduleItems.map((item) => (
					<div key={item.id} className='bg-white rounded-lg shadow-md p-6'>
						<div className='flex justify-between items-start mb-4'>
							<div>
								<h2 className='text-xl font-semibold mb-2'>{item.title}</h2>
								<p className='text-gray-600'>المدرب: {item.instructor}</p>
							</div>
							<span
								className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
									item.type
								)}`}>
								{getTypeText(item.type)}
							</span>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500'>
							<div className='flex items-center gap-2'>
								<Calendar className='h-4 w-4' />
								<span>
									{item.day} - {item.date}
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<Clock className='h-4 w-4' />
								<span>{item.time}</span>
							</div>
							<div className='flex items-center gap-2'>
								<MapPin className='h-4 w-4' />
								<span>{item.location}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Schedule;
