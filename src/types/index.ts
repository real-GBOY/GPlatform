export type UserRole = 'teacher' | 'assistant' | 'student';

export type LessonStatus = 'draft' | 'published' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content?: string;
  status: LessonStatus;
  authorId: string;
  authorName?: string;
  thumbnail?: string;
  duration?: string;
  createdAt: string;
  updatedAt?: string;
}

export type NewLesson = Omit<Lesson, 'id' | 'status' | 'authorId' | 'authorName' | 'createdAt' | 'updatedAt'>;