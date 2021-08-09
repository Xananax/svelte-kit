import vfile from 'to-vfile';
import unified from 'unified';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import frontmatter from 'remark-frontmatter';
import highlight from 'rehype-highlight';
import { statSync } from 'fs';
import { basename } from 'path';
import yaml from 'js-yaml';
import dayjs from 'dayjs';
import type { Literal, Parent } from 'unist';

const parser = unified().use(parse).use(gfm).use(frontmatter, ['yaml']);

const runner = unified().use(remark2rehype).use(highlight).use(rehypeStringify);

const extractFrontMatter = (tree: Parent<Literal>) => {
  if (tree.children.length > 0 && tree.children[0].type == 'yaml') {
    const frontMatter = yaml.load(tree.children[0].value);
    tree.children = tree.children.slice(1, tree.children.length);
    return frontMatter;
  }
  return null;
};

export function process(filename: string) {
  const tree: Parent<Literal> = parser.parse(vfile.readSync(filename)) as Parent<Literal>;
  const stat = statSync(filename);
  const frontMatter = extractFrontMatter(tree);
  const date = dayjs((frontMatter && frontMatter.date) || stat.mtime);
  const date_unix = date.unix();
  const name = basename(filename);
  const title = (frontMatter && frontMatter.title) || name;
  const slug = name.slice(0, -3);
  const metadata: Metadata = {
    ...frontMatter,
    date: date.format('MMM D, YYYY'),
    date_unix,
    title,
    excerpt: frontMatter.excerpt || ''
  };
  const content = runner.stringify(runner.runSync(tree));
  return { slug, metadata, content };
}
