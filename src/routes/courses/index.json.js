import { process } from '$lib/markdown';
import { join } from 'path';
import { readdirSync, statSync, existsSync } from 'fs';
//import dayjs from 'dayjs';

const directory = __dirname;

const getEntryDir = (/** @type {string} */ fileName) => join(directory, fileName);
const getEntryFile = (/** @type {string} */ fileName) => join(getEntryDir(fileName), 'index.md');
const isValid = (fileName) =>
	statSync(getEntryDir(fileName)).isDirectory() && existsSync(getEntryFile(fileName));

export const get = () => {
	const posts = readdirSync(directory)
		.filter(isValid)
		.map((fileName) => {
			const file = process(getEntryFile(fileName));
			return file;
			/*
			const date = dayjs(metadata.date, 'MMM D, YYYY');
			const dateUnix = date.unix();
			return {
				metadata,
				dateUnix,
				slug: fileName.slice(0, -3)
			};
			*/
		});
	//.sort(({ dateUnix: a }, { dateUnix: b }) => a - b);

	const body = JSON.stringify({ page: 0, posts });

	return {
		body
	};
};
