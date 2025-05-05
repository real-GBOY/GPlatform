/** @format */

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../services/AuthContext";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { login, error } = useAuth();

	const validationSchema = Yup.object({
		fName: Yup.string().required("الاسم الأول مطلوب"),
		sName: Yup.string().required("اسم الأب مطلوب"),
		tName: Yup.string().required("اسم العائلة مطلوب"),
		email: Yup.string()
			.email("البريد الإلكتروني غير صالح")
			.required("البريد الإلكتروني مطلوب"),
		phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
		parentPhone: Yup.string().required("رقم هاتف ولي الأمر مطلوب"),
		year: Yup.number()
			.required("السنة الدراسية مطلوبة")
			.min(1, "يجب أن تكون السنة الدراسية أكبر من 0"),
		password: Yup.string()
			.min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل")
			.required("كلمة المرور مطلوبة"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password")], "كلمات المرور غير متطابقة")
			.required("تأكيد كلمة المرور مطلوب"),
	});

	const formik = useFormik({
		initialValues: {
			fName: "",
			sName: "",
			tName: "",
			email: "",
			phoneNumber: "",
			parentPhone: "",
			year: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			setIsLoading(true);
			try {
				const {
					fName,
					sName,
					tName,
					email,
					phoneNumber,
					parentPhone,
					year,
					password,
				} = values;

				const response = await axios.post(
					"http://localhost:5208/api/Account/register",
					{
						fName,
						sName,
						tName,
						email,
						phoneNumber,
						parentPhone,
						year: Number(year),
						password,
					}
				);

				console.log("Registration successful:", response.data);

				// Auto-login after registration
				login(email, password);
			} catch (error) {
				console.log("Registration error:", error);
			} finally {
				setIsLoading(false);
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className='space-y-6'>
			{error && (
				<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm'>
					{error}
				</div>
			)}

			{/* First Name */}
			<div>
				<label
					htmlFor='fName'
					className='block text-sm font-medium text-gray-700 mb-1'>
					الاسم الأول
				</label>
				<input
					id='fName'
					type='text'
					className='input'
					value={formik.values.fName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.fName && formik.errors.fName && (
					<div className='text-red-600 text-xs'>{formik.errors.fName}</div>
				)}
			</div>

			{/* Second Name */}
			<div>
				<label
					htmlFor='sName'
					className='block text-sm font-medium text-gray-700 mb-1'>
					اسم الأب
				</label>
				<input
					id='sName'
					type='text'
					className='input'
					value={formik.values.sName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.sName && formik.errors.sName && (
					<div className='text-red-600 text-xs'>{formik.errors.sName}</div>
				)}
			</div>

			{/* Third Name */}
			<div>
				<label
					htmlFor='tName'
					className='block text-sm font-medium text-gray-700 mb-1'>
					اسم العائلة
				</label>
				<input
					id='tName'
					type='text'
					className='input'
					value={formik.values.tName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.tName && formik.errors.tName && (
					<div className='text-red-600 text-xs'>{formik.errors.tName}</div>
				)}
			</div>

			{/* Email */}
			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-gray-700 mb-1'>
					البريد الإلكتروني
				</label>
				<input
					id='email'
					type='email'
					className='input'
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					dir='ltr'
				/>
				{formik.touched.email && formik.errors.email && (
					<div className='text-red-600 text-xs'>{formik.errors.email}</div>
				)}
			</div>

			{/* Phone Number */}
			<div>
				<label
					htmlFor='phoneNumber'
					className='block text-sm font-medium text-gray-700 mb-1'>
					رقم الهاتف
				</label>
				<input
					id='phoneNumber'
					type='text'
					className='input'
					value={formik.values.phoneNumber}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					dir='ltr'
				/>
				{formik.touched.phoneNumber && formik.errors.phoneNumber && (
					<div className='text-red-600 text-xs'>
						{formik.errors.phoneNumber}
					</div>
				)}
			</div>

			{/* Parent Phone */}
			<div>
				<label
					htmlFor='parentPhone'
					className='block text-sm font-medium text-gray-700 mb-1'>
					رقم هاتف ولي الأمر
				</label>
				<input
					id='parentPhone'
					type='text'
					className='input'
					value={formik.values.parentPhone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					dir='ltr'
				/>
				{formik.touched.parentPhone && formik.errors.parentPhone && (
					<div className='text-red-600 text-xs'>
						{formik.errors.parentPhone}
					</div>
				)}
			</div>

			{/* Year */}
			<div>
				<label
					htmlFor='year'
					className='block text-sm font-medium text-gray-700 mb-1'>
					السنة الدراسية
				</label>
				<input
					id='year'
					type='number'
					className='input'
					value={formik.values.year}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					dir='ltr'
				/>
				{formik.touched.year && formik.errors.year && (
					<div className='text-red-600 text-xs'>{formik.errors.year}</div>
				)}
			</div>

			{/* Password */}
			<div>
				<label
					htmlFor='password'
					className='block text-sm font-medium text-gray-700 mb-1'>
					كلمة المرور
				</label>
				<input
					id='password'
					type='password'
					className='input'
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					dir='ltr'
				/>
				{formik.touched.password && formik.errors.password && (
					<div className='text-red-600 text-xs'>{formik.errors.password}</div>
				)}
			</div>

			{/* Confirm Password */}
			<div>
				<label
					htmlFor='confirmPassword'
					className='block text-sm font-medium text-gray-700 mb-1'>
					تأكيد كلمة المرور
				</label>
				<input
					id='confirmPassword'
					type='password'
					className='input'
					value={formik.values.confirmPassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					dir='ltr'
				/>
				{formik.touched.confirmPassword && formik.errors.confirmPassword && (
					<div className='text-red-600 text-xs'>
						{formik.errors.confirmPassword}
					</div>
				)}
			</div>

			{/* Submit */}
			<div>
				<button
					type='submit'
					disabled={isLoading}
					className='w-full btn btn-primary py-3 flex items-center justify-center'>
					{isLoading ? (
						<>
							<Loader2 className='h-5 w-5 ml-2 animate-spin' />
							جاري إنشاء الحساب...
						</>
					) : (
						"إنشاء حساب"
					)}
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;
