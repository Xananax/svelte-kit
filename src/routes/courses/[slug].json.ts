import { slugFromPath } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, query }) => {
  if (params.slug == 'all') {
    return getAll({ query });
  }
  const modules = import.meta.glob(`./*.{md,svx,svelte.md}`);

  const match = Object.entries(modules).find(([path]) => slugFromPath(path) === params.slug);

  if (!match) {
    return {
      status: 404
    };
  }

  const [, resolver] = match;

  const post = await resolver();

  return {
    body: post.metadata
  };
};

const getAll = async ({ query }) => {
  const modules = import.meta.glob(`./*.{md,svx,svelte.md}`);

  const limit = Number(query.get('limit') ?? Infinity);

  if (Number.isNaN(limit)) {
    return {
      status: 400
    };
  }

  const posts = await Promise.all(
    Object.entries(modules).map(([path, resolver]) => {
      const slug = slugFromPath(path);
      return resolver().then((post) => ({
        slug,
        ...post.metadata
      }));
    })
  );

  const publishedPosts = posts.filter((post) => post.published).slice(0, limit);

  publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return {
    body: publishedPosts.slice(0, limit)
  };
};
