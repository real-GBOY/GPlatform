/** @format */

import { useState } from "react";
import { motion } from "framer-motion";
import {
	Bell,
	Lock,
	Globe,
	Moon,
	Sun,
	User,
	Mail,
	Key,
	Save,
	AlertCircle,
} from "lucide-react";
import { useAuth } from "../../services/AuthContext";

const Settings = () => {
	const { user } = useAuth();
	const [isSaving, setIsSaving] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	// Profile Settings
	const [profileSettings, setProfileSettings] = useState({
		name: "أحمد محمد",
		email: "ahmed@email.com",
		phone: "01012345678",
		password: "",
		newPassword: "",
		confirmPassword: "",
	});

	// Notification Settings
	const [notificationSettings, setNotificationSettings] = useState({
		emailNotifications: true,
		appNotifications: true,
		sessionReminders: false,
		assignmentReminders: true,
		newsletter: false,
	});

	// Privacy Settings
	const [privacySettings, setPrivacySettings] = useState({
		shareProgress: true,
		publicProfile: false,
		twoFactorAuth: false,
		showEmail: false,
		showPhone: false,
	});

	// Language and Theme Settings
	const [preferenceSettings, setPreferenceSettings] = useState({
		language: "ar",
		timezone: "Asia/Riyadh",
		theme: "light",
	});

	const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProfileSettings({
			...profileSettings,
			[e.target.name]: e.target.value,
		});
	};

	const handleNotificationChange = (setting: string) => {
		setNotificationSettings({
			...notificationSettings,
			[setting]:
				!notificationSettings[setting as keyof typeof notificationSettings],
		});
	};

	const handlePrivacyChange = (setting: string) => {
		setPrivacySettings({
			...privacySettings,
			[setting]: !privacySettings[setting as keyof typeof privacySettings],
		});
	};

	const handlePreferenceChange = (setting: string, value: string) => {
		setPreferenceSettings({
			...preferenceSettings,
			[setting]: value,
		});
	};

	const handleSave = async () => {
		setIsSaving(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 3000);
		} catch (error) {
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
		} finally {
			setIsSaving(false);
		}
	};

	const settings = [
		{
			id: 1,
			title: "الملف الشخصي",
			description: "إدارة معلومات حسابك الشخصية",
			icon: <User className='h-5 w-5 text-blue-500' />,
			content: (
				<div className='space-y-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								الاسم
							</label>
							<input
								type='text'
								name='name'
								value={profileSettings.name}
								onChange={handleProfileChange}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								البريد الإلكتروني
							</label>
							<input
								type='email'
								name='email'
								value={profileSettings.email}
								onChange={handleProfileChange}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								رقم الهاتف
							</label>
							<input
								type='tel'
								name='phone'
								value={profileSettings.phone}
								onChange={handleProfileChange}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
							/>
						</div>
					</div>
					<div className='border-t border-gray-200 pt-4 mt-4'>
						<h3 className='text-lg font-medium text-gray-900 mb-4'>
							تغيير كلمة المرور
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									كلمة المرور الحالية
								</label>
								<input
									type='password'
									name='password'
									value={profileSettings.password}
									onChange={handleProfileChange}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									كلمة المرور الجديدة
								</label>
								<input
									type='password'
									name='newPassword'
									value={profileSettings.newPassword}
									onChange={handleProfileChange}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									تأكيد كلمة المرور الجديدة
								</label>
								<input
									type='password'
									name='confirmPassword'
									value={profileSettings.confirmPassword}
									onChange={handleProfileChange}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
								/>
							</div>
						</div>
					</div>
				</div>
			),
		},
		{
			id: 2,
			title: "الإشعارات",
			description: "إدارة إعدادات الإشعارات والتنبيهات",
			icon: <Bell className='h-5 w-5 text-green-500' />,
			content: (
				<div className='space-y-4'>
					{Object.entries(notificationSettings).map(([key, value]) => (
						<div
							key={key}
							className='flex items-center justify-between py-3 border-b border-gray-100 last:border-0'>
							<span className='text-gray-700'>
								{key === "emailNotifications"
									? "إشعارات البريد الإلكتروني"
									: key === "appNotifications"
									? "إشعارات التطبيق"
									: key === "sessionReminders"
									? "تذكيرات الجلسات"
									: key === "assignmentReminders"
									? "تذكيرات المهام"
									: "النشرة الإخبارية"}
							</span>
							<label className='relative inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									className='sr-only peer'
									checked={value}
									onChange={() => handleNotificationChange(key)}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
							</label>
						</div>
					))}
				</div>
			),
		},
		{
			id: 3,
			title: "الخصوصية",
			description: "إدارة إعدادات الخصوصية والأمان",
			icon: <Lock className='h-5 w-5 text-purple-500' />,
			content: (
				<div className='space-y-4'>
					{Object.entries(privacySettings).map(([key, value]) => (
						<div
							key={key}
							className='flex items-center justify-between py-3 border-b border-gray-100 last:border-0'>
							<span className='text-gray-700'>
								{key === "shareProgress"
									? "مشاركة التقدم"
									: key === "publicProfile"
									? "الملف الشخصي العام"
									: key === "twoFactorAuth"
									? "تسجيل الدخول بخطوتين"
									: key === "showEmail"
									? "إظهار البريد الإلكتروني"
									: "إظهار رقم الهاتف"}
							</span>
							<label className='relative inline-flex items-center cursor-pointer'>
								<input
									type='checkbox'
									className='sr-only peer'
									checked={value}
									onChange={() => handlePrivacyChange(key)}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
							</label>
						</div>
					))}
				</div>
			),
		},
		{
			id: 4,
			title: "التفضيلات",
			description: "إدارة إعدادات اللغة والمظهر",
			icon: <Globe className='h-5 w-5 text-amber-500' />,
			content: (
				<div className='space-y-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							اللغة
						</label>
						<select
							value={preferenceSettings.language}
							onChange={(e) =>
								handlePreferenceChange("language", e.target.value)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'>
							<option value='ar'>العربية</option>
							<option value='en'>English</option>
						</select>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							المنطقة الزمنية
						</label>
						<select
							value={preferenceSettings.timezone}
							onChange={(e) =>
								handlePreferenceChange("timezone", e.target.value)
							}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'>
							<option value='Asia/Riyadh'>توقيت الرياض (GMT+3)</option>
							<option value='Asia/Dubai'>توقيت دبي (GMT+4)</option>
							<option value='Asia/Cairo'>توقيت القاهرة (GMT+2)</option>
						</select>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							المظهر
						</label>
						<div className='flex items-center space-x-4'>
							<button
								onClick={() => handlePreferenceChange("theme", "light")}
								className={`flex items-center px-4 py-2 rounded-md ${
									preferenceSettings.theme === "light"
										? "bg-teal-100 text-teal-700"
										: "bg-gray-100 text-gray-700"
								}`}>
								<Sun className='h-5 w-5 ml-2' />
								فاتح
							</button>
							<button
								onClick={() => handlePreferenceChange("theme", "dark")}
								className={`flex items-center px-4 py-2 rounded-md ${
									preferenceSettings.theme === "dark"
										? "bg-teal-100 text-teal-700"
										: "bg-gray-100 text-gray-700"
								}`}>
								<Moon className='h-5 w-5 ml-2' />
								داكن
							</button>
						</div>
					</div>
				</div>
			),
		},
	];

	return (
		<div className='space-y-6' dir='rtl'>
			{/* Success/Error Messages */}
			{showSuccess && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center'>
					<Save className='h-5 w-5 ml-2' />
					تم حفظ الإعدادات بنجاح
				</motion.div>
			)}
			{showError && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center'>
					<AlertCircle className='h-5 w-5 ml-2' />
					حدث خطأ أثناء حفظ الإعدادات
				</motion.div>
			)}

			{/* Settings Sections */}
			{settings.map((section) => (
				<motion.div
					key={section.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='bg-white rounded-lg shadow-sm p-6'>
					<div className='flex items-start gap-4 mb-6'>
						<div className='p-2 bg-gray-50 rounded-lg'>{section.icon}</div>
						<div>
							<h2 className='text-xl font-semibold mb-1'>{section.title}</h2>
							<p className='text-gray-600'>{section.description}</p>
						</div>
					</div>
					{section.content}
				</motion.div>
			))}

			{/* Save Button */}
			<div className='flex justify-end'>
				<button
					onClick={handleSave}
					disabled={isSaving}
					className='flex items-center px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
					<Save className='h-5 w-5 ml-2' />
					{isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
				</button>
			</div>
		</div>
	);
};

export default Settings;
