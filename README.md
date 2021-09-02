# GDQuest

A test build of GDQuest's site with Svelte-Kit

Uses pug for templating, typescript for logic, stylus for styling.

Has scripts to auto-deploy to Github

## How-to:

1. copy `.env.development.example` to `.env.development.local` and fill in the values. Optionally/alternatively, also create `.env.production.local` if you intend to deploy from this machine
2. Run `npm install` (Recommendation: install [pnpm](https://pnpm.io/) and use `pnpm install`)
3. Run `npm run dev` for the dev site; or `npm run build` to build the production site

If you're using VSCode, <kbd>F5</kbd> will run the dev site and open firefox

## Todo

- [x] implement some form of authentication (how would it work with gh-pages?)
- [x] protect a page behind authentication
- [x] make reference links auto-work
- [x] global components
- [x] social media icons
- [ ] implement some styles
- [ ] write the README (explanation for collaborators)
- [ ] implement a payment provider
- [ ] Add a sidebar in course layout, as well as next/previous in course chapters
- [ ] Make an authors database (and link author field in articles)
- [ ] do some SEO basics (meta tags and such)
- [ ] multilanguage (file.[lng].md)
- [ ] search functionality
- [ ] make `state` login unique to prevent session hijacking
- [ ] implement other authentication providers

https://github.com/Introvertuous-Fun/svelte-icons
https://svelte-icons-explorer.vercel.app/


How to pass classes to child components? Look into social media icons

noreferrer noopener nofollow

## References:

https://github.com/sveltejs/realworld