/** @format */

import React from "react";
import { Download, Share2, Calendar } from "lucide-react";

const Certificates = () => {
	const certificates = [
		{
			id: 1,
			title: "مقدمة في البرمجة",
			issueDate: "2024-02-15",
			instructor: "أحمد محمد",
			image: "https://via.placeholder.com/300x200",
		},
		{
			id: 2,
			title: "تطوير الويب الأساسي",
			issueDate: "2024-01-20",
			instructor: "سارة أحمد",
			image: "https://via.placeholder.com/300x200",
		},
		{
			id: 3,
			title: "قواعد البيانات SQL",
			issueDate: "2023-12-10",
			instructor: "محمد علي",
			image: "https://via.placeholder.com/300x200",
		},
	];

	return (
		<div className='p-6' dir='rtl'>
			<h1 className='text-2xl font-bold mb-6'>الشهادات</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{certificates.map((certificate) => (
					<div
						key={certificate.id}
						className='bg-white rounded-lg shadow-md overflow-hidden'>
						<div className='relative'>
							<img
								src={certificate.image}
								alt={certificate.title}
								className='w-full h-48 object-cover'
							/>
							<div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
								<div className='flex gap-4'>
									<button className='p-2 bg-white rounded-full hover:bg-gray-100'>
										<Download className='h-5 w-5 text-gray-600' />
									</button>
									<button className='p-2 bg-white rounded-full hover:bg-gray-100'>
										<Share2 className='h-5 w-5 text-gray-600' />
									</button>
								</div>
							</div>
						</div>
						<div className='p-4'>
							<h2 className='text-xl font-semibold mb-2'>
								{certificate.title}
							</h2>
							<p className='text-gray-600 mb-2'>
								المدرب: {certificate.instructor}
							</p>
							<div className='flex items-center text-sm text-gray-500'>
								<Calendar className='h-4 w-4 ml-1' />
								<span>تاريخ الإصدار: {certificate.issueDate}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Certificates;
