/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import { allCourses, Course } from "./courseData";

function CourseDetails() {
	const { id } = useParams<{ id: string }>();
	const courseId = Number(id);

	const course: Course | undefined = allCourses.find(
		(course) => course.id === courseId
	);
	console.log("Params ID:", id);
	console.log("Course ID (number):", courseId);
	console.log("All courses:", allCourses);
	if (!course) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<h2 className='text-2xl font-bold text-red-500'>Course not found</h2>
			</div>
		);
	}

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<img
				src={course.image}
				alt={course.title}
				className='w-full h-64 object-cover rounded-lg mb-6'
			/>
			<h1 className='text-3xl font-bold mb-4'>{course.title}</h1>
			<p className='text-gray-700 mb-4'>{course.description}</p>
			<div className='flex items-center gap-6 mb-6 text-gray-500'>
				<span>Duration: {course.duration}</span>
				<span>Enrolled: {course.students} students</span>
			</div>
			<div className='text-2xl font-semibold text-teal-600 mb-6'>
				Price: ${course.price}
			</div>
			<button className='bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-200'>
				Enroll Now
			</button>
		</div>
	);
}

export default CourseDetails;
