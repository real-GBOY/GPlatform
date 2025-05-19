/** @format */

import { Review } from "../types/course";
import PaymentService from "./PaymentService";

interface Course {
	id: string;
	title: string;
	description: string;
	price: number;
	instructor: string;
	duration: string;
	level: "beginner" | "intermediate" | "advanced";
	category: string;
	rating: number;
	enrolledStudents: number;
	imageUrl: string;
}

class CourseService {
	private static instance: CourseService;
	private courses: Map<string, Course> = new Map();
	private reviews: Map<string, Review[]> = new Map();
	private enrolledCourses: Map<string, Set<string>> = new Map(); // userId -> Set of courseIds

	private constructor() {
		// Initialize with some mock data
		this.initializeMockData();
	}

	static getInstance(): CourseService {
		if (!CourseService.instance) {
			CourseService.instance = new CourseService();
		}
		return CourseService.instance;
	}

	private initializeMockData() {
		const mockCourses: Course[] = [
			{
				id: "course-1",
				title: "Introduction to Programming",
				description:
					"Learn the basics of programming with this comprehensive course.",
				price: 49.99,
				instructor: "John Doe",
				duration: "8 weeks",
				level: "beginner",
				category: "Programming",
				rating: 4.5,
				enrolledStudents: 1200,
				imageUrl: "/images/course-1.jpg",
			},
			// Add more mock courses as needed
		];

		mockCourses.forEach((course) => {
			this.courses.set(course.id, course);
			this.reviews.set(course.id, []);
		});
	}

	async getCourse(courseId: string): Promise<Course | undefined> {
		return this.courses.get(courseId);
	}

	async getAllCourses(): Promise<Course[]> {
		return Array.from(this.courses.values());
	}

	async getEnrolledCourses(userId: string): Promise<Course[]> {
		const enrolledCourseIds = this.enrolledCourses.get(userId) || new Set();
		return Array.from(enrolledCourseIds)
			.map((courseId) => this.courses.get(courseId))
			.filter((course): course is Course => course !== undefined);
	}

	async purchaseCourse(userId: string, courseId: string): Promise<boolean> {
		const course = await this.getCourse(courseId);
		if (!course) return false;

		try {
			const paymentService = PaymentService.getInstance();
			await paymentService.processPayment(
				course.price,
				"credit_card", // Default payment method
				`Purchase of course: ${course.title}`
			);

			// Add course to user's enrolled courses
			const userCourses = this.enrolledCourses.get(userId) || new Set();
			userCourses.add(courseId);
			this.enrolledCourses.set(userId, userCourses);

			return true;
		} catch (error) {
			console.error("Failed to purchase course:", error);
			return false;
		}
	}

	async addReview(review: Omit<Review, "id" | "createdAt">): Promise<Review> {
		const courseReviews = this.reviews.get(review.courseId) || [];
		const newReview: Review = {
			...review,
			id: `review-${Date.now()}`,
			createdAt: new Date().toISOString(),
		};

		courseReviews.push(newReview);
		this.reviews.set(review.courseId, courseReviews);

		// Update course rating
		const course = await this.getCourse(review.courseId);
		if (course) {
			const averageRating =
				courseReviews.reduce((acc, r) => acc + r.rating, 0) /
				courseReviews.length;
			course.rating = averageRating;
			this.courses.set(review.courseId, course);
		}

		return newReview;
	}

	async getCourseReviews(courseId: string): Promise<Review[]> {
		return this.reviews.get(courseId) || [];
	}

	async isEnrolled(userId: string, courseId: string): Promise<boolean> {
		const userCourses = this.enrolledCourses.get(userId);
		return userCourses ? userCourses.has(courseId) : false;
	}

	async searchCourses(query: string): Promise<Course[]> {
		const searchTerm = query.toLowerCase();
		return Array.from(this.courses.values()).filter(
			(course) =>
				course.title.toLowerCase().includes(searchTerm) ||
				course.description.toLowerCase().includes(searchTerm) ||
				course.category.toLowerCase().includes(searchTerm)
		);
	}

	async getCoursesByCategory(category: string): Promise<Course[]> {
		return Array.from(this.courses.values()).filter(
			(course) => course.category.toLowerCase() === category.toLowerCase()
		);
	}

	async getCoursesByLevel(level: Course["level"]): Promise<Course[]> {
		return Array.from(this.courses.values()).filter(
			(course) => course.level === level
		);
	}
}

export default CourseService;
