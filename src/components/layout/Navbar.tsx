/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, LogOut, User } from "lucide-react";
import { useAuth } from "../../services/AuthContext";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		setIsMenuOpen(false);
	};

	return (
		<nav className='bg-white shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex items-center'>
						<Link to='/' className='flex-shrink-0 flex items-center'>
							<BookOpen className='h-8 w-8 text-teal-600' />
							<span className='ml-2 text-xl font-bold text-gray-900'>
								منصه تعليمية
							</span>
						</Link>

						<div className='hidden md:ml-6 md:flex md:space-x-8'>
							<Link
								to='/'
								className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-teal-500'>
								الرئيسية
							</Link>
							<Link
								to='/all-courses'
								className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-teal-500'>
								الكورسات
							</Link>

							{/* Conditionally render Dashboard link if user is an assistant or teacher */}
							{(user?.role === "assistant" || user?.role === "teacher") && (
								<Link
									to='/dashboard'
									className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-teal-500'>
									لوحة التحكم
								</Link>
							)}
						</div>
					</div>

					<div className='hidden md:flex md:items-center md:space-x-4'>
						{user ? (
							<div className='flex items-center space-x-4'>
								<div className='flex items-center space-x-2'></div>
								<button
									onClick={handleLogout}
									className='ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'>
									<LogOut className='h-4 w-4 mr-2' />
									تسجيل الخروج
								</button>
							</div>
						) : (
							<Link
								to='/auth'
								className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'>
								تسجيل الدخول
							</Link>
						)}
					</div>

					<div className='flex items-center md:hidden'>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500'>
							<span className='sr-only'>Open main menu</span>
							{isMenuOpen ? (
								<X className='block h-6 w-6' />
							) : (
								<Menu className='block h-6 w-6' />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className='md:hidden'>
					<div className='pt-2 pb-3 space-y-1'>
						<Link
							to='/'
							className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
							onClick={() => setIsMenuOpen(false)}>
							الرئيسية
						</Link>
						<Link
							to='/all-courses'
							className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
							onClick={() => setIsMenuOpen(false)}>
							جميع الكورسات
						</Link>

						{/* Conditionally render Dashboard link if user is an assistant or teacher */}
						{(user?.role === "assistant" || user?.role === "teacher") && (
							<Link
								to='/dashboard'
								className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
								onClick={() => setIsMenuOpen(false)}>
								لوحة التحكم
							</Link>
						)}
					</div>

					<div className='pt-4 pb-3 border-t border-gray-200'>
						{user ? (
							<div className='space-y-3'>
								<div className='flex items-center px-4'>
									<div className='flex-shrink-0'>
										<div className='h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center'>
											<User className='h-6 w-6 text-teal-600' />
										</div>
									</div>
								</div>
								<div className='px-2'>
									<button
										onClick={handleLogout}
										className='w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700'>
										<LogOut className='h-5 w-5 mr-2' />
										تسجيل الخروج
									</button>
								</div>
							</div>
						) : (
							<div className='px-2'>
								<Link
									to='/auth'
									className='block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700'
									onClick={() => setIsMenuOpen(false)}>
									تسجيل الدخول
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
