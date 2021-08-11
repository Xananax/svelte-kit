import remarkGithub from 'remark-github'
import remarkAbbr from 'remark-abbr'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import md from 'mdsvex'

export const extensions = ['.svelte.md', '.md', '.svx']

export const mdsvex = md.mdsvex({
  extensions,
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [
    [
      remarkGithub,
      {
        // Use your own repository
        repository: 'https://github.com/mvasigh/sveltekit-mdsvex-blog.git'
      }
    ],
    remarkAbbr
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap'
      }
    ]
  ]
})
