import { process } from '$lib/markdown';
import type { RequestHandler } from '@sveltejs/kit';
import { readdirSync } from 'fs';
import { join } from 'path';

export const file = join('content', 'posts');

export const get: RequestHandler<PostLocals> = ({ params }) => {
  const { slug } = params;
  if (slug == 'all') {
    const body = JSON.stringify(loadAll());
    return { body };
  } else {
    const { metadata, content } = process(join(file, slug + `.md`));
    const body = JSON.stringify({ metadata, content });

    return {
      body
    };
  }
};

const fileIsValid = (fileName: string) => /.+\.md$/.test(fileName);

const loadFile = (fileName: string) => {
  const { slug, metadata } = process(join(file, fileName));
  return {
    metadata,
    slug
  };
};

export const loadAll = () =>
  readdirSync(file)
    .filter(fileIsValid)
    .map(loadFile)
    .sort(({ metadata: { date_unix: a } }, { metadata: { date_unix: b } }) => a - b);
