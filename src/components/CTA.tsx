/** @format */

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CTA() {
	return (
		<>
			<section className='bg-gray-100 py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<motion.div
						className='bg-teal-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl'
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							مستعد للبدء في رحلة التعلم؟
						</h2>
						<p className='text-xl mb-8 max-w-3xl mx-auto'>
							انضم إلى آلاف الطلاب والمعلمين على منصتنا واستفد من تجربة تعليمية
							فريدة
						</p>
						<Link
							to='/auth'
							className='inline-block bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-md'>
							سجل الآن مجاناً
						</Link>
					</motion.div>
				</div>
			</section>
		</>
	);
}

export default CTA;
