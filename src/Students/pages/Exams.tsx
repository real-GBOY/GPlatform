/** @format */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	FileText,
	Clock,
	AlertCircle,
	CheckCircle2,
	Calendar,
	ArrowRight,
	ChevronLeft,
} from "lucide-react";
import axios from "axios";

interface Question {
	id: number;
	text: string;
	options: string[];
	correctAnswer: number;
	points: number;
}

interface Exam {
	id: number;
	title: string;
	description: string;
	duration: number;
	totalPoints: number;
	passingScore: number;
	questions: Question[];
	startDate: string;
	endDate: string;
	courseId: number;
	status?: "not_started" | "in_progress" | "completed";
	score?: number;
}

const Exams = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const [exams, setExams] = useState<Exam[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
	const [answers, setAnswers] = useState<{ [key: number]: number }>({});
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

	useEffect(() => {
		fetchExams();
	}, [courseId]);

	useEffect(() => {
		if (selectedExam && timeLeft > 0) {
			const timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(timer);
		}
	}, [selectedExam, timeLeft]);

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

	const handleStartExam = (exam: Exam) => {
		setSelectedExam(exam);
		setTimeLeft(exam.duration * 60); // Convert minutes to seconds
		setAnswers({});
	};

	const handleSubmitExam = async () => {
		try {
			const token = localStorage.getItem("authToken");
			const response = await axios.post(
				`http://localhost:5208/api/Course/${courseId}/exams/${selectedExam?.id}/submit`,
				{ answers },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setSelectedExam(null);
			fetchExams(); // Refresh exam list to show updated status
		} catch (error: any) {
			setError(error.response?.data?.message || "حدث خطأ أثناء تقديم الامتحان");
		}
	};

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<div className='animate-spin rounded-full h-12 w-12 border-4 border-t-teal-600 border-r-transparent border-b-teal-600 border-l-transparent'></div>
			</div>
		);
	}

	if (selectedExam) {
		return (
			<div className='space-y-6' dir='rtl'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<button
							onClick={() => setSelectedExam(null)}
							className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-150'>
							<ChevronLeft className='w-5 h-5 text-gray-600' />
						</button>
						<h2 className='text-2xl font-bold text-gray-900'>
							{selectedExam.title}
						</h2>
					</div>
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2 text-gray-600'>
							<Clock className='w-5 h-5' />
							<span className='font-medium'>{formatTime(timeLeft)}</span>
						</div>
						<button
							onClick={() => setShowSubmitConfirm(true)}
							className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700'>
							إنهاء الامتحان
						</button>
					</div>
				</div>

				<div className='space-y-8'>
					{selectedExam.questions.map((question, index) => (
						<div
							key={question.id}
							className='bg-white rounded-lg shadow-sm p-6'>
							<div className='flex justify-between items-start mb-4'>
								<h3 className='text-lg font-medium'>
									السؤال {index + 1}: {question.text}
								</h3>
								<span className='text-sm text-gray-500'>
									{question.points} نقطة
								</span>
							</div>

							<div className='space-y-3'>
								{question.options.map((option, optionIndex) => (
									<label
										key={optionIndex}
										className='flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50'>
										<input
											type='radio'
											name={`question-${question.id}`}
											checked={answers[question.id] === optionIndex}
											onChange={() =>
												setAnswers({ ...answers, [question.id]: optionIndex })
											}
											className='ml-3'
										/>
										<span>{option}</span>
									</label>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Submit Confirmation Modal */}
				{showSubmitConfirm && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className='bg-white rounded-lg p-6 max-w-md w-full'>
							<div className='flex items-center mb-4'>
								<AlertCircle className='w-6 h-6 text-yellow-500 ml-2' />
								<h3 className='text-lg font-medium text-gray-900'>
									تأكيد إنهاء الامتحان
								</h3>
							</div>
							<p className='text-gray-500 mb-6'>
								هل أنت متأكد من إنهاء الامتحان؟ لا يمكن التراجع عن هذا الإجراء.
							</p>
							<div className='flex justify-end gap-3'>
								<button
									onClick={() => setShowSubmitConfirm(false)}
									className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
									إلغاء
								</button>
								<button
									onClick={handleSubmitExam}
									className='px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700'>
									إنهاء الامتحان
								</button>
							</div>
						</motion.div>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className='space-y-6' dir='rtl'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold text-gray-900'>الامتحانات</h2>
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

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{exams.map((exam) => (
					<motion.div
						key={exam.id}
						className='bg-white rounded-lg shadow-sm p-6'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}>
						<div className='flex justify-between items-start mb-4'>
							<h3 className='text-lg font-semibold'>{exam.title}</h3>
							<span
								className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
									exam.status === "completed"
										? "bg-green-100 text-green-800"
										: exam.status === "in_progress"
										? "bg-yellow-100 text-yellow-800"
										: "bg-blue-100 text-blue-800"
								}`}>
								{exam.status === "completed"
									? "مكتمل"
									: exam.status === "in_progress"
									? "قيد التنفيذ"
									: "لم يبدأ"}
							</span>
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
									<Calendar className='w-4 h-4 ml-1' />
									<span>
										{new Date(exam.startDate).toLocaleDateString("ar-SA")}
									</span>
								</div>
							</div>
						</div>

						{exam.status === "completed" ? (
							<div className='mt-4 p-3 bg-green-50 rounded-lg'>
								<div className='flex items-center justify-between'>
									<span className='text-green-800'>الدرجة النهائية:</span>
									<span className='font-medium text-green-900'>
										{exam.score} / {exam.totalPoints}
									</span>
								</div>
							</div>
						) : (
							<button
								onClick={() => handleStartExam(exam)}
								className='mt-4 w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center justify-center gap-2'>
								<ArrowRight className='w-4 h-4' />
								{exam.status === "in_progress"
									? "متابعة الامتحان"
									: "بدء الامتحان"}
							</button>
						)}
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Exams;
