/** @format */

import React, { useState } from "react";
import { Star } from "lucide-react";

interface Review {
	id: string;
	userId: string;
	courseId: string;
	rating: number;
	comment: string;
	createdAt: string;
	userName: string;
}

interface CourseReviewProps {
	courseId: string;
	onReviewSubmit: (review: Omit<Review, "id" | "createdAt">) => void;
	reviews: Review[];
}

const CourseReview: React.FC<CourseReviewProps> = ({
	courseId,
	onReviewSubmit,
	reviews,
}) => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [hoveredRating, setHoveredRating] = useState(0);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (rating === 0) return;

		onReviewSubmit({
			userId: "current-user-id", // Replace with actual user ID
			courseId,
			rating,
			comment,
			userName: "Current User", // Replace with actual user name
		});

		setRating(0);
		setComment("");
	};

	const averageRating =
		reviews.length > 0
			? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
			: 0;

	return (
		<div className='space-y-8'>
			<div className='bg-white shadow sm:rounded-lg'>
				<div className='px-4 py-5 sm:p-6'>
					<h3 className='text-lg font-medium leading-6 text-gray-900'>
						Course Reviews
					</h3>

					<div className='mt-4 flex items-center'>
						<div className='flex items-center'>
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className={`h-6 w-6 ${
										star <= averageRating
											? "text-yellow-400 fill-current"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className='ml-2 text-sm text-gray-500'>
							({reviews.length} reviews)
						</span>
					</div>

					<form onSubmit={handleSubmit} className='mt-6 space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Your Rating
							</label>
							<div className='mt-1 flex items-center'>
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										type='button'
										onMouseEnter={() => setHoveredRating(star)}
										onMouseLeave={() => setHoveredRating(0)}
										onClick={() => setRating(star)}
										className='focus:outline-none'>
										<Star
											className={`h-8 w-8 ${
												star <= (hoveredRating || rating)
													? "text-yellow-400 fill-current"
													: "text-gray-300"
											}`}
										/>
									</button>
								))}
							</div>
						</div>

						<div>
							<label
								htmlFor='comment'
								className='block text-sm font-medium text-gray-700'>
								Your Review
							</label>
							<textarea
								id='comment'
								rows={4}
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
								placeholder='Share your experience with this course...'
							/>
						</div>

						<button
							type='submit'
							disabled={rating === 0}
							className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400'>
							Submit Review
						</button>
					</form>
				</div>
			</div>

			<div className='space-y-6'>
				{reviews.map((review) => (
					<div key={review.id} className='bg-white shadow sm:rounded-lg'>
						<div className='px-4 py-5 sm:p-6'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center'>
									<div className='flex items-center'>
										{[1, 2, 3, 4, 5].map((star) => (
											<Star
												key={star}
												className={`h-5 w-5 ${
													star <= review.rating
														? "text-yellow-400 fill-current"
														: "text-gray-300"
												}`}
											/>
										))}
									</div>
									<span className='ml-2 text-sm text-gray-500'>
										{review.userName}
									</span>
								</div>
								<span className='text-sm text-gray-500'>
									{new Date(review.createdAt).toLocaleDateString()}
								</span>
							</div>
							<p className='mt-2 text-sm text-gray-700'>{review.comment}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CourseReview;
