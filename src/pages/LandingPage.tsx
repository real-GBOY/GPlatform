/** @format */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CTA from "../components/CTA";
import CoursesPreview from "../components/CoursesPreview";
import { BookOpen, Users, Award, BookMarked } from "lucide-react";
import Sidebar from "../components/layout/SideBar";

const LandingPage = () => {
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
		<div className='min-h-screen'>
	
			{/* Hero Section */}
			<section className='bg-gradient-to-b from-teal-600 to-teal-800 text-white py-16 md:py-24'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<motion.div
						className='text-center'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}>
						<h1 className='text-4xl md:text-5xl font-bold mb-6'>
							تعلم بلا حدود
						</h1>
						<p className='text-xl md:text-2xl mb-8 max-w-3xl mx-auto'>
							منصة تعليمية متكاملة تجمع بين المعلمين والطلاب في بيئة تفاعلية
							سهلة الاستخدام
						</p>
						<div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse'>
							<Link
								to='/auth'
								className='btn bg-white text-teal-700 hover:bg-gray-100 px-6 py-3 rounded-lg text-lg font-medium shadow-lg'>
								ابدأ الآن
							</Link>
							<a
								href='#features'
								className='btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg text-lg font-medium'>
								اكتشف المزيد
							</a>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Features Section */}
			<section id='features' className='py-16 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<motion.div
						className='text-center mb-16'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
							ميزات المنصة
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							توفر منصتنا مجموعة من الميزات المتكاملة التي تسهل عملية التعليم
							والتعلم
						</p>
					</motion.div>

					<motion.div
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
						variants={container}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true }}>
						<motion.div
							variants={item}
							className='card p-6 text-center hover:shadow-lg transition-shadow'>
							<div className='bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<BookOpen className='h-8 w-8 text-teal-600' />
							</div>
							<h3 className='text-xl font-bold mb-2'>محتوى تعليمي متنوع</h3>
							<p className='text-gray-600'>
								دروس ومحاضرات في مختلف المجالات والتخصصات بأسلوب تفاعلي ممتع
							</p>
						</motion.div>

						<motion.div
							variants={item}
							className='card p-6 text-center hover:shadow-lg transition-shadow'>
							<div className='bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Users className='h-8 w-8 text-amber-600' />
							</div>
							<h3 className='text-xl font-bold mb-2'>تفاعل مباشر</h3>
							<p className='text-gray-600'>
								تواصل مباشر بين المعلمين والطلاب من خلال نظام متطور للمناقشات
							</p>
						</motion.div>

						<motion.div
							variants={item}
							className='card p-6 text-center hover:shadow-lg transition-shadow'>
							<div className='bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<BookMarked className='h-8 w-8 text-indigo-600' />
							</div>
							<h3 className='text-xl font-bold mb-2'>متابعة التقدم</h3>
							<p className='text-gray-600'>
								أدوات متقدمة لمتابعة تقدم الطلاب وتقييم أدائهم بشكل مستمر
							</p>
						</motion.div>

						<motion.div
							variants={item}
							className='card p-6 text-center hover:shadow-lg transition-shadow'>
							<div className='bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Award className='h-8 w-8 text-green-600' />
							</div>
							<h3 className='text-xl font-bold mb-2'>شهادات معتمدة</h3>
							<p className='text-gray-600'>
								شهادات إتمام معتمدة للدورات المكتملة لتعزيز المسيرة المهنية
							</p>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<CTA />

			{/* All Courses */}
			<CoursesPreview />
		</div>
	);
};

export default LandingPage;
