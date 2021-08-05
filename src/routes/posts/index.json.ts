import { process } from '$lib/markdown';
import type { RequestHandler } from '@sveltejs/kit';
import { readdirSync } from 'fs';
import { file } from './consts';
import { join } from 'path';

const fileIsValid = (fileName: string) => /.+\.md$/.test(fileName);

const loadFile = (fileName: string) => {
	const { slug, metadata } = process(join(...file, fileName));
	return {
		metadata,
		slug
	};
};

export const get: RequestHandler<void> = () => {
	const posts = readdirSync(join(...file))
		.filter(fileIsValid)
		.map(loadFile)
		.sort(({ metadata: { date_unix: a } }, { metadata: { date_unix: b } }) => a - b);

	const body = JSON.stringify(posts);

	return { body };
};
