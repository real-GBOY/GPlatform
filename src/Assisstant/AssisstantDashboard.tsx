/** @format */

import { motion } from "framer-motion";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { Eye, BookCheck, Users, Award } from "lucide-react";

const AssistantDashboard = () => {
	// Static data for charts
	const reviewData = [
		{ name: "يناير", reviews: 65 },
		{ name: "فبراير", reviews: 85 },
		{ name: "مارس", reviews: 73 },
		{ name: "أبريل", reviews: 92 },
		{ name: "مايو", reviews: 78 },
		{ name: "يونيو", reviews: 95 },
	];

	const lessonStatusData = [
		{ name: "منشور", value: 45 },
		{ name: "مرفوض", value: 10 },
		{ name: "قيد المراجعة", value: 25 },
		{ name: "محسن", value: 10 },
	];

	const COLORS = ["#0d9488", "#f59e0b", "#ef4444", "#6366f1"];

	const statsCards = [
		{
			title: "إجمالي المراجعات",
			value: "487",
			icon: <Eye className='h-6 w-6 text-teal-600' />,
			change: "+12.5%",
			positive: true,
		},
		{
			title: "الدروس المعتمدة",
			value: "245",
			icon: <BookCheck className='h-6 w-6 text-green-600' />,
			change: "+8.2%",
			positive: true,
		},
		{
			title: "المعلمون النشطون",
			value: "32",
			icon: <Users className='h-6 w-6 text-amber-600' />,
			change: "+5.1%",
			positive: true,
		},
		{
			title: "معدل الإكمال",
			value: "94%",
			icon: <Award className='h-6 w-6 text-indigo-600' />,
			change: "+2.3%",
			positive: true,
		},
	];

	// Static lessons data
	const recentLessons = [
		{
			id: "1",
			title: "مقدمة في React",
			authorName: "أحمد محمد",
			status: "منشور",
			createdAt: "2024-02-20",
		},
		{
			id: "2",
			title: "مفاهيم JavaScript المتقدمة",
			authorName: "سارة أحمد",
			status: "قيد المراجعة",
			createdAt: "2024-02-19",
		},
		{
			id: "3",
			title: "إتقان CSS Grid",
			authorName: "محمد علي",
			status: "مرفوض",
			createdAt: "2024-02-18",
		},
		{
			id: "4",
			title: "أساسيات TypeScript",
			authorName: "فاطمة حسن",
			status: "منشور",
			createdAt: "2024-02-17",
		},
		{
			id: "5",
			title: "أساسيات Node.js",
			authorName: "علي محمود",
			status: "قيد المراجعة",
			createdAt: "2024-02-16",
		},
	];

	return (
		<div className='space-y-8' dir='rtl'>
			{/* Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{statsCards.map((card, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className='bg-white rounded-lg shadow-sm p-6'>
						<div className='flex items-center justify-between mb-4'>
							<div className='bg-gray-50 p-3 rounded-lg'>{card.icon}</div>
							<span
								className={`text-sm font-medium ${
									card.positive ? "text-green-600" : "text-red-600"
								}`}>
								{card.change}
							</span>
						</div>
						<h3 className='text-lg font-medium text-gray-600'>{card.title}</h3>
						<p className='text-3xl font-bold text-gray-900 mt-2'>
							{card.value}
						</p>
					</motion.div>
				))}
			</div>

			{/* Charts Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Review Trend Chart */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className='bg-white rounded-lg shadow-sm p-6'>
					<h3 className='text-lg font-semibold mb-6'>اتجاهات المراجعة</h3>
					<div className='h-80'>
						<ResponsiveContainer width='100%' height='100%'>
							<LineChart data={reviewData}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis />
								<Tooltip />
								<Line
									type='monotone'
									dataKey='reviews'
									stroke='#0d9488'
									strokeWidth={2}
									dot={{ fill: "#0d9488" }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</motion.div>

				{/* Lesson Status Distribution */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className='bg-white rounded-lg shadow-sm p-6'>
					<h3 className='text-lg font-semibold mb-6'>توزيع حالة الدروس</h3>
					<div className='h-80'>
						<ResponsiveContainer width='100%' height='100%'>
							<PieChart>
								<Pie
									data={lessonStatusData}
									cx='50%'
									cy='50%'
									innerRadius={60}
									outerRadius={100}
									fill='#8884d8'
									paddingAngle={5}
									dataKey='value'>
									{lessonStatusData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
						<div className='flex justify-center gap-6 mt-4'>
							{lessonStatusData.map((entry, index) => (
								<div key={entry.name} className='flex items-center'>
									<div
										className='w-3 h-3 rounded-full ml-2'
										style={{ backgroundColor: COLORS[index] }}
									/>
									<span className='text-sm text-gray-600'>{entry.name}</span>
								</div>
							))}
						</div>
					</div>
				</motion.div>
			</div>

			{/* Recent Reviews Table */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className='bg-white rounded-lg shadow-sm overflow-hidden'>
				<div className='p-6'>
					<h3 className='text-lg font-semibold mb-6'>المراجعات الأخيرة</h3>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
										عنوان الدرس
									</th>
									<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
										المعلم
									</th>
									<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
										الحالة
									</th>
									<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
										التاريخ
									</th>
									<th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
										الإجراءات
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{recentLessons.map((lesson) => (
									<tr key={lesson.id}>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm font-medium text-gray-900'>
												{lesson.title}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-500'>
												{lesson.authorName}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													lesson.status === "منشور"
														? "bg-green-100 text-green-800"
														: lesson.status === "مرفوض"
														? "bg-red-100 text-red-800"
														: "bg-yellow-100 text-yellow-800"
												}`}>
												{lesson.status}
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{new Date(lesson.createdAt).toLocaleDateString("ar-SA")}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
											<div className='flex items-center justify-center space-x-3'>
												<button className='text-indigo-600 hover:text-indigo-900'>
													<Eye className='h-5 w-5' />
												</button>
												<button className='text-green-600 hover:text-green-900'>
													<BookCheck className='h-5 w-5' />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default AssistantDashboard;
