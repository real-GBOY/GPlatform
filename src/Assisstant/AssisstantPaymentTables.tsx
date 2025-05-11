/** @format */

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DollarSign, Search, Download, Filter } from "lucide-react";

const recentPayments = [
	{
		id: "1",
		studentName: "Ahmed Hassan",
		courseTitle: "Advanced React Development",
		amount: 49.99,
		status: "completed",
		date: "2024-02-20",
		paymentMethod: "Credit Card",
	},
	{
		id: "2",
		studentName: "Sarah Mohamed",
		courseTitle: "UI/UX Design Fundamentals",
		amount: 39.99,
		status: "pending",
		date: "2024-02-19",
		paymentMethod: "PayPal",
	},
	{
		id: "3",
		studentName: "Omar Ali",
		courseTitle: "JavaScript Mastery",
		amount: 59.99,
		status: "completed",
		date: "2024-02-18",
		paymentMethod: "Credit Card",
	},
	{
		id: "4",
		studentName: "Fatima Ahmed",
		courseTitle: "Python for Beginners",
		amount: 29.99,
		status: "failed",
		date: "2024-02-17",
		paymentMethod: "Debit Card",
	},
	{
		id: "5",
		studentName: "Youssef Ibrahim",
		courseTitle: "Data Science Essentials",
		amount: 69.99,
		status: "completed",
		date: "2024-02-16",
		paymentMethod: "Credit Card",
	},
];

const paymentStats = [
	{
		title: "Total Revenue",
		value: "$2,459.99",
		change: "+12.5%",
		isPositive: true,
	},
	{
		title: "Pending Payments",
		value: "$189.99",
		change: "-2.3%",
		isPositive: false,
	},
	{
		title: "Successful Payments",
		value: "156",
		change: "+8.2%",
		isPositive: true,
	},
	{
		title: "Failed Payments",
		value: "3",
		change: "-15.1%",
		isPositive: true,
	},
];

function AssistantPaymentTables() {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredPayments = useMemo(() => {
		if (!searchQuery) return recentPayments;

		const query = searchQuery.toLowerCase();
		return recentPayments.filter(
			(payment) =>
				payment.studentName.toLowerCase().includes(query) ||
				payment.courseTitle.toLowerCase().includes(query) ||
				payment.status.toLowerCase().includes(query) ||
				payment.paymentMethod.toLowerCase().includes(query) ||
				payment.amount.toString().includes(query) ||
				new Date(payment.date)
					.toLocaleDateString()
					.toLowerCase()
					.includes(query)
		);
	}, [searchQuery]);

	return (
		<div className='space-y-6'>
			{/* Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{paymentStats.map((stat, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className='bg-white rounded-lg shadow-sm p-6'>
						<div className='flex items-center justify-between mb-4'>
							<div className='bg-teal-50 p-3 rounded-lg'>
								<DollarSign className='h-6 w-6 text-teal-600' />
							</div>
							<span
								className={`text-sm font-medium ${
									stat.isPositive ? "text-green-600" : "text-red-600"
								}`}>
								{stat.change}
							</span>
						</div>
						<h3 className='text-lg font-medium text-gray-600'>{stat.title}</h3>
						<p className='text-3xl font-bold text-gray-900 mt-2'>
							{stat.value}
						</p>
					</motion.div>
				))}
			</div>

			{/* Payments Table */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className='bg-white rounded-lg shadow-sm overflow-hidden'>
				<div className='p-6'>
					<div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
						<h2 className='text-xl font-semibold text-gray-800 mb-4 sm:mb-0'>
							Recent Payments
						</h2>
						<div className='flex items-center space-x-4'>
							<div className='relative'>
								<input
									type='text'
									placeholder='Search payments...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
								/>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
							</div>
							<button className='flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50'>
								<Filter className='h-4 w-4 mr-2' />
								Filter
							</button>
							<button className='flex items-center px-3 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700'>
								<Download className='h-4 w-4 mr-2' />
								Export
							</button>
						</div>
					</div>

					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Student
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Course
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Amount
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Status
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Date
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Payment Method
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{filteredPayments.map((payment) => (
									<tr key={payment.id} className='hover:bg-gray-50'>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm font-medium text-gray-900'>
												{payment.studentName}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-500'>
												{payment.courseTitle}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm font-medium text-gray-900'>
												${payment.amount}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													payment.status === "completed"
														? "bg-green-100 text-green-800"
														: payment.status === "pending"
														? "bg-yellow-100 text-yellow-800"
														: "bg-red-100 text-red-800"
												}`}>
												{payment.status.charAt(0).toUpperCase() +
													payment.status.slice(1)}
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-500'>
												{new Date(payment.date).toLocaleDateString()}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-500'>
												{payment.paymentMethod}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className='flex items-center justify-between mt-6'>
						<div className='text-sm text-gray-500'>
							Showing {filteredPayments.length} of {recentPayments.length}{" "}
							payments
						</div>
						<div className='flex items-center space-x-2'>
							<button className='px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50'>
								Previous
							</button>
							<button className='px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50'>
								Next
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default AssistantPaymentTables;
