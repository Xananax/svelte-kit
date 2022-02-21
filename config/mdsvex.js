//@ts-check
import remarkAbbr from 'remark-abbr'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import md from 'mdsvex'

export const extensionsMDSvex = ['.svelte.md', '.md', '.svx']

export const mdsvex = md.mdsvex({
  extensions: extensionsMDSvex,
  smartypants: {
    dashes: 'oldschool'
  },
  // @ts-ignore
  remarkPlugins: [remarkAbbr],
  rehypePlugins: [
    // @ts-ignore
    rehypeSlug,
    [
      // @ts-ignore
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap'
      }
    ]
  ]
})
