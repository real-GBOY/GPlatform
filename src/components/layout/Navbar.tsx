/** @format */

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, LogOut, User } from "lucide-react";
import { useAuth } from "../../services/AuthContext";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// Effect to handle automatic navigation based on user role
	useEffect(() => {
		if (user) {
			if (user.role === "Teacher" && location.pathname === "/auth") {
				navigate("/assistant");
			} else if (user.role === "Student" && location.pathname === "/auth") {
				navigate("/dashboard");
			}
		}
	}, [user, location.pathname, navigate]);

	const handleLogout = () => {
		logout();
		setIsMenuOpen(false);
		navigate("/");
	};

	const navLinks = [
		{
			name: "الرئيسية",
			path: "/",
		},
		{
			name: "الكورسات",
			path: "/all-courses",
		},
	];

	// Add dashboard link based on user role
	if (user?.role === "Teacher") {
		navLinks.push({
			name: "لوحة التحكم",
			path: "/assistant",
		});
	} else if (user?.role === "Student") {
		navLinks.push({
			name: "لوحة التحكم",
			path: "/dashboard",
		});
	}

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
							{navLinks.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
										location.pathname === link.path
											? "text-teal-600 border-b-2 border-teal-600"
											: "text-gray-900 border-b-2 border-transparent hover:border-teal-500"
									}`}>
									{link.name}
								</Link>
							))}
						</div>
					</div>

					{/* Mobile menu button */}
					<div className='flex items-center md:hidden'>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500'>
							<span className='sr-only'>فتح القائمة</span>
							{isMenuOpen ? (
								<X className='block h-6 w-6' />
							) : (
								<Menu className='block h-6 w-6' />
							)}
						</button>
					</div>

					{/* Desktop profile menu */}
					<div className='hidden md:flex md:items-center md:mr-6'>
						{user ? (
							<div className='flex items-center space-x-4'>
								<Link
									to={user.role === "Teacher" ? "/assistant" : "/dashboard"}
									className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-900'>
									<User className='h-5 w-5 ml-1' />
									{user.role === "Teacher" ? "المعلم" : "الطالب"}
								</Link>
								<button
									onClick={handleLogout}
									className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-900'>
									<LogOut className='h-5 w-5 ml-1' />
									تسجيل الخروج
								</button>
							</div>
						) : (
							<Link
								to='/auth'
								className='text-sm font-medium text-teal-600 hover:text-teal-700'>
								تسجيل الدخول
							</Link>
						)}
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className='md:hidden'>
					<div className='pt-2 pb-3 space-y-1'>
						{navLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className={`block px-3 py-2 rounded-md text-base font-medium ${
									location.pathname === link.path
										? "bg-teal-50 text-teal-700"
										: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
								}`}
								onClick={() => setIsMenuOpen(false)}>
								{link.name}
							</Link>
						))}
					</div>
					{user && (
						<div className='pt-4 pb-3 border-t border-gray-200'>
							<div className='flex items-center px-4'>
								<div className='flex-shrink-0'>
									<User className='h-10 w-10 text-gray-400' />
								</div>
								<div className='mr-3'>
									<div className='text-base font-medium text-gray-800'>
										{user.role === "Teacher" ? "المعلم" : "الطالب"}
									</div>
									<div className='text-sm font-medium text-gray-500'>
										{user.role === "Teacher" ? "معلم" : "طالب"}
									</div>
								</div>
							</div>
							<div className='mt-3 space-y-1'>
								<button
									onClick={handleLogout}
									className='block w-full text-right px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'>
									تسجيل الخروج
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
