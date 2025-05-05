/** @format */

export interface Course {
	id: number;
	title: string;
	description: string;
	image: string;
	price: number;
	duration: string;
	students: number;
}

export const allCourses: Course[] = [
	{
		id: 1,
		title: "React for Beginners",
		description:
			"Learn the basics of React, a popular JavaScript library for building UIs.",
		image:
			"https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
		price: 29.99,
		duration: "10 hours",
		students: 1250,
	},
	{
		id: 2,
		title: "Advanced React",
		description:
			"Take your React skills to the next level with hooks, context, and more.",
		image:
			"https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
		price: 49.99,
		duration: "15 hours",
		students: 850,
	},
	{
		id: 3,
		title: "JavaScript Essentials",
		description: "Master core JavaScript concepts and modern ES6+ features.",
		image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
		price: 19.99,
		duration: "8 hours",
		students: 2100,
	},
	{
		id: 4,
		title: "Full-Stack Development",
		description:
			"Learn both frontend and backend development to build complete apps.",
		image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
		price: 59.99,
		duration: "30 hours",
		students: 750,
	},
];
