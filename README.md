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
1 - [ ] make reference links auto-work
2 - [ ] global components
3 - [ ] implement some styles
4 - [ ] write the README (explanation for collaborators)
5 - [ ] implement a payment provider
6 - [ ] Add a sidebar in course layout, as well as next/previous in course chapters
7 - [ ] Make an authors database (and link author field in articles)
8 - [ ] do some SEO basics (meta tags and such)
9 - [ ] multilanguage (file.[lng].md)
10 - [ ] make `state` login unique to prevent session hijacking
11 - [ ] implement other authentication providers

## References:

https://github.com/sveltejs/realworld