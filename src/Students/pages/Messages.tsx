/** @format */

import React from "react";
import { Search, Send, MoreVertical } from "lucide-react";

const Messages = () => {
	const conversations = [
		{
			id: 1,
			name: "أحمد محمد",
			role: "مدرب البرمجة",
			lastMessage: "مرحباً، كيف يمكنني مساعدتك في مشروعك؟",
			time: "10:30",
			unread: true,
			avatar: "https://via.placeholder.com/40",
		},
		{
			id: 2,
			name: "سارة أحمد",
			role: "مدربة تطوير الويب",
			lastMessage: "تم مراجعة مشروعك، أداء جيد!",
			time: "أمس",
			unread: false,
			avatar: "https://via.placeholder.com/40",
		},
		{
			id: 3,
			name: "محمد علي",
			role: "مدرب قواعد البيانات",
			lastMessage: "هل تحتاج إلى مساعدة في SQL؟",
			time: "الاثنين",
			unread: false,
			avatar: "https://via.placeholder.com/40",
		},
	];

	return (
		<div className='p-6' dir='rtl'>
			<h1 className='text-2xl font-bold mb-6'>الرسائل</h1>
			<div className='bg-white rounded-lg shadow-md'>
				<div className='p-4 border-b border-gray-200'>
					<div className='relative'>
						<Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
						<input
							type='text'
							placeholder='البحث في الرسائل...'
							className='w-full pr-10 pl-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
						/>
					</div>
				</div>
				<div className='divide-y divide-gray-200'>
					{conversations.map((conversation) => (
						<div
							key={conversation.id}
							className={`p-4 hover:bg-gray-50 cursor-pointer ${
								conversation.unread ? "bg-teal-50" : ""
							}`}>
							<div className='flex items-start gap-4'>
								<img
									src={conversation.avatar}
									alt={conversation.name}
									className='w-12 h-12 rounded-full'
								/>
								<div className='flex-1 min-w-0'>
									<div className='flex justify-between items-start'>
										<div>
											<h3 className='text-sm font-medium text-gray-900'>
												{conversation.name}
											</h3>
											<p className='text-sm text-gray-500'>
												{conversation.role}
											</p>
										</div>
										<div className='flex items-center gap-2'>
											<span className='text-xs text-gray-500'>
												{conversation.time}
											</span>
											<button className='p-1 hover:bg-gray-100 rounded-full'>
												<MoreVertical className='h-4 w-4 text-gray-500' />
											</button>
										</div>
									</div>
									<p
										className={`mt-1 text-sm ${
											conversation.unread
												? "text-gray-900 font-medium"
												: "text-gray-500"
										}`}>
										{conversation.lastMessage}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='p-4 border-t border-gray-200'>
					<div className='flex gap-2'>
						<input
							type='text'
							placeholder='اكتب رسالة...'
							className='flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
						/>
						<button className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center gap-2'>
							<Send className='h-4 w-4' />
							<span>إرسال</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Messages;
