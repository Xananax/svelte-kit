import type { Load, LoadInput } from '@sveltejs/kit';
import { base } from '$app/paths';

export const url = [base, `courses`].join('/');

const getURL = async (fetch: Fetch, slug: string) => {
	const path = slug ? `${url}/${slug}.json` : `${url}.json`;
	const response = await fetch(path);
	const json = await response.json();
	return json;
};

export const load: Load<LoadInput<PostLocals>> = async ({ page, fetch }) => {
	const slug = page.params.slug;
	const post: Post = await getURL(fetch, slug);
	return {
		props: { post }
	};
};

export const loadAll: Load = async ({ fetch }) => {
	const posts: Post[] = await getURL(fetch, 'all');
	return {
		props: { posts }
	};
};
