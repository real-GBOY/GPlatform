/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Users, BookOpen, ArrowLeft } from "lucide-react";
import CourseService from "../../services/CourseService";
import CourseReview from "../../components/courses/CourseReview";
import { Course, Review } from "../../types/course";
import Navigation from "../../components/common/Navigation";

const CourseDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [course, setCourse] = useState<Course | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEnrolled, setIsEnrolled] = useState(false);
	const [purchasing, setPurchasing] = useState(false);

	useEffect(() => {
		loadCourseData();
	}, [id]);

	const loadCourseData = async () => {
		if (!id) return;

		try {
			setLoading(true);
			setError(null);
			const courseService = CourseService.getInstance();

			const [courseData, courseReviews, enrollmentStatus] = await Promise.all([
				courseService.getCourse(id),
				courseService.getCourseReviews(id),
				courseService.isEnrolled("current-user-id", id), // Replace with actual user ID
			]);

			if (courseData) {
				setCourse(courseData);
				setReviews(courseReviews);
				setIsEnrolled(enrollmentStatus);
			} else {
				setError("Course not found");
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to load course data"
			);
		} finally {
			setLoading(false);
		}
	};

	const handlePurchase = async () => {
		if (!id || !course) return;

		try {
			setPurchasing(true);
			setError(null);
			const courseService = CourseService.getInstance();
			const success = await courseService.purchaseCourse("current-user-id", id); // Replace with actual user ID

			if (success) {
				setIsEnrolled(true);
				navigate(`/dashboard/courses/${id}`);
			} else {
				setError("Failed to purchase course");
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to purchase course"
			);
		} finally {
			setPurchasing(false);
		}
	};

	const handleReviewSubmit = async (
		review: Omit<Review, "id" | "createdAt">
	) => {
		if (!id) return;

		try {
			setError(null);
			const courseService = CourseService.getInstance();
			const newReview = await courseService.addReview(review);
			setReviews((prev) => [...prev, newReview]);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to submit review");
		}
	};

	if (loading) {
		return (
			<>
				<Navigation />
				<div className='flex justify-center items-center h-64'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<Navigation />
				<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
					{error}
				</div>
			</>
		);
	}

	if (!course) {
		return (
			<>
				<Navigation />
				<div className='text-center py-12'>
					<h3 className='text-lg font-medium text-gray-900'>
						Course Not Found
					</h3>
					<p className='mt-2 text-sm text-gray-500'>
						The course you're looking for doesn't exist or has been removed.
					</p>
				</div>
			</>
		);
	}

	return (
		<>
			<Navigation />
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<button
					onClick={() => navigate(-1)}
					className='inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6'>
					<ArrowLeft className='h-4 w-4 mr-1' />
					Back to Courses
				</button>

				<div className='lg:grid lg:grid-cols-2 lg:gap-8'>
					<div>
						<img
							src={course.imageUrl}
							alt={course.title}
							className='w-full h-64 object-cover rounded-lg shadow-lg'
						/>
						<div className='mt-6'>
							<h1 className='text-3xl font-bold text-gray-900'>
								{course.title}
							</h1>
							<p className='mt-2 text-gray-600'>{course.description}</p>

							<div className='mt-4 flex items-center space-x-6'>
								<div className='flex items-center'>
									<Star className='h-5 w-5 text-yellow-400 fill-current' />
									<span className='ml-1 text-sm text-gray-600'>
										{course.rating.toFixed(1)} ({reviews.length} reviews)
									</span>
								</div>
								<div className='flex items-center'>
									<Clock className='h-5 w-5 text-gray-400' />
									<span className='ml-1 text-sm text-gray-600'>
										{course.duration}
									</span>
								</div>
								<div className='flex items-center'>
									<Users className='h-5 w-5 text-gray-400' />
									<span className='ml-1 text-sm text-gray-600'>
										{course.enrolledStudents} students
									</span>
								</div>
								<div className='flex items-center'>
									<BookOpen className='h-5 w-5 text-gray-400' />
									<span className='ml-1 text-sm text-gray-600'>
										{course.level}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-8 lg:mt-0'>
						<div className='bg-white shadow sm:rounded-lg'>
							<div className='px-4 py-5 sm:p-6'>
								<h3 className='text-lg font-medium text-gray-900'>
									Course Details
								</h3>
								<dl className='mt-4 space-y-4'>
									<div>
										<dt className='text-sm font-medium text-gray-500'>
											Instructor
										</dt>
										<dd className='mt-1 text-sm text-gray-900'>
											{course.instructor}
										</dd>
									</div>
									<div>
										<dt className='text-sm font-medium text-gray-500'>
											Category
										</dt>
										<dd className='mt-1 text-sm text-gray-900'>
											{course.category}
										</dd>
									</div>
									<div>
										<dt className='text-sm font-medium text-gray-500'>Level</dt>
										<dd className='mt-1 text-sm text-gray-900 capitalize'>
											{course.level}
										</dd>
									</div>
								</dl>

								<div className='mt-6'>
									<div className='flex items-center justify-between'>
										<span className='text-3xl font-bold text-gray-900'>
											${course.price}
										</span>
										{isEnrolled ? (
											<button
												onClick={() => navigate(`/dashboard/courses/${id}`)}
												className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>
												Continue Learning
											</button>
										) : (
											<button
												onClick={handlePurchase}
												disabled={purchasing}
												className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'>
												{purchasing ? "Processing..." : "Enroll Now"}
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-12'>
					{id && (
						<CourseReview
							courseId={id}
							onReviewSubmit={handleReviewSubmit}
							reviews={reviews}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default CourseDetails;
