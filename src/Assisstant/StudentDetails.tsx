/** @format */

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
	User,
	Mail,
	Phone,
	MapPin,
	Save,
	ArrowRight,
	AlertCircle,
	Trash2,
	BookOpen,
	Calendar,
	Clock,
	GraduationCap,
	ChevronLeft,
} from "lucide-react";

interface Course {
	id: number;
	name: string;
	progress: number;
	status: string;
	lastAccessed?: string;
	completionDate?: string;
}

interface Student {
	name: string;
	email: string;
	phone: string;
	address: string;
	parentPhone: string;
	registrationDate: string;
	lastActive: string;
	totalCourses: number;
	completedCourses: number;
	courses: Course[];
}

const StudentDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const isEditMode = location.pathname.includes("/edit");
	const [isEditing, setIsEditing] = useState(isEditMode);
	const [isSaving, setIsSaving] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	// Mock student data - replace with actual API call
	const [student, setStudent] = useState<Student>({
		name: "أحمد محمد",
		email: "ahmed@email.com",
		phone: "01012345678",
		address: "القاهرة، مصر",
		parentPhone: "01098765432",
		registrationDate: "2024-01-15",
		lastActive: "2024-03-15",
		totalCourses: 5,
		completedCourses: 2,
		courses: [
			{
				id: 1,
				name: "مقدمة في React",
				progress: 75,
				status: "جاري",
				lastAccessed: "2024-03-14",
			},
			{
				id: 2,
				name: "JavaScript المتقدم",
				progress: 100,
				status: "مكتمل",
				completionDate: "2024-02-28",
			},
			{
				id: 3,
				name: "HTML & CSS",
				progress: 30,
				status: "جاري",
				lastAccessed: "2024-03-15",
			},
		],
	});

	useEffect(() => {
		// Fetch student data when component mounts
		const fetchStudentData = async () => {
			try {
				// Add API call here to fetch student data
				// const response = await fetch(`/api/students/${id}`);
				// const data = await response.json();
				// setStudent(data);
			} catch (error) {
				console.error("Error fetching student data:", error);
			}
		};

		fetchStudentData();
	}, [id]);

	const handleSave = async () => {
		setIsSaving(true);
		try {
			// Add API call here to save student data
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			setIsEditing(false);
			navigate(`/assistant/students/${id}`); // Navigate back to view mode
		} catch (error) {
			console.error("Error saving student data:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = async () => {
		try {
			// Add API call here to delete student
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			navigate("/assistant/students");
		} catch (error) {
			console.error("Error deleting student:", error);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "مكتمل":
				return "bg-green-100 text-green-800";
			case "جاري":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className='container mx-auto px-4 py-6 space-y-6' dir='rtl'>
			{/* Header */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<div className='flex items-center gap-3'>
					<button
						onClick={() => navigate("/assistant/students")}
						className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-150'>
						<ChevronLeft className='w-5 h-5 text-gray-600' />
					</button>
					<div>
						<h1 className='text-2xl font-bold text-gray-900'>تفاصيل الطالب</h1>
						<p className='text-gray-600'>عرض وتعديل معلومات الطالب</p>
					</div>
				</div>
				<div className='flex gap-3'>
					<button
						onClick={() => setIsEditing(!isEditing)}
						className='px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 flex items-center gap-2'>
						{isEditing ? (
							<>
								<AlertCircle className='w-4 h-4' />
								إلغاء التعديل
							</>
						) : (
							<>
								<Save className='w-4 h-4' />
								تعديل
							</>
						)}
					</button>
					<button
						onClick={() => setShowDeleteConfirm(true)}
						className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center gap-2'>
						<Trash2 className='w-4 h-4' />
						حذف
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Student Info Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='lg:col-span-2 bg-white rounded-lg shadow-sm p-6'>
					<h2 className='text-lg font-semibold mb-6 flex items-center gap-2'>
						<User className='w-5 h-5 text-gray-400' />
						معلومات الطالب
					</h2>
					<div className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-500'>
									الاسم
								</label>
								{isEditing ? (
									<input
										type='text'
										value={student.name}
										onChange={(e) =>
											setStudent({ ...student, name: e.target.value })
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								) : (
									<p className='text-gray-900 mt-1'>{student.name}</p>
								)}
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-500'>
									البريد الإلكتروني
								</label>
								{isEditing ? (
									<input
										type='email'
										value={student.email}
										onChange={(e) =>
											setStudent({ ...student, email: e.target.value })
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								) : (
									<p className='text-gray-900 mt-1'>{student.email}</p>
								)}
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-500'>
									رقم الهاتف
								</label>
								{isEditing ? (
									<input
										type='tel'
										value={student.phone}
										onChange={(e) =>
											setStudent({ ...student, phone: e.target.value })
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								) : (
									<p className='text-gray-900 mt-1'>{student.phone}</p>
								)}
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-500'>
									هاتف ولي الأمر
								</label>
								{isEditing ? (
									<input
										type='tel'
										value={student.parentPhone}
										onChange={(e) =>
											setStudent({ ...student, parentPhone: e.target.value })
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								) : (
									<p className='text-gray-900 mt-1'>{student.parentPhone}</p>
								)}
							</div>
							<div className='md:col-span-2'>
								<label className='block text-sm font-medium text-gray-500'>
									العنوان
								</label>
								{isEditing ? (
									<input
										type='text'
										value={student.address}
										onChange={(e) =>
											setStudent({ ...student, address: e.target.value })
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								) : (
									<p className='text-gray-900 mt-1'>{student.address}</p>
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
					<h2 className='text-lg font-semibold mb-6 flex items-center gap-2'>
						<GraduationCap className='w-5 h-5 text-gray-400' />
						إحصائيات
					</h2>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<BookOpen className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>الدورات المسجلة</span>
							</div>
							<span className='text-gray-900'>{student.totalCourses}</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<BookOpen className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>الدورات المكتملة</span>
							</div>
							<span className='text-gray-900'>{student.completedCourses}</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Calendar className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>تاريخ التسجيل</span>
							</div>
							<span className='text-gray-900'>{student.registrationDate}</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Clock className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>آخر نشاط</span>
							</div>
							<span className='text-gray-900'>{student.lastActive}</span>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Courses Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className='bg-white rounded-lg shadow-sm p-6'>
				<div className='flex items-center justify-between mb-6'>
					<h2 className='text-lg font-semibold flex items-center gap-2'>
						<BookOpen className='w-5 h-5 text-gray-400' />
						الدورات المسجلة
					</h2>
					<span className='text-sm text-gray-500'>
						{student.courses.length} دورات
					</span>
				</div>
				<div className='space-y-4'>
					{student.courses.map((course) => (
						<div
							key={course.id}
							className='flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4'>
							<div className='flex-1'>
								<h3 className='font-medium text-gray-900'>{course.name}</h3>
								<div className='mt-2 w-full bg-gray-200 rounded-full h-2'>
									<div
										className='bg-teal-600 h-2 rounded-full'
										style={{ width: `${course.progress}%` }}></div>
								</div>
								<div className='mt-2 flex items-center gap-4 text-sm text-gray-500'>
									{course.lastAccessed && (
										<div className='flex items-center gap-1'>
											<Clock className='w-4 h-4' />
											آخر دخول: {course.lastAccessed}
										</div>
									)}
									{course.completionDate && (
										<div className='flex items-center gap-1'>
											<Calendar className='w-4 h-4' />
											تاريخ الإكمال: {course.completionDate}
										</div>
									)}
								</div>
							</div>
							<div className='flex items-center gap-4'>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
										course.status
									)}`}>
									{course.status}
								</span>
								<span className='text-sm text-gray-500'>
									{course.progress}%
								</span>
							</div>
						</div>
					))}
				</div>
			</motion.div>

			{/* Delete Confirmation Modal */}
			{showDeleteConfirm && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className='bg-white rounded-lg p-6 max-w-md w-full'>
						<div className='flex items-center mb-4'>
							<AlertCircle className='w-6 h-6 text-red-500 ml-2' />
							<h3 className='text-lg font-medium text-gray-900'>
								تأكيد حذف الطالب
							</h3>
						</div>
						<p className='text-gray-500 mb-6'>
							هل أنت متأكد من حذف هذا الطالب؟ لا يمكن التراجع عن هذا الإجراء.
						</p>
						<div className='flex justify-end gap-3'>
							<button
								onClick={() => setShowDeleteConfirm(false)}
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
								إلغاء
							</button>
							<button
								onClick={handleDelete}
								className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700'>
								حذف
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default StudentDetails;
