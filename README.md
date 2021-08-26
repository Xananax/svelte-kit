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
- [ ] make reference links work
- [ ] Add a sidebar in course layout, as well as next/previous in course chapters
- [ ] Make an authors database (and link author field in articles)
- [ ] implement some styles
- [ ] write the README
- [ ] do some SEO basics (meta tags and such)
- [ ] move courses out of `src` (method below)
- [ ] routing management (route match and such for determining current page)
- [ ] global components
- [ ] multilanguage (file.[lng].md)
- [ ] make it work with Gitlab
- [ ] make `state` login unique