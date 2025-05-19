/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Search,
	Filter,
	BookOpen,
	Users,
	Clock,
	Star,
	ChevronDown,
	ChevronUp,
	X,
} from "lucide-react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { allCourses } from "./courseData";

interface Course {
	id: number;
	title: string;
	description: string;
	instructor: string;
	duration: string;
	enrollmentCount: number;
	rating: number;
	price: number;
	thumbnail: string;
	category: string;
	level: "beginner" | "intermediate" | "advanced";
	status: "active" | "draft" | "archived";
	createdAt: string;
}

const AllCourses = () => {
	const navigate = useNavigate();
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState({
		category: "",
		level: "",
		priceRange: "",
		rating: "",
	});

	const [categories] = useState([
		"البرمجة",
		"تطوير الويب",
		"قواعد البيانات",
		"الذكاء الاصطناعي",
		"الأمن السيبراني",
		"تطوير تطبيقات الموبايل",
	]);

	useEffect(() => {
		fetchCourses();
	}, []);

	const fetchCourses = async () => {
		try {
			const token = localStorage.getItem("authToken");
			const response = await axios.get("http://localhost:5208/api/Course", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setCourses(response.data);
		} catch (error: any) {
			setError(error.response?.data?.message || "حدث خطأ أثناء جلب الدورات");
		} finally {
			setLoading(false);
		}
	};

	const filteredCourses = courses.filter((course) => {
		const matchesSearch = course.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			!filters.category || course.category === filters.category;
		const matchesLevel = !filters.level || course.level === filters.level;
		const matchesRating =
			!filters.rating || course.rating >= parseInt(filters.rating);
		const matchesPriceRange = (() => {
			if (!filters.priceRange) return true;
			const [min, max] = filters.priceRange.split("-").map(Number);
			return course.price >= min && course.price <= max;
		})();

		return (
			matchesSearch &&
			matchesCategory &&
			matchesLevel &&
			matchesRating &&
			matchesPriceRange
		);
	});

	const handleFilterChange = (key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const clearFilters = () => {
		setFilters({
			category: "",
			level: "",
			priceRange: "",
			rating: "",
		});
		setSearchTerm("");
	};

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<div className='animate-spin rounded-full h-12 w-12 border-4 border-t-teal-600 border-r-transparent border-b-teal-600 border-l-transparent'></div>
			</div>
		);
	}

	return (
		<div className='container mx-auto px-4 py-8' dir='rtl'>
			{/* Header */}
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>جميع الدورات</h1>
				<p className='text-gray-600'>
					اكتشف مجموعة واسعة من الدورات التعليمية المميزة
				</p>
			</div>

			{/* Search and Filter Bar */}
			<div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
				<div className='flex flex-col md:flex-row gap-4'>
					<div className='flex-1 relative'>
						<input
							type='text'
							placeholder='ابحث عن دورة...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
						/>
						<Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
					</div>
					<button
						onClick={() => setShowFilters(!showFilters)}
						className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-2'>
						<Filter className='w-5 h-5' />
						تصفية
						{showFilters ? (
							<ChevronUp className='w-4 h-4' />
						) : (
							<ChevronDown className='w-4 h-4' />
						)}
					</button>
				</div>

				{/* Filters Panel */}
				{showFilters && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className='mt-4 pt-4 border-t'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									التصنيف
								</label>
								<select
									value={filters.category}
									onChange={(e) =>
										handleFilterChange("category", e.target.value)
									}
									className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'>
									<option value=''>الكل</option>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									المستوى
								</label>
								<select
									value={filters.level}
									onChange={(e) => handleFilterChange("level", e.target.value)}
									className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'>
									<option value=''>الكل</option>
									<option value='beginner'>مبتدئ</option>
									<option value='intermediate'>متوسط</option>
									<option value='advanced'>متقدم</option>
								</select>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									السعر
								</label>
								<select
									value={filters.priceRange}
									onChange={(e) =>
										handleFilterChange("priceRange", e.target.value)
									}
									className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'>
									<option value=''>الكل</option>
									<option value='0-50'>0 - 50 ريال</option>
									<option value='51-100'>51 - 100 ريال</option>
									<option value='101-200'>101 - 200 ريال</option>
									<option value='201-'>أكثر من 200 ريال</option>
								</select>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									التقييم
								</label>
								<select
									value={filters.rating}
									onChange={(e) => handleFilterChange("rating", e.target.value)}
									className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'>
									<option value=''>الكل</option>
									<option value='4'>4 نجوم وأعلى</option>
									<option value='3'>3 نجوم وأعلى</option>
									<option value='2'>2 نجوم وأعلى</option>
								</select>
							</div>
						</div>

						<div className='mt-4 flex justify-end'>
							<button
								onClick={clearFilters}
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2'>
								<X className='w-4 h-4' />
								مسح الفلاتر
							</button>
						</div>
					</motion.div>
				)}
			</div>

			{/* Error Message */}
			{error && (
				<div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
					<div className='flex items-start'>
						<X className='h-5 w-5 text-red-500 mt-0.5 mr-3' />
						<div>
							<h3 className='text-sm font-medium text-red-800'>خطأ</h3>
							<p className='text-sm text-red-700 mt-1'>{error}</p>
						</div>
					</div>
				</div>
			)}

			{/* Courses Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{filteredCourses.map((course) => (
					<motion.div
						key={course.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='bg-white rounded-lg shadow-sm overflow-hidden'>
						<div className='relative'>
							<img
								src={course.thumbnail}
								alt={course.title}
								className='w-full h-48 object-cover'
							/>
							<div className='absolute top-2 right-2'>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										course.level === "beginner"
											? "bg-green-100 text-green-800"
											: course.level === "intermediate"
											? "bg-yellow-100 text-yellow-800"
											: "bg-red-100 text-red-800"
									}`}>
									{course.level === "beginner"
										? "مبتدئ"
										: course.level === "intermediate"
										? "متوسط"
										: "متقدم"}
								</span>
							</div>
						</div>

						<div className='p-4'>
							<h3 className='text-lg font-semibold mb-2'>{course.title}</h3>
							<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
								{course.description}
							</p>

							<div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
								<div className='flex items-center'>
									<Users className='w-4 h-4 ml-1' />
									<span>{course.enrollmentCount} طالب</span>
								</div>
								<div className='flex items-center'>
									<Clock className='w-4 h-4 ml-1' />
									<span>{course.duration}</span>
								</div>
								<div className='flex items-center'>
									<Star className='w-4 h-4 ml-1 text-yellow-400' />
									<span>{course.rating.toFixed(1)}</span>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<span className='text-lg font-semibold text-teal-600'>
									{course.price} ريال
								</span>
								<button
									onClick={() => navigate(`/all-courses/${course.id}`)}
									className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center gap-2'>
									<BookOpen className='w-4 h-4' />
									عرض التفاصيل
								</button>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* No Results Message */}
			{filteredCourses.length === 0 && (
				<div className='text-center py-12'>
					<BookOpen className='w-12 h-12 text-gray-400 mx-auto mb-4' />
					<h3 className='text-lg font-medium text-gray-900 mb-2'>
						لا توجد دورات متاحة
					</h3>
					<p className='text-gray-500'>
						جرب تغيير معايير البحث أو الفلاتر للعثور على دورات أخرى
					</p>
				</div>
			)}
		</div>
	);
};

export default AllCourses;
