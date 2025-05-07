/** @format */
import { useState } from "react";

export default function StudentTables() {
	const [searchTerm, setSearchTerm] = useState("");

	const students = [
		{
			name: "أحمد محمد",
			email: "ahmed@email.com",
			phone: "01012345678",
			address: "القاهرة، مصر",
			parentPhone: "01098765432",
			courses: 5,
		},
		{
			name: "سارة علي",
			email: "sara@email.com",
			phone: "01123456789",
			address: "الإسكندرية، مصر",
			parentPhone: "01187654321",
			courses: 3,
		},
		{
			name: "محمد خالد",
			email: "mohamed@email.com",
			phone: "01234567890",
			address: "الجيزة، مصر",
			parentPhone: "01299887766",
			courses: 4,
		},
	];

	// Filter students based on search term
	const filteredStudents = students.filter(
		(student) =>
			searchTerm === "" ||
			student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			student.phone.includes(searchTerm)
	);

	return (
		<div className='container mx-auto px-4 py-6'>
			<div className='mb-6'>
				<h1 className='text-2xl font-bold text-gray-800 mb-2'>قائمة الطلاب</h1>
				<p className='text-gray-600'>عرض وتعديل بيانات الطلاب</p>
			</div>

			<div className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-200'>
				{/* Table Header */}
				<div className='p-4 sm:p-6 border-b border-gray-200'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
						<div>
							<h2 className='text-lg font-semibold text-gray-800'>
								جميع الطلاب
							</h2>
							<p className='text-sm text-gray-500 mt-1'>
								{filteredStudents.length} طالب مسجل
							</p>
						</div>
						<div className='flex items-center gap-2'>
							<div className='relative'>
								<input
									type='text'
									placeholder='بحث...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
								<svg
									className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
									/>
								</svg>
							</div>
							<button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-150 flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 mr-2'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 6v6m0 0v6m0-6h6m-6 0H6'
									/>
								</svg>
								إضافة طالب
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Card View */}
				<div className='sm:hidden p-4 space-y-4'>
					{filteredStudents.length > 0 ? (
						filteredStudents.map((student, index) => (
							<div
								key={index}
								className='bg-white rounded-lg border border-gray-200 p-4 space-y-3 hover:shadow-md transition-shadow duration-200'>
								<div className='flex items-center justify-between'>
									<h3 className='font-semibold text-gray-800'>
										{student.name}
									</h3>
									<span className='inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
										{student.courses} دورات
									</span>
								</div>
								<div className='space-y-2'>
									<div className='flex items-center gap-2 text-sm'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
											/>
										</svg>
										<span className='text-gray-600'>{student.email}</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
											/>
										</svg>
										<span className='text-gray-600'>{student.phone}</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
										<span className='text-gray-600'>{student.address}</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<svg
											className='w-4 h-4 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
											/>
										</svg>
										<span className='text-gray-600'>{student.parentPhone}</span>
									</div>
								</div>
								<div className='flex justify-end gap-2'>
									<button
										className='text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-full transition-colors duration-150'
										onClick={() => {
											/* Handle view */
										}}
										aria-label='عرض'>
										<svg
											className='w-5 h-5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
											/>
										</svg>
									</button>
									<button
										className='text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors duration-150'
										onClick={() => {
											/* Handle edit */
										}}
										aria-label='تعديل'>
										<svg
											className='w-5 h-5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
											/>
										</svg>
									</button>
									<button
										className='text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors duration-150'
										onClick={() => {
											/* Handle delete */
										}}
										aria-label='حذف'>
										<svg
											className='w-5 h-5'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
											/>
										</svg>
									</button>
								</div>
							</div>
						))
					) : (
						<div className='text-center py-6'>
							<p className='text-gray-500'>لا توجد نتائج مطابقة للبحث</p>
						</div>
					)}
				</div>

				{/* Desktop Table View */}
				<div className='hidden sm:block overflow-x-auto'>
					<table className='w-full text-sm text-right text-gray-700'>
						<thead className='text-xs uppercase bg-gray-50'>
							<tr>
								<th scope='col' className='px-6 py-4 font-medium'>
									الاسم
								</th>
								<th scope='col' className='px-6 py-4 font-medium'>
									البريد الإلكتروني
								</th>
								<th scope='col' className='px-6 py-4 font-medium'>
									رقم الهاتف
								</th>
								<th
									scope='col'
									className='px-6 py-4 font-medium hidden md:table-cell'>
									العنوان
								</th>
								<th
									scope='col'
									className='px-6 py-4 font-medium hidden lg:table-cell'>
									هاتف ولي الأمر
								</th>
								<th scope='col' className='px-6 py-4 font-medium'>
									عدد الدورات
								</th>
								<th scope='col' className='px-6 py-4 font-medium'>
									<span className='sr-only'>إجراءات</span>
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200'>
							{filteredStudents.length > 0 ? (
								filteredStudents.map((student, index) => (
									<tr
										key={index}
										className='bg-white hover:bg-gray-50 transition-colors duration-150'>
										<th
											scope='row'
											className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
											<div className='flex flex-col'>
												<span className='font-semibold'>{student.name}</span>
											</div>
										</th>
										<td className='px-6 py-4'>
											<div className='flex items-center gap-2'>
												<svg
													className='w-4 h-4 text-gray-400'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
													/>
												</svg>
												{student.email}
											</div>
										</td>
										<td className='px-6 py-4'>
											<div className='flex items-center gap-2'>
												<svg
													className='w-4 h-4 text-gray-400'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
													/>
												</svg>
												{student.phone}
											</div>
										</td>
										<td className='px-6 py-4 hidden md:table-cell'>
											<div className='flex items-center gap-2'>
												<svg
													className='w-4 h-4 text-gray-400'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
													/>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
													/>
												</svg>
												{student.address}
											</div>
										</td>
										<td className='px-6 py-4 hidden lg:table-cell'>
											<div className='flex items-center gap-2'>
												<svg
													className='w-4 h-4 text-gray-400'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
													/>
												</svg>
												{student.parentPhone}
											</div>
										</td>
										<td className='px-6 py-4'>
											<span className='inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
												{student.courses} دورات
											</span>
										</td>
										<td className='px-6 py-4 text-right whitespace-nowrap'>
											<div className='flex justify-end gap-2'>
												<button
													className='text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-full transition-colors duration-150'
													onClick={() => {
														/* Handle view */
													}}
													aria-label='عرض'>
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
														/>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
														/>
													</svg>
												</button>
												<button
													className='text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors duration-150'
													onClick={() => {
														/* Handle edit */
													}}
													aria-label='تعديل'>
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
														/>
													</svg>
												</button>
												<button
													className='text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors duration-150'
													onClick={() => {
														/* Handle delete */
													}}
													aria-label='حذف'>
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
														/>
													</svg>
												</button>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={7} className='text-center py-6 text-gray-500'>
										لا توجد نتائج مطابقة للبحث
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Table Footer */}
				<div className='p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4'>
					<div className='text-sm text-gray-500'>
						عرض {filteredStudents.length > 0 ? "1" : "0"} إلى{" "}
						{filteredStudents.length} من {students.length} طلاب
					</div>
					<div className='flex items-center gap-2'>
						<button
							className='px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={true}>
							السابق
						</button>
						<button
							className='px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={true}>
							التالي
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
