/** @format */

export type PaymentMethod = "credit_card" | "paypal" | "bank_transfer";

export interface PaymentDetails {
	id: string;
	amount: number;
	currency: string;
	status: "pending" | "completed" | "failed";
	method: PaymentMethod;
	timestamp: string;
	description: string;
}

export interface SubscriptionPlan {
	id: string;
	name: string;
	price: number;
	currency: string;
	interval: "monthly" | "yearly";
	features: string[];
	discount?: number;
}

export interface Subscription {
	id: string;
	userId: string;
	planId: string;
	status: "active" | "cancelled" | "expired";
	startDate: string;
	endDate: string;
	autoRenew: boolean;
	paymentMethod: PaymentMethod;
}

export interface Discount {
	id: string;
	code: string;
	type: "percentage" | "fixed";
	value: number;
	validUntil: string;
	minPurchase?: number;
	maxUses?: number;
	currentUses: number;
}
