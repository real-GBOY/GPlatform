/** @format */

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
	title: string;
	description: string;
	image: string;
	price: number;
	id: number;  // Added id prop for navigation
}

function CourseCard({ title, description, image, price, id }: CourseCardProps) {
	return (
		<motion.div
			whileHover={{ y: -5 }}
			transition={{ duration: 0.2 }}
			className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'>
			<div className='relative'>
				<img
					src={image}
					alt={title}
					className='w-full h-48 object-cover'
					loading='lazy'
				/>
				<div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full'>
					<span className='text-teal-600 font-semibold'>${price}</span>
				</div>
			</div>

			<div className='p-6'>
				<h2 className='text-xl font-bold text-gray-900 mb-2 line-clamp-1'>
					{title}
				</h2>
				<p className='text-gray-600 text-sm mb-4 line-clamp-2'>{description}</p>

				<div className='flex items-center gap-4 mb-6 text-sm text-gray-500'>
					<div className='flex items-center gap-1'>
						<Clock className='h-4 w-4' />
						<span>8 weeks</span>
					</div>
					<div className='flex items-center gap-1'>
						<Users className='h-4 w-4' />
						<span>156 students</span>
					</div>
				</div>

				<Link to={`/AllCourses/${id}`}> 
					<button className='w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center gap-2'>
						<BookOpen className='h-5 w-5' />
						Enroll Now
					</button>
				</Link>
			</div>
		</motion.div>
	);
}

export default CourseCard;
