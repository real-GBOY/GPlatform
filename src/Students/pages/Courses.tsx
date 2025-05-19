/** @format */

import React from "react";
import { FileCheck, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
	const courses = [
		{
			id: 1,
			title: "مقدمة في البرمجة",
			instructor: "أحمد محمد",
			progress: 75,
			image: "https://via.placeholder.com/300x200",
		},
		{
			id: 2,
			title: "تطوير الويب المتقدم",
			instructor: "سارة أحمد",
			progress: 45,
			image: "https://via.placeholder.com/300x200",
		},
		{
			id: 3,
			title: "قواعد البيانات",
			instructor: "محمد علي",
			progress: 30,
			image: "https://via.placeholder.com/300x200",
		},
	];

	const navigate = useNavigate();

	return (
		<div className='p-6' dir='rtl'>
			<h1 className='text-2xl font-bold mb-6'>دوراتي</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{courses.map((course) => (
					<div
						key={course.id}
						className='bg-white rounded-lg shadow-md overflow-hidden'>
						<img
							src={course.image}
							alt={course.title}
							className='w-full h-48 object-cover'
						/>
						<div className='p-4'>
							<h2 className='text-xl font-semibold mb-2'>{course.title}</h2>
							<p className='text-gray-600 mb-4'>المدرب: {course.instructor}</p>
							<div className='w-full bg-gray-200 rounded-full h-2.5'>
								<div
									className='bg-teal-600 h-2.5 rounded-full'
									style={{ width: `${course.progress}%` }}></div>
							</div>
							<p className='text-sm text-gray-500 mt-2'>
								التقدم: {course.progress}%
							</p>
							<div className='flex gap-2 mt-4'>
								<button
									onClick={() => navigate(`/dashboard/courses/${course.id}`)}
									className='px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 flex items-center gap-2'>
									<BookOpen className='w-4 h-4' />
									عرض الدورة
								</button>
								<button
									onClick={() =>
										navigate(`/dashboard/courses/${course.id}/exams`)
									}
									className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2'>
									<FileCheck className='w-4 h-4' />
									الامتحانات
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Courses;
