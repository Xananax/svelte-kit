interface CourseMetadata {
	date: string;
	date_unix: number;
	title: string;
	excerpt: string;
}

interface Course {
	slug: string;
	content: string;
	metadata: Metadata;
}

interface CourseLocals<T = string> extends Record<string, T> {
	slug: string;
}
