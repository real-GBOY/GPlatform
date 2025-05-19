/** @format */

export interface Review {
	id: string;
	userId: string;
	courseId: string;
	rating: number;
	comment: string;
	createdAt: string;
	userName: string;
}

export interface Course {
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

export interface CourseModule {
	id: string;
	courseId: string;
	title: string;
	description: string;
	duration: string;
	order: number;
	content: string;
}

export interface CourseProgress {
	userId: string;
	courseId: string;
	completedModules: string[];
	lastAccessedModule: string;
	progress: number;
	lastAccessedAt: string;
}
