import { process } from '$lib/mdsvex';
import type { RequestHandler } from '@sveltejs/kit';
import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

export const file = join('content', 'courses');

export const get: RequestHandler<PostLocals> = ({ params }) => {
	const { slug } = params;
	if (slug == 'all') {
		const body = JSON.stringify(loadAll());
		return { body };
	} else {
		const response = loadFileIfValid(slug);
		if (response) {
			const { metadata, content } = response;
			const body = JSON.stringify({ slug, metadata, content });
			return {
				body
			};
		}
	}
};

const loadFileIfValid = (slug: string) => {
	const path = join(file, slug);
	const indexFile = join(path, 'index.md');
	if (statSync(path).isDirectory() && existsSync(indexFile)) {
		process(path);
		return { slug: 'a', metadata: { title: 'a' }, content: 'dddddd' };
		/*
		const { slug, metadata, content } = process(path);
		return {
			metadata,
			content,
			slug
		};
		*/
	}
	return null;
};

export const loadAll = () =>
	readdirSync(file)
		.reduce((prev, curr) => {
			const results = loadFileIfValid(curr);
			if (results) {
				prev.push(results);
			}
			return prev;
		}, [] as ReturnType<typeof loadFileIfValid>[])
		.sort(({ metadata: { date_unix: a } }, { metadata: { date_unix: b } }) => a - b);
