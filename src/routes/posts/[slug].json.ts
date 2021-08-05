import { process } from '$lib/markdown';
import type { RequestHandler } from '@sveltejs/kit';
import { file } from './consts';
import { join } from 'path';

export const get: RequestHandler<PostLocals> = ({ params }) => {
	console.log(params);
	const { slug } = params;

	const { metadata, content } = process(join(...file, slug + `.md`));
	const body = JSON.stringify({ metadata, content });

	return {
		body
	};
};
