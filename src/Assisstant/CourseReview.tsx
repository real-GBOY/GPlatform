/** @format */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	BookOpen,
	AlertCircle,
	Clock,
	Users,
	CheckCircle2,
	Edit,
	ChevronLeft,
	Save,
	Trash2,
	Calendar,
	GraduationCap,
	FileText,
	Video,
	MessageSquare,
	FileCheck,
	Plus,
	X,
} from "lucide-react";
import axios from "axios";

interface Lesson {
	id: number;
	title: string;
	duration: string;
	status: "pending" | "approved" | "rejected";
	type: "video" | "document" | "quiz";
}

interface Course {
	id: number;
	name: string;
	description: string;
	duration: string;
	enrollmentCount: number;
	status: "pending" | "approved" | "rejected";
	thumbnail?: string;
	teacher: string;
	createdAt: string;
	updatedAt: string;
	lessons: Lesson[];
}

const CourseReview = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [course, setCourse] = useState<Course | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		fetchCourseData();
	}, [id]);

	const fetchCourseData = async () => {
		try {
			setLoading(true);
			setError("");
			const token = localStorage.getItem("authToken");
			const response = await axios.get(
				`http://localhost:5208/api/Course/${id}`,
				{
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setCourse(response.data);
		} catch (error: any) {
			console.error("Error fetching course:", error);
			setError(
				error.response?.data?.message || "حدث خطأ أثناء جلب بيانات الدورة"
			);
		} finally {
			setLoading(false);
		}
	};

	const handleApprove = async () => {
		try {
			setIsSaving(true);
			setError("");
			const token = localStorage.getItem("authToken");
			await axios.put(
				`http://localhost:5208/api/Course/${id}/approve`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setCourse((prev) => (prev ? { ...prev, status: "approved" } : null));
		} catch (error: any) {
			console.error("Error approving course:", error);
			setError(
				error.response?.data?.message || "حدث خطأ أثناء الموافقة على الدورة"
			);
		} finally {
			setIsSaving(false);
		}
	};

	const handleReject = async () => {
		try {
			setIsSaving(true);
			setError("");
			const token = localStorage.getItem("authToken");
			await axios.put(
				`http://localhost:5208/api/Course/${id}/reject`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setCourse((prev) => (prev ? { ...prev, status: "rejected" } : null));
		} catch (error: any) {
			console.error("Error rejecting course:", error);
			setError(error.response?.data?.message || "حدث خطأ أثناء رفض الدورة");
		} finally {
			setIsSaving(false);
		}
	};

	const handleSave = async () => {
		if (!course) return;

		try {
			setIsSaving(true);
			setError("");
			const token = localStorage.getItem("authToken");
			await axios.put(
				`http://localhost:5208/api/Course/${id}`,
				{
					name: course.name,
					description: course.description,
					duration: course.duration,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setIsEditing(false);
			await fetchCourseData(); // Refresh course data
		} catch (error: any) {
			console.error("Error updating course:", error);
			setError(error.response?.data?.message || "حدث خطأ أثناء تحديث الدورة");
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = async () => {
		try {
			setIsSaving(true);
			setError("");
			const token = localStorage.getItem("authToken");
			await axios.delete(`http://localhost:5208/api/Course/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			navigate("/assistant/courses");
		} catch (error: any) {
			console.error("Error deleting course:", error);
			setError(error.response?.data?.message || "حدث خطأ أثناء حذف الدورة");
			setShowDeleteConfirm(false);
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		fetchCourseData(); // Reset to original data
	};

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<div className='animate-spin rounded-full h-12 w-12 border-4 border-t-teal-600 border-r-transparent border-b-teal-600 border-l-transparent'></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
				<div className='flex items-start'>
					<AlertCircle className='h-5 w-5 text-red-500 mt-0.5 mr-3' />
					<div>
						<h3 className='text-sm font-medium text-red-800'>خطأ</h3>
						<p className='text-sm text-red-700 mt-1'>{error}</p>
					</div>
				</div>
			</div>
		);
	}

	if (!course) {
		return null;
	}

	return (
		<div className='container mx-auto px-4 py-6 space-y-6' dir='rtl'>
			{/* Header */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<div className='flex items-center gap-3'>
					<button
						onClick={() => navigate("/assistant/courses")}
						className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-150'>
						<ChevronLeft className='w-5 h-5 text-gray-600' />
					</button>
					<div>
						<h1 className='text-2xl font-bold text-gray-900'>مراجعة الدورة</h1>
						<p className='text-gray-600'>عرض وتعديل تفاصيل الدورة</p>
					</div>
				</div>
				<div className='flex gap-3'>
					<button
						onClick={() => navigate(`/assistant/courses/${id}/exams`)}
						className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2'>
						<FileCheck className='w-4 h-4' />
						إدارة الامتحانات
					</button>
					<button
						onClick={() => navigate(`/assistant/courses/${id}/exams/new`)}
						className='px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center gap-2'>
						<Plus className='w-4 h-4' />
						إضافة امتحان جديد
					</button>
					{course.status === "pending" && (
						<>
							<button
								onClick={handleApprove}
								disabled={isSaving}
								className='px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'>
								<CheckCircle2 className='w-4 h-4' />
								{isSaving ? "جاري الحفظ..." : "موافقة"}
							</button>
							<button
								onClick={handleReject}
								disabled={isSaving}
								className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'>
								<AlertCircle className='w-4 h-4' />
								{isSaving ? "جاري الحفظ..." : "رفض"}
							</button>
						</>
					)}
					{isEditing ? (
						<>
							<button
								onClick={handleSave}
								disabled={isSaving}
								className='px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'>
								<Save className='w-4 h-4' />
								{isSaving ? "جاري الحفظ..." : "حفظ"}
							</button>
							<button
								onClick={handleCancelEdit}
								disabled={isSaving}
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'>
								<X className='w-4 h-4' />
								إلغاء
							</button>
						</>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 flex items-center gap-2'>
							<Edit className='w-4 h-4' />
							تعديل
						</button>
					)}
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
				{/* Course Info Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='lg:col-span-2 bg-white rounded-lg shadow-sm p-6'>
					<div className='aspect-video bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg mb-6 relative'>
						{course.thumbnail ? (
							<img
								src={course.thumbnail}
								alt={course.name}
								className='w-full h-full object-cover rounded-lg'
							/>
						) : (
							<div className='w-full h-full flex items-center justify-center'>
								<BookOpen className='h-16 w-16 text-white' />
							</div>
						)}
					</div>

					<div className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-500'>
								اسم الدورة
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
								<p className='text-gray-900 mt-1'>{course.name}</p>
							)}
						</div>

						<div>
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
								<p className='text-gray-900 mt-1'>{course.description}</p>
							)}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-500'>
									المدة
								</label>
								{isEditing ? (
									<input
										type='text'
										value={course.duration}
										onChange={(e) =>
											setCourse({ ...course, duration: e.target.value })
										}
										className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								) : (
									<p className='text-gray-900 mt-1'>{course.duration}</p>
								)}
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-500'>
									المدرس
								</label>
								<p className='text-gray-900 mt-1'>{course.teacher}</p>
							</div>
						</div>
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
								<Users className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>عدد الطلاب</span>
							</div>
							<span className='text-gray-900'>{course.enrollmentCount}</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Calendar className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>تاريخ الإنشاء</span>
							</div>
							<span className='text-gray-900'>{course.createdAt}</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Clock className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>آخر تحديث</span>
							</div>
							<span className='text-gray-900'>{course.updatedAt}</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<FileText className='w-5 h-5 text-gray-400 ml-3' />
								<span className='text-gray-500'>عدد الدروس</span>
							</div>
							<span className='text-gray-900'>{course.lessons.length}</span>
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
					<h2 className='text-lg font-semibold flex items-center gap-2'>
						<FileText className='w-5 h-5 text-gray-400' />
						الدروس
					</h2>
					<span className='text-sm text-gray-500'>
						{course.lessons.length} درس
					</span>
				</div>
				<div className='space-y-4'>
					{course.lessons.map((lesson) => (
						<div
							key={lesson.id}
							className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
							<div className='flex items-center gap-4'>
								{lesson.type === "video" ? (
									<Video className='w-5 h-5 text-gray-400' />
								) : lesson.type === "document" ? (
									<FileText className='w-5 h-5 text-gray-400' />
								) : (
									<MessageSquare className='w-5 h-5 text-gray-400' />
								)}
								<div>
									<h3 className='font-medium text-gray-900'>{lesson.title}</h3>
									<p className='text-sm text-gray-500'>{lesson.duration}</p>
								</div>
							</div>
							<span
								className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
									lesson.status === "approved"
										? "bg-green-100 text-green-800"
										: lesson.status === "rejected"
										? "bg-red-100 text-red-800"
										: "bg-yellow-100 text-yellow-800"
								}`}>
								{lesson.status === "approved"
									? "تمت الموافقة"
									: lesson.status === "rejected"
									? "مرفوض"
									: "قيد المراجعة"}
							</span>
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
								تأكيد حذف الدورة
							</h3>
						</div>
						<p className='text-gray-500 mb-6'>
							هل أنت متأكد من حذف هذه الدورة؟ لا يمكن التراجع عن هذا الإجراء.
						</p>
						<div className='flex justify-end gap-3'>
							<button
								onClick={() => setShowDeleteConfirm(false)}
								disabled={isSaving}
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'>
								إلغاء
							</button>
							<button
								onClick={handleDelete}
								disabled={isSaving}
								className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed'>
								{isSaving ? "جاري الحذف..." : "حذف"}
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default CourseReview;
