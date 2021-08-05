import { base } from '$app/paths';

export const url = [base, `posts`].join('/');

export const file = ['content', 'posts'];

export const getURL = async (fetch: Fetch, slug = '') => {
	const path = slug ? `${url}/${slug}.json` : `${url}.json`;
	const response = await fetch(path);
	const json = await response.json();
	return json;
};
