/** @format */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	BookOpen,
	Users,
	Clock,
	Tag,
	Save,
	ArrowRight,
	AlertCircle,
	CheckCircle2,
	XCircle,
} from "lucide-react";

const CourseDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	// Mock course data - replace with actual API call
	const [course, setCourse] = useState({
		name: "مقدمة في React",
		description:
			"تعلم أساسيات React.js وكيفية بناء تطبيقات ويب تفاعلية باستخدام أحدث التقنيات والممارسات.",
		thumbnail: null,
		duration: "8 أسابيع",
		level: "مبتدئ",
		category: "تطوير الويب",
		price: "1200 جنيه",
		status: "قيد المراجعة",
		author: {
			name: "أحمد محمد",
			email: "ahmed@email.com",
		},
		createdAt: "2024-02-15",
		lastUpdated: "2024-02-20",
		enrollmentCount: 45,
		lessons: [
			{
				id: 1,
				title: "مقدمة إلى React",
				duration: "45 دقيقة",
				status: "منشور",
			},
			{
				id: 2,
				title: "مكونات React الأساسية",
				duration: "60 دقيقة",
				status: "قيد المراجعة",
			},
			{
				id: 3,
				title: "إدارة الحالة في React",
				duration: "75 دقيقة",
				status: "مرفوض",
			},
		],
	});

	const handleSave = async () => {
		setIsSaving(true);
		try {
			// Add API call here to save course data
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			setIsEditing(false);
		} catch (error) {
			console.error("Error saving course data:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "منشور":
				return "bg-green-100 text-green-800";
			case "قيد المراجعة":
				return "bg-yellow-100 text-yellow-800";
			case "مرفوض":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className='space-y-6' dir='rtl'>
			{/* Header */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold text-gray-900'>تفاصيل الكورس</h1>
					<p className='text-gray-600'>عرض وتعديل معلومات الكورس</p>
				</div>
				<div className='flex gap-3'>
					<button
						onClick={() => navigate("/assistant/courses")}
						className='flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
						<ArrowRight className='w-4 h-4 ml-2' />
						العودة للقائمة
					</button>
					<button
						onClick={() => setIsEditing(!isEditing)}
						className='px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700'>
						{isEditing ? "إلغاء التعديل" : "تعديل"}
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Course Info Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='lg:col-span-2 bg-white rounded-lg shadow-sm p-6'>
					<h2 className='text-lg font-semibold mb-6'>معلومات الكورس</h2>
					<div className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-500'>
									اسم الكورس
								</label>
								{isEditing ? (
									<input
										type='text'
										value={course.name}
										onChange={(e) =>
											setCourse({ ...course, name: e.target.value })
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								) : (
									<p className='text-gray-900'>{course.name}</p>
								)}
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-500'>
									المستوى
								</label>
								{isEditing ? (
									<select
										value={course.level}
										onChange={(e) =>
											setCourse({ ...course, level: e.target.value })
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'>
										<option value='مبتدئ'>مبتدئ</option>
										<option value='متوسط'>متوسط</option>
										<option value='متقدم'>متقدم</option>
									</select>
								) : (
									<p className='text-gray-900'>{course.level}</p>
								)}
							</div>
							<div className='md:col-span-2'>
								<label className='block text-sm font-medium text-gray-500'>
									الوصف
								</label>
								{isEditing ? (
									<textarea
										value={course.description}
										onChange={(e) =>
											setCourse({ ...course, description: e.target.value })
										}
										rows={4}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								) : (
									<p className='text-gray-900'>{course.description}</p>
								)}
							</div>
						</div>

						{isEditing && (
							<div className='flex justify-end mt-6'>
								<button
									onClick={handleSave}
									disabled={isSaving}
									className='flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:opacity-50'>
									<Save className='w-4 h-4 ml-2' />
									{isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
								</button>
							</div>
						)}
					</div>
				</motion.div>

				{/* Stats Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className='bg-white rounded-lg shadow-sm p-6'>
					<h2 className='text-lg font-semibold mb-6'>إحصائيات</h2>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Users className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>المسجلين</span>
							</div>
							<span className='text-gray-900'>{course.enrollmentCount}</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Clock className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>المدة</span>
							</div>
							<span className='text-gray-900'>{course.duration}</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Tag className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>السعر</span>
							</div>
							<span className='text-gray-900'>{course.price}</span>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Lessons Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className='bg-white rounded-lg shadow-sm p-6'>
				<div className='flex items-center justify-between mb-6'>
					<h2 className='text-lg font-semibold'>الدروس</h2>
					<BookOpen className='w-5 h-5 text-gray-400' />
				</div>
				<div className='space-y-4'>
					{course.lessons.map((lesson) => (
						<div
							key={lesson.id}
							className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
							<div className='flex items-center'>
								<div className='ml-4'>
									<h3 className='font-medium text-gray-900'>{lesson.title}</h3>
									<p className='text-sm text-gray-500'>{lesson.duration}</p>
								</div>
							</div>
							<div className='flex items-center gap-4'>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
										lesson.status
									)}`}>
									{lesson.status}
								</span>
								<div className='flex gap-2'>
									<button
										className='p-1 text-green-600 hover:bg-green-50 rounded-full'
										title='موافقة'>
										<CheckCircle2 className='w-5 h-5' />
									</button>
									<button
										className='p-1 text-red-600 hover:bg-red-50 rounded-full'
										title='رفض'>
										<XCircle className='w-5 h-5' />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default CourseDetails;
