# GDQuest


- [] port one course
- [] make it work on gh-pages
- [] implement some form of authentication
- [] protect a course behind authentication
- [] implement some styles
- [] write the README
- [] do some SEO basics (meta tags and such)
- [] move courses out of `src` (method below)
- [] routing management (route match and such for determining current page)
- [] global components


Essentially it's this for routes/posts/index.svelte
```js
<script context="module">
    export async function load() {
        const md = import.meta.globEager('../../posts/*.md')
        let posts = Object.entries(md).map((posts) => {
            const slug = posts[0].substring(posts[0].lastIndexOf('/') + 1).replace('.md', '')
            const title = posts[1].metadata.title
            return {
                slug,
                posts,
                title
            }
        })
        return {
            props: {
                posts
            }
        }
    }
</script>
```

and this for `routes/posts/[slug].svelte

```js
<script context="module"> 
  export async function load({page}) {
    const Md = (await import(`../../posts/${page.params.slug}.md`))
        return {
            props: {
        Md: Md.default,
            }
        }
    }
</script>
```

you can also pick  `.default` directly, `const md = (await import(...)).default` if you want it a touch simpler