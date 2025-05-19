/** @format */

import React from "react";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const LearningPath = () => {
	const learningPath = [
		{
			id: 1,
			title: "مقدمة في البرمجة",
			status: "completed",
			duration: "4 أسابيع",
			description: "أساسيات البرمجة والمفاهيم الأساسية",
		},
		{
			id: 2,
			title: "تطوير الويب الأساسي",
			status: "in-progress",
			duration: "6 أسابيع",
			description: "HTML, CSS, JavaScript الأساسية",
		},
		{
			id: 3,
			title: "تطوير الويب المتقدم",
			status: "upcoming",
			duration: "8 أسابيع",
			description: "React.js, Node.js, قواعد البيانات",
		},
		{
			id: 4,
			title: "تطوير تطبيقات الموبايل",
			status: "upcoming",
			duration: "6 أسابيع",
			description: "React Native وتطوير تطبيقات الموبايل",
		},
	];

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "completed":
				return <CheckCircle2 className='h-6 w-6 text-green-500' />;
			case "in-progress":
				return <Clock className='h-6 w-6 text-blue-500' />;
			default:
				return <Circle className='h-6 w-6 text-gray-300' />;
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case "completed":
				return "مكتمل";
			case "in-progress":
				return "قيد التنفيذ";
			default:
				return "قادم";
		}
	};

	return (
		<div className='p-6' dir='rtl'>
			<h1 className='text-2xl font-bold mb-6'>مسار التعلم</h1>
			<div className='space-y-6'>
				{learningPath.map((item, index) => (
					<div key={item.id} className='relative'>
						{index !== learningPath.length - 1 && (
							<div className='absolute top-12 right-6 w-0.5 h-full bg-gray-200' />
						)}
						<div className='flex gap-4'>
							<div className='flex-shrink-0'>{getStatusIcon(item.status)}</div>
							<div className='flex-1 bg-white rounded-lg shadow-md p-6'>
								<div className='flex justify-between items-start mb-4'>
									<div>
										<h2 className='text-xl font-semibold mb-2'>{item.title}</h2>
										<p className='text-gray-600'>{item.description}</p>
									</div>
									<span
										className={`px-3 py-1 rounded-full text-sm font-medium ${
											item.status === "completed"
												? "bg-green-100 text-green-800"
												: item.status === "in-progress"
												? "bg-blue-100 text-blue-800"
												: "bg-gray-100 text-gray-800"
										}`}>
										{getStatusText(item.status)}
									</span>
								</div>
								<div className='flex items-center text-sm text-gray-500'>
									<Clock className='h-4 w-4 ml-1' />
									<span>{item.duration}</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LearningPath;
