import { process } from '$lib/markdown';
import fs from 'fs';
import dayjs from 'dayjs';

const path = `src/posts`;

export function get() {
	let posts = fs
		.readdirSync(path)
		.filter((fileName) => /.+\.md$/.test(fileName))
		.map((fileName) => {
			const { metadata } = process(`src/posts/${fileName}`);
			return {
				metadata,
				slug: fileName.slice(0, -3)
			};
		});
	let body = JSON.stringify(posts);

	return { body };
}
