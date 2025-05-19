/** @format */

import React from "react";
import { Bell, Lock, Globe, Moon, Sun } from "lucide-react";

const Settings = () => {
	const settings = [
		{
			id: 1,
			title: "الإشعارات",
			description: "إدارة إعدادات الإشعارات والتنبيهات",
			icon: <Bell className='h-5 w-5 text-blue-500' />,
			options: [
				{
					name: "إشعارات البريد الإلكتروني",
					enabled: true,
				},
				{
					name: "إشعارات التطبيق",
					enabled: true,
				},
				{
					name: "تذكيرات الجلسات",
					enabled: false,
				},
			],
		},
		{
			id: 2,
			title: "الخصوصية",
			description: "إدارة إعدادات الخصوصية والأمان",
			icon: <Lock className='h-5 w-5 text-green-500' />,
			options: [
				{
					name: "مشاركة التقدم",
					enabled: true,
				},
				{
					name: "الملف الشخصي العام",
					enabled: false,
				},
				{
					name: "تسجيل الدخول بخطوتين",
					enabled: false,
				},
			],
		},
		{
			id: 3,
			title: "اللغة والمنطقة الزمنية",
			description: "إدارة إعدادات اللغة والمنطقة الزمنية",
			icon: <Globe className='h-5 w-5 text-purple-500' />,
			options: [
				{
					name: "اللغة العربية",
					enabled: true,
				},
				{
					name: "توقيت الرياض",
					enabled: true,
				},
			],
		},
	];

	return (
		<div className='p-6' dir='rtl'>
			<h1 className='text-2xl font-bold mb-6'>الإعدادات</h1>
			<div className='space-y-6'>
				{settings.map((section) => (
					<div key={section.id} className='bg-white rounded-lg shadow-md p-6'>
						<div className='flex items-start gap-4 mb-6'>
							<div className='p-2 bg-gray-50 rounded-lg'>{section.icon}</div>
							<div>
								<h2 className='text-xl font-semibold mb-1'>{section.title}</h2>
								<p className='text-gray-600'>{section.description}</p>
							</div>
						</div>
						<div className='space-y-4'>
							{section.options.map((option, index) => (
								<div
									key={index}
									className='flex items-center justify-between py-3 border-b border-gray-100 last:border-0'>
									<span className='text-gray-700'>{option.name}</span>
									<label className='relative inline-flex items-center cursor-pointer'>
										<input
											type='checkbox'
											className='sr-only peer'
											defaultChecked={option.enabled}
										/>
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
									</label>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Settings;
