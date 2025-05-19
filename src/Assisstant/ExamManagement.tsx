/** @format */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	FileText,
	Plus,
	Edit,
	Trash2,
	AlertCircle,
	Save,
	Clock,
	Users,
	CheckCircle2,
	ChevronLeft,
	X,
	PlusCircle,
} from "lucide-react";
import axios from "axios";

interface Question {
	id?: number;
	text: string;
	options: string[];
	correctAnswer: number;
	points: number;
}

interface Exam {
	id?: number;
	title: string;
	description: string;
	duration: number; // in minutes
	totalPoints: number;
	passingScore: number;
	questions: Question[];
	startDate: string;
	endDate: string;
	courseId: number;
}

const ExamManagement = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const [exams, setExams] = useState<Exam[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showAddExam, setShowAddExam] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
	const [currentQuestion, setCurrentQuestion] = useState<Question>({
		text: "",
		options: ["", "", "", ""],
		correctAnswer: 0,
		points: 1,
	});

	const [newExam, setNewExam] = useState<Exam>({
		title: "",
		description: "",
		duration: 60,
		totalPoints: 100,
		passingScore: 60,
		questions: [],
		startDate: "",
		endDate: "",
		courseId: Number(courseId),
	});

	useEffect(() => {
		const isNewExamRoute = window.location.pathname.endsWith("/new");
		if (isNewExamRoute) {
			setShowAddExam(true);
		} else {
			fetchExams();
		}
	}, [courseId]);

	const fetchExams = async () => {
		try {
			const token = localStorage.getItem("authToken");
			const response = await axios.get(
				`http://localhost:5208/api/Course/${courseId}/exams`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setExams(response.data);
		} catch (error: any) {
			setError(error.response?.data?.message || "حدث خطأ أثناء جلب الامتحانات");
		} finally {
			setLoading(false);
		}
	};

	const handleAddQuestion = () => {
		if (!currentQuestion.text || currentQuestion.options.some((opt) => !opt)) {
			setError("يرجى ملء جميع الحقول المطلوبة للسؤال");
			return;
		}

		const examToUpdate = selectedExam || newExam;
		const updatedQuestions = [...examToUpdate.questions, currentQuestion];

		if (selectedExam) {
			setSelectedExam({ ...selectedExam, questions: updatedQuestions });
		} else {
			setNewExam({ ...newExam, questions: updatedQuestions });
		}

		setCurrentQuestion({
			text: "",
			options: ["", "", "", ""],
			correctAnswer: 0,
			points: 1,
		});
	};

	const handleRemoveQuestion = (index: number) => {
		const examToUpdate = selectedExam || newExam;
		const updatedQuestions = examToUpdate.questions.filter(
			(_, i) => i !== index
		);

		if (selectedExam) {
			setSelectedExam({ ...selectedExam, questions: updatedQuestions });
		} else {
			setNewExam({ ...newExam, questions: updatedQuestions });
		}
	};

	const handleAddExam = async () => {
		try {
			if (
				!newExam.title ||
				!newExam.description ||
				!newExam.startDate ||
				!newExam.endDate
			) {
				setError("يرجى ملء جميع الحقول المطلوبة");
				return;
			}

			if (newExam.questions.length === 0) {
				setError("يرجى إضافة سؤال واحد على الأقل");
				return;
			}

			const token = localStorage.getItem("authToken");
			await axios.post(
				`http://localhost:5208/api/Course/${courseId}/exams`,
				newExam,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setShowAddExam(false);
			navigate(`/assistant/courses/${courseId}/exams`);
			fetchExams();
		} catch (error: any) {
			setError(error.response?.data?.message || "حدث خطأ أثناء إضافة الامتحان");
		}
	};

	const handleUpdateExam = async () => {
		if (!selectedExam) return;

		try {
			const token = localStorage.getItem("authToken");
			await axios.put(
				`http://localhost:5208/api/Course/${courseId}/exams/${selectedExam.id}`,
				selectedExam,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setShowAddExam(false);
			setSelectedExam(null);
			fetchExams();
		} catch (error: any) {
			setError(error.response?.data?.message || "حدث خطأ أثناء تحديث الامتحان");
		}
	};

	const handleDeleteExam = async (examId: number) => {
		try {
			const token = localStorage.getItem("authToken");
			await axios.delete(
				`http://localhost:5208/api/Course/${courseId}/exams/${examId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setShowDeleteConfirm(false);
			fetchExams();
		} catch (error: any) {
			setError(error.response?.data?.message || "حدث خطأ أثناء حذف الامتحان");
		}
	};

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<div className='animate-spin rounded-full h-12 w-12 border-4 border-t-teal-600 border-r-transparent border-b-teal-600 border-l-transparent'></div>
			</div>
		);
	}

	return (
		<div className='space-y-6' dir='rtl'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-3'>
					<button
						onClick={() => navigate(`/assistant/courses/${courseId}`)}
						className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-150'>
						<ChevronLeft className='w-5 h-5 text-gray-600' />
					</button>
					<h2 className='text-2xl font-bold text-gray-900'>إدارة الامتحانات</h2>
				</div>
				<button
					onClick={() => navigate(`/assistant/courses/${courseId}/exams/new`)}
					className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center gap-2'>
					<Plus className='w-5 h-5' />
					إضافة امتحان جديد
				</button>
			</div>

			{error && (
				<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
					<div className='flex items-start'>
						<AlertCircle className='h-5 w-5 text-red-500 mt-0.5 mr-3' />
						<div>
							<h3 className='text-sm font-medium text-red-800'>خطأ</h3>
							<p className='text-sm text-red-700 mt-1'>{error}</p>
						</div>
					</div>
				</div>
			)}

			{/* Exams List */}
			{!showAddExam && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{exams.map((exam) => (
						<motion.div
							key={exam.id}
							className='bg-white rounded-lg shadow-sm p-6'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}>
							<div className='flex justify-between items-start mb-4'>
								<h3 className='text-lg font-semibold'>{exam.title}</h3>
								<div className='flex gap-2'>
									<button
										onClick={() => {
											setSelectedExam(exam);
											setShowAddExam(true);
										}}
										className='p-2 text-gray-400 hover:text-teal-600 rounded-full hover:bg-teal-50'>
										<Edit className='w-4 h-4' />
									</button>
									<button
										onClick={() => {
											setSelectedExam(exam);
											setShowDeleteConfirm(true);
										}}
										className='p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50'>
										<Trash2 className='w-4 h-4' />
									</button>
								</div>
							</div>

							<p className='text-gray-600 text-sm mb-4'>{exam.description}</p>

							<div className='space-y-2 text-sm text-gray-500'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center'>
										<Clock className='w-4 h-4 ml-1' />
										<span>المدة: {exam.duration} دقيقة</span>
									</div>
									<div className='flex items-center'>
										<FileText className='w-4 h-4 ml-1' />
										<span>{exam.questions.length} سؤال</span>
									</div>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center'>
										<CheckCircle2 className='w-4 h-4 ml-1' />
										<span>الدرجة النهائية: {exam.totalPoints}</span>
									</div>
									<div className='flex items-center'>
										<Users className='w-4 h-4 ml-1' />
										<span>الدرجة المطلوبة: {exam.passingScore}</span>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			)}

			{/* Add/Edit Exam Modal */}
			{showAddExam && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className='bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
						<div className='flex justify-between items-center mb-6'>
							<h3 className='text-lg font-semibold'>
								{selectedExam ? "تعديل الامتحان" : "إضافة امتحان جديد"}
							</h3>
							<button
								onClick={() => {
									setShowAddExam(false);
									setSelectedExam(null);
								}}
								className='p-2 hover:bg-gray-100 rounded-full'>
								<X className='w-5 h-5 text-gray-500' />
							</button>
						</div>

						<div className='space-y-6'>
							{/* Basic Exam Info */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										عنوان الامتحان
									</label>
									<input
										type='text'
										value={selectedExam?.title || newExam.title}
										onChange={(e) =>
											selectedExam
												? setSelectedExam({
														...selectedExam,
														title: e.target.value,
												  })
												: setNewExam({ ...newExam, title: e.target.value })
										}
										className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										وصف الامتحان
									</label>
									<textarea
										value={selectedExam?.description || newExam.description}
										onChange={(e) =>
											selectedExam
												? setSelectedExam({
														...selectedExam,
														description: e.target.value,
												  })
												: setNewExam({
														...newExam,
														description: e.target.value,
												  })
										}
										rows={3}
										className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								</div>
							</div>

							<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										المدة (بالدقائق)
									</label>
									<input
										type='number'
										value={selectedExam?.duration || newExam.duration}
										onChange={(e) =>
											selectedExam
												? setSelectedExam({
														...selectedExam,
														duration: Number(e.target.value),
												  })
												: setNewExam({
														...newExam,
														duration: Number(e.target.value),
												  })
										}
										className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										الدرجة النهائية
									</label>
									<input
										type='number'
										value={selectedExam?.totalPoints || newExam.totalPoints}
										onChange={(e) =>
											selectedExam
												? setSelectedExam({
														...selectedExam,
														totalPoints: Number(e.target.value),
												  })
												: setNewExam({
														...newExam,
														totalPoints: Number(e.target.value),
												  })
										}
										className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										الدرجة المطلوبة
									</label>
									<input
										type='number'
										value={selectedExam?.passingScore || newExam.passingScore}
										onChange={(e) =>
											selectedExam
												? setSelectedExam({
														...selectedExam,
														passingScore: Number(e.target.value),
												  })
												: setNewExam({
														...newExam,
														passingScore: Number(e.target.value),
												  })
										}
										className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										تاريخ البداية
									</label>
									<input
										type='datetime-local'
										value={selectedExam?.startDate || newExam.startDate}
										onChange={(e) =>
											selectedExam
												? setSelectedExam({
														...selectedExam,
														startDate: e.target.value,
												  })
												: setNewExam({ ...newExam, startDate: e.target.value })
										}
										className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										تاريخ النهاية
									</label>
									<input
										type='datetime-local'
										value={selectedExam?.endDate || newExam.endDate}
										onChange={(e) =>
											selectedExam
												? setSelectedExam({
														...selectedExam,
														endDate: e.target.value,
												  })
												: setNewExam({ ...newExam, endDate: e.target.value })
										}
										className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
									/>
								</div>
							</div>

							{/* Questions Section */}
							<div className='border-t pt-6'>
								<h4 className='text-lg font-medium mb-4'>الأسئلة</h4>

								{/* Add New Question Form */}
								<div className='bg-gray-50 p-4 rounded-lg mb-6'>
									<div className='space-y-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												نص السؤال
											</label>
											<textarea
												value={currentQuestion.text}
												onChange={(e) =>
													setCurrentQuestion({
														...currentQuestion,
														text: e.target.value,
													})
												}
												rows={3}
												className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
											/>
										</div>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											{currentQuestion.options.map((option, index) => (
												<div key={index}>
													<label className='block text-sm font-medium text-gray-700 mb-1'>
														الخيار {index + 1}
													</label>
													<input
														type='text'
														value={option}
														onChange={(e) => {
															const newOptions = [...currentQuestion.options];
															newOptions[index] = e.target.value;
															setCurrentQuestion({
																...currentQuestion,
																options: newOptions,
															});
														}}
														className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
													/>
												</div>
											))}
										</div>

										<div className='grid grid-cols-2 gap-4'>
											<div>
												<label className='block text-sm font-medium text-gray-700 mb-1'>
													الإجابة الصحيحة
												</label>
												<select
													value={currentQuestion.correctAnswer}
													onChange={(e) =>
														setCurrentQuestion({
															...currentQuestion,
															correctAnswer: Number(e.target.value),
														})
													}
													className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'>
													{currentQuestion.options.map((_, index) => (
														<option key={index} value={index}>
															الخيار {index + 1}
														</option>
													))}
												</select>
											</div>

											<div>
												<label className='block text-sm font-medium text-gray-700 mb-1'>
													الدرجة
												</label>
												<input
													type='number'
													value={currentQuestion.points}
													onChange={(e) =>
														setCurrentQuestion({
															...currentQuestion,
															points: Number(e.target.value),
														})
													}
													className='w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500'
												/>
											</div>
										</div>

										<button
											onClick={handleAddQuestion}
											className='w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center justify-center gap-2'>
											<PlusCircle className='w-5 h-5' />
											إضافة السؤال
										</button>
									</div>
								</div>

								{/* Questions List */}
								<div className='space-y-4'>
									{(selectedExam?.questions || newExam.questions).map(
										(question, index) => (
											<div
												key={index}
												className='bg-white border rounded-lg p-4'>
												<div className='flex justify-between items-start mb-2'>
													<h5 className='font-medium'>السؤال {index + 1}</h5>
													<button
														onClick={() => handleRemoveQuestion(index)}
														className='p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50'>
														<Trash2 className='w-4 h-4' />
													</button>
												</div>
												<p className='text-gray-600 mb-2'>{question.text}</p>
												<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
													{question.options.map((option, optIndex) => (
														<div
															key={optIndex}
															className={`p-2 rounded ${
																optIndex === question.correctAnswer
																	? "bg-green-50 text-green-700"
																	: "bg-gray-50"
															}`}>
															{option}
														</div>
													))}
												</div>
												<div className='mt-2 text-sm text-gray-500'>
													الدرجة: {question.points}
												</div>
											</div>
										)
									)}
								</div>
							</div>

							{/* Save Button */}
							<div className='flex justify-end gap-3 mt-6'>
								<button
									onClick={() => {
										setShowAddExam(false);
										setSelectedExam(null);
									}}
									className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
									إلغاء
								</button>
								<button
									onClick={selectedExam ? handleUpdateExam : handleAddExam}
									className='px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 flex items-center gap-2'>
									<Save className='w-4 h-4' />
									حفظ
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{showDeleteConfirm && selectedExam && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className='bg-white rounded-lg p-6 max-w-md w-full'>
						<div className='flex items-center mb-4'>
							<AlertCircle className='w-6 h-6 text-red-500 ml-2' />
							<h3 className='text-lg font-medium text-gray-900'>
								تأكيد حذف الامتحان
							</h3>
						</div>
						<p className='text-gray-500 mb-6'>
							هل أنت متأكد من حذف هذا الامتحان؟ لا يمكن التراجع عن هذا الإجراء.
						</p>
						<div className='flex justify-end gap-3'>
							<button
								onClick={() => {
									setShowDeleteConfirm(false);
									setSelectedExam(null);
								}}
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
								إلغاء
							</button>
							<button
								onClick={() => handleDeleteExam(selectedExam.id!)}
								className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700'>
								حذف
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default ExamManagement;
