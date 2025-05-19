/** @format */

import React, { useState, useEffect } from "react";
import PaymentService from "../../services/PaymentService";
import { Subscription, SubscriptionPlan } from "../../types/payment";

const SubscriptionManagement: React.FC = () => {
	const [subscription, setSubscription] = useState<Subscription | null>(null);
	const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadSubscription();
	}, []);

	const loadSubscription = async () => {
		try {
			setLoading(true);
			setError(null);
			const paymentService = PaymentService.getInstance();

			// In a real app, you would get the subscription ID from the user's context
			const subscriptionId = "current-subscription-id";
			const currentSubscription =
				paymentService.getSubscription(subscriptionId);

			if (currentSubscription) {
				setSubscription(currentSubscription);
				const currentPlan = paymentService
					.getSubscriptionPlans()
					.find((p) => p.id === currentSubscription.planId);
				setPlan(currentPlan || null);
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to load subscription"
			);
		} finally {
			setLoading(false);
		}
	};

	const handleCancelSubscription = async () => {
		if (!subscription) return;

		try {
			setLoading(true);
			setError(null);
			const paymentService = PaymentService.getInstance();
			const updatedSubscription = await paymentService.cancelSubscription(
				subscription.id
			);
			setSubscription(updatedSubscription);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to cancel subscription"
			);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center h-64'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
				{error}
			</div>
		);
	}

	if (!subscription || !plan) {
		return (
			<div className='text-center py-12'>
				<h3 className='text-lg font-medium text-gray-900'>
					No Active Subscription
				</h3>
				<p className='mt-2 text-sm text-gray-500'>
					You don't have an active subscription. Subscribe to a plan to access
					premium features.
				</p>
				<div className='mt-6'>
					<a
						href='/pricing'
						className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>
						View Plans
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white shadow sm:rounded-lg'>
			<div className='px-4 py-5 sm:p-6'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>
					Subscription Details
				</h3>
				<div className='mt-5'>
					<dl className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
						<div className='px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6'>
							<dt className='text-sm font-medium text-gray-500 truncate'>
								Plan
							</dt>
							<dd className='mt-1 text-3xl font-semibold text-gray-900'>
								{plan.name}
							</dd>
						</div>
						<div className='px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6'>
							<dt className='text-sm font-medium text-gray-500 truncate'>
								Status
							</dt>
							<dd className='mt-1 text-3xl font-semibold text-gray-900'>
								{subscription.status.charAt(0).toUpperCase() +
									subscription.status.slice(1)}
							</dd>
						</div>
						<div className='px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6'>
							<dt className='text-sm font-medium text-gray-500 truncate'>
								Start Date
							</dt>
							<dd className='mt-1 text-3xl font-semibold text-gray-900'>
								{new Date(subscription.startDate).toLocaleDateString()}
							</dd>
						</div>
						<div className='px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6'>
							<dt className='text-sm font-medium text-gray-500 truncate'>
								Next Billing Date
							</dt>
							<dd className='mt-1 text-3xl font-semibold text-gray-900'>
								{new Date(subscription.endDate).toLocaleDateString()}
							</dd>
						</div>
					</dl>
				</div>

				<div className='mt-6'>
					<h4 className='text-sm font-medium text-gray-900'>
						Included Features
					</h4>
					<ul className='mt-4 space-y-4'>
						{plan.features.map((feature) => (
							<li key={feature} className='flex items-start'>
								<div className='flex-shrink-0'>
									<svg
										className='h-6 w-6 text-green-400'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
								</div>
								<p className='ml-3 text-sm text-gray-700'>{feature}</p>
							</li>
						))}
					</ul>
				</div>

				{subscription.status === "active" && (
					<div className='mt-6'>
						<button
							onClick={handleCancelSubscription}
							disabled={loading}
							className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
							{loading ? "Processing..." : "Cancel Subscription"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default SubscriptionManagement;
