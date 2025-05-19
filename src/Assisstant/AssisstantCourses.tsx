/** @format */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
	BookOpen,
	AlertCircle,
	Clock,
	Users,
	CheckCircle2,
	Edit,
} from "lucide-react";
import axios from "axios";

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
}

function AssistantCourses() {
	const navigate = useNavigate();
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const token = localStorage.getItem("authToken");

				const response = await axios.get("http://localhost:5208/api/Course", {
					headers: {
						"Content-Type": "application/json; charset=utf-8",
						Authorization: `Bearer ${token}`,
					},
				});

				console.log("✅ Courses fetched successfully:", response.data);
				setCourses(response.data);
			} catch (error: any) {
				console.error("🚨 Error fetching courses:", error);
				if (error.response) {
					console.error(
						"➡️ Server responded with:",
						error.response.status,
						error.response.data
					);
					setError(`Server Error: ${error.response.status}`);
				} else if (error.request) {
					console.error("➡️ No response received:", error.request);
					setError("No response from server.");
				} else {
					console.error("➡️ Error setting up request:", error.message);
					setError("Error setting up request.");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	const handleViewCourse = (courseId: number) => {
		navigate(`/assistant/courses/${courseId}`);
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
						<h3 className='text-sm font-medium text-red-800'>Error</h3>
						<p className='text-sm text-red-700 mt-1'>{error}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-6' dir='rtl'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold text-gray-900'>مراجعة الدورات</h2>
				<div className='flex items-center space-x-2'>
					<span className='text-sm text-gray-500'>
						{courses.length} دورات تحتاج للمراجعة
					</span>
				</div>
			</div>

			{courses.length === 0 ? (
				<div className='text-center py-12 bg-white rounded-lg shadow-sm'>
					<BookOpen className='h-12 w-12 text-gray-400 mx-auto mb-4' />
					<h3 className='text-lg font-medium text-gray-900 mb-2'>
						لا توجد دورات للمراجعة
					</h3>
					<p className='text-gray-500'>تمت مراجعة جميع الدورات.</p>
				</div>
			) : (
				<motion.div
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}>
					{courses.map((course) => (
						<motion.div
							key={course.id}
							className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow'
							whileHover={{ y: -5 }}
							transition={{ duration: 0.2 }}>
							<div className='h-40 bg-gradient-to-r from-teal-500 to-teal-600 relative'>
								{course.thumbnail ? (
									<img
										src={course.thumbnail}
										alt={course.name}
										className='w-full h-full object-cover'
									/>
								) : (
									<div className='w-full h-full flex items-center justify-center'>
										<BookOpen className='h-12 w-12 text-white' />
									</div>
								)}
								<div className='absolute top-2 right-2 bg-white rounded-full p-1'>
									<CheckCircle2 className='h-5 w-5 text-teal-500' />
								</div>
							</div>

							<div className='p-4'>
								<h3 className='text-lg font-semibold mb-2 line-clamp-1'>
									{course.name}
								</h3>
								<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
									{course.description || "لا يوجد وصف متاح"}
								</p>

								<div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
									<div className='flex items-center'>
										<Clock className='h-4 w-4 ml-1' />
										<span>{course.duration || "غير محدد"}</span>
									</div>
									<div className='flex items-center'>
										<Users className='h-4 w-4 ml-1' />
										<span>{course.enrollmentCount || 0} طالب</span>
									</div>
								</div>

								<div className='flex justify-between items-center'>
									<button
										onClick={() => handleViewCourse(course.id)}
										className='text-teal-600 hover:text-teal-700 font-medium text-sm'>
										مراجعة الدورة
									</button>
									<button
										onClick={() => handleViewCourse(course.id)}
										className='p-2 text-gray-400 hover:text-teal-600 rounded-full hover:bg-teal-50 transition-colors'>
										<Edit className='h-4 w-4' />
									</button>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			)}
		</div>
	);
}

export default AssistantCourses;
