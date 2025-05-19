/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentService, { subscriptionPlans } from "../services/PaymentService";
import { PaymentMethod } from "../types/payment";

const Pricing: React.FC = () => {
	const navigate = useNavigate();
	const [selectedPlan, setSelectedPlan] = useState<string>("");
	const [paymentMethod, setPaymentMethod] =
		useState<PaymentMethod>("credit_card");
	const [discountCode, setDiscountCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);

	const handlePlanSelect = (planId: string) => {
		setSelectedPlan(planId);
		setDiscountedPrice(null);
	};

	const handleDiscountApply = async () => {
		if (!selectedPlan || !discountCode) return;

		const plan = subscriptionPlans.find((p) => p.id === selectedPlan);
		if (!plan) return;

		try {
			setLoading(true);
			setError(null);
			const paymentService = PaymentService.getInstance();
			const discountedAmount = await paymentService.applyDiscount(
				discountCode,
				plan.price
			);
			setDiscountedPrice(discountedAmount);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to apply discount");
		} finally {
			setLoading(false);
		}
	};

	const handleSubscribe = async () => {
		if (!selectedPlan) return;

		try {
			setLoading(true);
			setError(null);
			const paymentService = PaymentService.getInstance();

			// Process payment
			const plan = subscriptionPlans.find((p) => p.id === selectedPlan);
			if (!plan) throw new Error("Invalid plan selected");

			const amount = discountedPrice || plan.price;
			await paymentService.processPayment(
				amount,
				paymentMethod,
				`Subscription to ${plan.name}`
			);

			// Create subscription
			const subscription = await paymentService.createSubscription(
				"current-user-id", // Replace with actual user ID
				selectedPlan,
				paymentMethod
			);

			navigate("/dashboard", { state: { subscription } });
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to process subscription"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center'>
					<h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
						Choose Your Plan
					</h2>
					<p className='mt-4 text-lg text-gray-600'>
						Select the perfect plan for your learning journey
					</p>
				</div>

				{error && (
					<div className='mt-4 max-w-md mx-auto'>
						<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
							{error}
						</div>
					</div>
				)}

				<div className='mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3'>
					{subscriptionPlans.map((plan) => (
						<div
							key={plan.id}
							className={`border rounded-lg shadow-sm divide-y divide-gray-200 ${
								selectedPlan === plan.id
									? "border-blue-500 ring-2 ring-blue-500"
									: ""
							}`}>
							<div className='p-6'>
								<h3 className='text-lg font-medium text-gray-900'>
									{plan.name}
								</h3>
								<p className='mt-4'>
									<span className='text-4xl font-extrabold text-gray-900'>
										${plan.price}
									</span>
									<span className='text-base font-medium text-gray-500'>
										/month
									</span>
								</p>
								<button
									onClick={() => handlePlanSelect(plan.id)}
									className={`mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700 ${
										selectedPlan === plan.id ? "bg-blue-700" : ""
									}`}>
									{selectedPlan === plan.id ? "Selected" : "Select Plan"}
								</button>
							</div>
							<div className='pt-6 pb-8 px-6'>
								<h4 className='text-sm font-medium text-gray-900 tracking-wide uppercase'>
									What's included
								</h4>
								<ul className='mt-6 space-y-4'>
									{plan.features.map((feature) => (
										<li key={feature} className='flex space-x-3'>
											<svg
												className='flex-shrink-0 h-5 w-5 text-green-500'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
													clipRule='evenodd'
												/>
											</svg>
											<span className='text-sm text-gray-500'>{feature}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				{selectedPlan && (
					<div className='mt-8 max-w-md mx-auto'>
						<div className='bg-white shadow sm:rounded-lg'>
							<div className='px-4 py-5 sm:p-6'>
								<h3 className='text-lg leading-6 font-medium text-gray-900'>
									Complete Your Subscription
								</h3>
								<div className='mt-5'>
									<div className='space-y-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700'>
												Payment Method
											</label>
											<select
												value={paymentMethod}
												onChange={(e) =>
													setPaymentMethod(e.target.value as PaymentMethod)
												}
												className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'>
												<option value='credit_card'>Credit Card</option>
												<option value='paypal'>PayPal</option>
												<option value='bank_transfer'>Bank Transfer</option>
											</select>
										</div>

										<div>
											<label className='block text-sm font-medium text-gray-700'>
												Discount Code
											</label>
											<div className='mt-1 flex rounded-md shadow-sm'>
												<input
													type='text'
													value={discountCode}
													onChange={(e) => setDiscountCode(e.target.value)}
													className='focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300'
													placeholder='Enter discount code'
												/>
												<button
													onClick={handleDiscountApply}
													disabled={loading}
													className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
													Apply
												</button>
											</div>
										</div>

										{discountedPrice && (
											<div className='text-sm text-gray-500'>
												Discounted price: ${discountedPrice.toFixed(2)}
											</div>
										)}

										<button
											onClick={handleSubscribe}
											disabled={loading}
											className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
											{loading ? "Processing..." : "Subscribe Now"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Pricing;
