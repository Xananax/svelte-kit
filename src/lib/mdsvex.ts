import { preprocess, compile } from 'svelte/compiler';
import { readFileSync } from 'fs';
import { join } from 'path';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config';

export const process = async (path: string) => {
  const filename = join(path, 'index.md');
  const source = readFileSync(filename, { encoding: 'utf-8' });

  console.log({ source });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const preprocessed = await preprocess(source, mdsvex(mdsvexConfig as any), { filename });

  console.log({ preprocessed });
  const compiled = compile(preprocessed.code, {});
  console.log({ compiled });
  return {};
};
