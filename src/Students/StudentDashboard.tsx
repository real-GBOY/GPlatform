/** @format */

import { useState } from "react";
import { motion } from "framer-motion";
import {
	BookOpen,
	Clock,
	Award,
	Calendar,
	Star,
	PlayCircle,
	ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
	const [activeCourses] = useState([
		{
			id: "1",
			title: "تطوير React المتقدم",
			progress: 65,
			nextLesson: "React Hooks المتقدمة",
			instructor: "سارة أحمد",
			thumbnail:
				"https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
			duration: "ساعتان و 15 دقيقة متبقية",
		},
		{
			id: "2",
			title: "أساسيات تصميم واجهات المستخدم",
			progress: 42,
			nextLesson: "طرق البحث عن المستخدم",
			instructor: "محمد علي",
			thumbnail:
				"https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
			duration: "3 ساعات و 45 دقيقة متبقية",
		},
		{
			id: "3",
			title: "Python لعلوم البيانات",
			progress: 28,
			nextLesson: "تصور البيانات",
			instructor: "أحمد محمد",
			thumbnail:
				"https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
			duration: "5 ساعات و 30 دقيقة متبقية",
		},
	]);

	const upcomingEvents = [
		{
			id: "1",
			title: "جلسة برمجة مباشرة",
			date: "2024-03-01T14:00:00",
			type: "live-session",
			course: "تطوير React المتقدم",
		},
		{
			id: "2",
			title: "ورشة تصميم",
			date: "2024-03-03T15:30:00",
			type: "workshop",
			course: "أساسيات تصميم واجهات المستخدم",
		},
		{
			id: "3",
			title: "موعد تسليم المشروع",
			date: "2024-03-05T23:59:59",
			type: "deadline",
			course: "Python لعلوم البيانات",
		},
	];

	const achievements = [
		{
			id: "1",
			title: "متعلم سريع",
			description: "إكمال 5 دروس في يوم واحد",
			icon: <Clock className='h-6 w-6 text-amber-500' />,
		},
		{
			id: "2",
			title: "درجة كاملة",
			description: "تحقيق 100% في اختبار",
			icon: <Star className='h-6 w-6 text-amber-500' />,
		},
		{
			id: "3",
			title: "بطل الدورة",
			description: "إكمال أول دورة",
			icon: <Award className='h-6 w-6 text-amber-500' />,
		},
	];

	return (
		<div className='space-y-8' dir='rtl'>
			{/* Welcome Section */}
			<div className='bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white'>
				<h1 className='text-2xl font-bold mb-2'>مرحباً بعودتك!</h1>
				<p className='text-teal-100'>هل أنت مستعد لمواصلة رحلة التعلم؟</p>
			</div>

			{/* Stats Overview */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='bg-white p-6 rounded-lg shadow-sm'>
					<div className='flex items-center justify-between mb-4'>
						<div className='bg-teal-100 p-3 rounded-lg'>
							<BookOpen className='h-6 w-6 text-teal-600' />
						</div>
						<span className='text-sm font-medium text-green-600'>
							+2 هذا الأسبوع
						</span>
					</div>
					<h3 className='text-lg font-medium text-gray-700'>الدورات النشطة</h3>
					<p className='text-3xl font-bold text-gray-900 mt-2'>3</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className='bg-white p-6 rounded-lg shadow-sm'>
					<div className='flex items-center justify-between mb-4'>
						<div className='bg-amber-100 p-3 rounded-lg'>
							<Clock className='h-6 w-6 text-amber-600' />
						</div>
						<span className='text-sm font-medium text-green-600'>+5 ساعات</span>
					</div>
					<h3 className='text-lg font-medium text-gray-700'>وقت التعلم</h3>
					<p className='text-3xl font-bold text-gray-900 mt-2'>12س</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className='bg-white p-6 rounded-lg shadow-sm'>
					<div className='flex items-center justify-between mb-4'>
						<div className='bg-indigo-100 p-3 rounded-lg'>
							<Award className='h-6 w-6 text-indigo-600' />
						</div>
						<span className='text-sm font-medium text-green-600'>جديد!</span>
					</div>
					<h3 className='text-lg font-medium text-gray-700'>الإنجازات</h3>
					<p className='text-3xl font-bold text-gray-900 mt-2'>8</p>
				</motion.div>
			</div>

			{/* Active Courses */}
			<div>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-semibold text-gray-800'>واصل التعلم</h2>
					<Link
						to='/dashboard/courses'
						className='text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center'>
						عرض جميع الدورات
						<ChevronLeft className='h-4 w-4 mr-1' />
					</Link>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{activeCourses.map((course) => (
						<motion.div
							key={course.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow'>
							<div className='relative h-48'>
								<img
									src={course.thumbnail}
									alt={course.title}
									className='w-full h-full object-cover'
								/>
								<div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
									<PlayCircle className='h-12 w-12 text-white' />
								</div>
							</div>

							<div className='p-4'>
								<h3 className='font-semibold text-gray-800 mb-2'>
									{course.title}
								</h3>
								<p className='text-sm text-gray-500 mb-3'>
									التالي: {course.nextLesson}
								</p>

								<div className='mb-3'>
									<div className='flex justify-between text-sm mb-1'>
										<span className='text-gray-600'>{course.duration}</span>
										<span className='font-medium'>
											{course.progress}% مكتمل
										</span>
									</div>
									<div className='w-full bg-gray-200 rounded-full h-2'>
										<div
											className='bg-teal-600 h-2 rounded-full'
											style={{ width: `${course.progress}%` }}></div>
									</div>
								</div>

								<Link
									to={`/dashboard/courses/${course.id}`}
									className='text-teal-600 hover:text-teal-700 text-sm font-medium'>
									واصل التعلم
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Upcoming Events and Achievements */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Upcoming Events */}
				<div className='bg-white rounded-lg shadow-sm p-6'>
					<h2 className='text-xl font-semibold text-gray-800 mb-6'>
						الأحداث القادمة
					</h2>
					<div className='space-y-4'>
						{upcomingEvents.map((event) => (
							<div
								key={event.id}
								className='flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
								<Calendar className='h-10 w-10 text-teal-600 ml-4' />
								<div className='flex-1'>
									<h3 className='font-medium text-gray-800'>{event.title}</h3>
									<p className='text-sm text-gray-500'>{event.course}</p>
								</div>
								<div className='text-left'>
									<p className='text-sm font-medium text-gray-800'>
										{new Date(event.date).toLocaleDateString("ar-SA")}
									</p>
									<p className='text-sm text-gray-500'>
										{new Date(event.date).toLocaleTimeString("ar-SA", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Recent Achievements */}
				<div className='bg-white rounded-lg shadow-sm p-6'>
					<h2 className='text-xl font-semibold text-gray-800 mb-6'>
						الإنجازات الأخيرة
					</h2>
					<div className='space-y-4'>
						{achievements.map((achievement) => (
							<div
								key={achievement.id}
								className='flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
								<div className='bg-amber-100 p-3 rounded-lg ml-4'>
									{achievement.icon}
								</div>
								<div>
									<h3 className='font-medium text-gray-800'>
										{achievement.title}
									</h3>
									<p className='text-sm text-gray-500'>
										{achievement.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentDashboard;
