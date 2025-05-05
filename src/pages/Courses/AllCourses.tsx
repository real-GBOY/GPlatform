/** @format */

import React from "react";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { allCourses } from "./courseData";

const AllCourses = () => {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<div className='text-center mb-12'>
				<motion.h1
					className='text-4xl font-bold text-gray-900 mb-4'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}>
					Featured Courses
				</motion.h1>
				<motion.p
					className='text-lg text-gray-600 max-w-2xl mx-auto'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}>
					Expand your knowledge with our carefully curated selection of courses
				</motion.p>
			</div>

			<motion.div
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
				variants={container}
				initial='hidden'
				animate='show'>
				{allCourses.map((course) => (
					<motion.div key={course.id} variants={item}>
						<CourseCard {...course} />
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default AllCourses;
