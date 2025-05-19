/** @format */

import {
	PaymentDetails,
	PaymentMethod,
	SubscriptionPlan,
	Subscription,
	Discount,
} from "../types/payment";

// Mock subscription plans
export const subscriptionPlans: SubscriptionPlan[] = [
	{
		id: "basic",
		name: "Basic Plan",
		price: 29.99,
		currency: "USD",
		interval: "monthly",
		features: [
			"Access to basic courses",
			"Community forum access",
			"Basic support",
			"Monthly progress reports",
		],
	},
	{
		id: "pro",
		name: "Pro Plan",
		price: 49.99,
		currency: "USD",
		interval: "monthly",
		features: [
			"All Basic features",
			"Access to all courses",
			"Priority support",
			"Live sessions",
			"Certificate generation",
			"Advanced analytics",
		],
	},
	{
		id: "enterprise",
		name: "Enterprise Plan",
		price: 99.99,
		currency: "USD",
		interval: "monthly",
		features: [
			"All Pro features",
			"Custom course creation",
			"Dedicated support",
			"Team management",
			"API access",
			"Custom integrations",
		],
	},
];

// Mock discounts
export const availableDiscounts: Discount[] = [
	{
		id: "WELCOME20",
		code: "WELCOME20",
		type: "percentage",
		value: 20,
		validUntil: "2024-12-31",
		maxUses: 1000,
		currentUses: 0,
	},
	{
		id: "SUMMER50",
		code: "SUMMER50",
		type: "percentage",
		value: 50,
		validUntil: "2024-08-31",
		minPurchase: 100,
		maxUses: 500,
		currentUses: 0,
	},
];

class PaymentService {
	private static instance: PaymentService;
	private subscriptions: Map<string, Subscription> = new Map();
	private payments: Map<string, PaymentDetails> = new Map();

	private constructor() {}

	static getInstance(): PaymentService {
		if (!PaymentService.instance) {
			PaymentService.instance = new PaymentService();
		}
		return PaymentService.instance;
	}

	async processPayment(
		amount: number,
		method: PaymentMethod,
		description: string
	): Promise<PaymentDetails> {
		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const payment: PaymentDetails = {
			id: `PAY-${Date.now()}`,
			amount,
			currency: "USD",
			status: "completed",
			method,
			timestamp: new Date().toISOString(),
			description,
		};

		this.payments.set(payment.id, payment);
		return payment;
	}

	async createSubscription(
		userId: string,
		planId: string,
		paymentMethod: PaymentMethod
	): Promise<Subscription> {
		const plan = subscriptionPlans.find((p) => p.id === planId);
		if (!plan) {
			throw new Error("Invalid plan selected");
		}

		const subscription: Subscription = {
			id: `SUB-${Date.now()}`,
			userId,
			planId,
			status: "active",
			startDate: new Date().toISOString(),
			endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
			autoRenew: true,
			paymentMethod,
		};

		this.subscriptions.set(subscription.id, subscription);
		return subscription;
	}

	async cancelSubscription(subscriptionId: string): Promise<Subscription> {
		const subscription = this.subscriptions.get(subscriptionId);
		if (!subscription) {
			throw new Error("Subscription not found");
		}

		subscription.status = "cancelled";
		subscription.autoRenew = false;
		this.subscriptions.set(subscriptionId, subscription);
		return subscription;
	}

	async applyDiscount(code: string, amount: number): Promise<number> {
		const discount = availableDiscounts.find((d) => d.code === code);
		if (!discount) {
			throw new Error("Invalid discount code");
		}

		if (discount.validUntil && new Date(discount.validUntil) < new Date()) {
			throw new Error("Discount code has expired");
		}

		if (discount.minPurchase && amount < discount.minPurchase) {
			throw new Error(
				`Minimum purchase amount of ${discount.minPurchase} required`
			);
		}

		if (discount.maxUses && discount.currentUses >= discount.maxUses) {
			throw new Error("Discount code has reached maximum uses");
		}

		let discountedAmount = amount;
		if (discount.type === "percentage") {
			discountedAmount = amount * (1 - discount.value / 100);
		} else {
			discountedAmount = amount - discount.value;
		}

		discount.currentUses++;
		return Math.max(0, discountedAmount);
	}

	getSubscriptionPlans(): SubscriptionPlan[] {
		return subscriptionPlans;
	}

	getAvailableDiscounts(): Discount[] {
		return availableDiscounts;
	}

	getSubscription(subscriptionId: string): Subscription | undefined {
		return this.subscriptions.get(subscriptionId);
	}

	getPayment(paymentId: string): PaymentDetails | undefined {
		return this.payments.get(paymentId);
	}
}

export default PaymentService;
