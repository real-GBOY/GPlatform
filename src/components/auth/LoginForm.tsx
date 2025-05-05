/** @format */

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../services/AuthContext";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const { login } = useAuth();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			await login(email, password);
		} catch (err) {
			console.error(err);
			setError(
				"خطأ في تسجيل الدخول، يرجى التحقق من بيانات الاعتماد الخاصة بك."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			{error && (
				<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm'>
					{error}
				</div>
			)}

			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-gray-700 mb-1'>
					البريد الإلكتروني
				</label>
				<input
					id='email'
					type='email'
					autoComplete='email'
					required
					className='input'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					dir='ltr'
				/>
			</div>

			<div>
				<label
					htmlFor='password'
					className='block text-sm font-medium text-gray-700 mb-1'>
					كلمة المرور
				</label>
				<input
					id='password'
					type='password'
					autoComplete='current-password'
					required
					className='input'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					dir='ltr'
				/>
			</div>

			<div>
				<button
					type='submit'
					disabled={isLoading}
					className='w-full btn btn-primary py-3 flex items-center justify-center'>
					{isLoading ? (
						<>
							<Loader2 className='h-5 w-5 ml-2 animate-spin' />
							جاري تسجيل الدخول...
						</>
					) : (
						"تسجيل الدخول"
					)}
				</button>
			</div>

			<div className='text-sm text-center'>
				<a href='#' className='text-teal-600 hover:text-teal-500'>
					نسيت كلمة المرور؟
				</a>
			</div>
		</form>
	);
};

export default LoginForm;
