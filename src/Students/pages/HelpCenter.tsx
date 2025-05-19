/** @format */

import React from "react";
import { Search, Book, Video, MessageCircle, Phone } from "lucide-react";

const HelpCenter = () => {
	const helpCategories = [
		{
			id: 1,
			title: "الدليل التعليمي",
			description: "تعرف على كيفية استخدام المنصة التعليمية",
			icon: <Book className='h-6 w-6 text-blue-500' />,
			articles: [
				"كيفية التسجيل في الدورات",
				"كيفية المشاركة في الجلسات المباشرة",
				"كيفية تحميل الشهادات",
			],
		},
		{
			id: 2,
			title: "الفيديوهات التعليمية",
			description: "شاهد الفيديوهات التعليمية للمنصة",
			icon: <Video className='h-6 w-6 text-green-500' />,
			articles: [
				"مقدمة إلى المنصة",
				"كيفية استخدام المكتبة",
				"كيفية التواصل مع المدربين",
			],
		},
		{
			id: 3,
			title: "الأسئلة الشائعة",
			description: "إجابات على الأسئلة المتكررة",
			icon: <MessageCircle className='h-6 w-6 text-purple-500' />,
			articles: [
				"كيفية استرداد كلمة المرور",
				"كيفية تغيير اللغة",
				"كيفية تحديث الملف الشخصي",
			],
		},
	];

	const contactOptions = [
		{
			id: 1,
			title: "الدعم الفني",
			description: "تواصل مع فريق الدعم الفني",
			icon: <Phone className='h-5 w-5 text-teal-500' />,
			contact: "920000000",
		},
		{
			id: 2,
			title: "البريد الإلكتروني",
			description: "راسلنا عبر البريد الإلكتروني",
			icon: <MessageCircle className='h-5 w-5 text-teal-500' />,
			contact: "support@example.com",
		},
	];

	return (
		<div className='p-6' dir='rtl'>
			<h1 className='text-2xl font-bold mb-6'>مركز المساعدة</h1>

			{/* Search Section */}
			<div className='mb-8'>
				<div className='relative max-w-2xl mx-auto'>
					<Search className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
					<input
						type='text'
						placeholder='ابحث عن المساعدة...'
						className='w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
					/>
				</div>
			</div>

			{/* Help Categories */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
				{helpCategories.map((category) => (
					<div key={category.id} className='bg-white rounded-lg shadow-md p-6'>
						<div className='flex items-start gap-4 mb-4'>
							<div className='p-2 bg-gray-50 rounded-lg'>{category.icon}</div>
							<div>
								<h2 className='text-xl font-semibold mb-1'>{category.title}</h2>
								<p className='text-gray-600'>{category.description}</p>
							</div>
						</div>
						<ul className='space-y-2'>
							{category.articles.map((article, index) => (
								<li
									key={index}
									className='text-teal-600 hover:text-teal-700 cursor-pointer'>
									{article}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Contact Section */}
			<div className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-xl font-semibold mb-4'>تواصل معنا</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{contactOptions.map((option) => (
						<div key={option.id} className='flex items-start gap-4'>
							<div className='p-2 bg-teal-50 rounded-lg'>{option.icon}</div>
							<div>
								<h3 className='font-medium text-gray-900'>{option.title}</h3>
								<p className='text-gray-600 mb-1'>{option.description}</p>
								<p className='text-teal-600 font-medium'>{option.contact}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HelpCenter;
