# GDQuest <!-- omit in toc -->

- [Quick Launch:](#quick-launch)
    - [Fill in Dev values:](#fill-in-dev-values)
    - [Run Local App](#run-local-app)
    - [Notes for VSCode users](#notes-for-vscode-users)
- [Quick Start Notes:](#quick-start-notes)
- [F.A.Q](#faq)
    - [How do I use images and such?](#how-do-i-use-images-and-such)
    - [Do I have to use pug/stylus? I hate it!](#do-i-have-to-use-pugstylus-i-hate-it)
    - [How do I pass classes downwards?](#how-do-i-pass-classes-downwards)
    - [How do I add Environment Variables?](#how-do-i-add-environment-variables)
    - [I need Icons!](#i-need-icons)
    - [Is There an example of a large real world app to learn from?](#is-there-an-example-of-a-large-real-world-app-to-learn-from)
- [Consistency & Code Style](#consistency--code-style)
- [Todo](#todo)

A test build of GDQuest's site with [Svelte-Kit](https://kit.svelte.dev/docs) using [Svelte](https://svelte.dev/docs)

Uses [Pug](https://pugjs.org/api/getting-started.html) for templating, [Typescript](https://www.typescriptlang.org/) for logic, [Stylus](https://stylus-lang.com/) for styling.

## Quick Launch:

#### Fill in Dev values:

1. copy `.env.development.example` to `.env.development.local` and fill in the values.
2. Optionally/alternatively, also create `.env.production.local` if you intend to deploy from this machine.
3. If you do not want to actually use Github login in your trial, then just enter any value.

<details> 
<summary>Otherwise, follow the procedure below</summary>

1. head to https://github.com/settings/applications/new
2. Create a new application, set its URL to `http://localhost:3000`, and its callback URL to `http://localhost:3000/profile/callback`. Use any value you like for every other field.
3. Click <kbd>Register Application</kbd>

</details>


#### Run Local App

1. Run `npm install` (Recommendation: install [pnpm](https://pnpm.io/) and use `pnpm install` instead)
2. Run `npm run dev` for the dev site; or `npm run build` to build the production site

If you're using VSCode, <kbd>F5</kbd> will run the dev site and open firefox

#### Notes for VSCode users

- You will be prompted to install recommended extensions. Do! They will make your life nicer
- In particular, there is an extension that hides files optionally from the file tree, and makes the project much more palatable by removing files that rarely need to change


## Quick Start Notes:

1. Add components in `lib/components`
2. This directory maps to `$c`. You can load them everywhere with `import Component from '$c/Component.svelte'`
3. Add utilities in `lib`. This maps to `$lib`
4. Keep tree structure as flat as you can. Don't create nested directories inside directories
5. Add pages in `routes/pages`. Either create an `.md` file, or a `.svelte` file (if you create a `.svelte` file, you need to export a `metadata` object from the `module` context. Check `pages/about.svelte` for an example).
6. Some global components are available to all `.md` files. To know which, check `/svelte.config.js`, at the top of the file. At the time of writing, global components are `Note.svelte`, `Youtube.svelte`, and `RefLink.svelte` (as `Ref`)
7. To add a page, but hide it from menus, set its `menuTitle` to nothing (`null` or `''` -- in YAML, just leave it empty), or set `published` to `false`. An example of this can be seen in the `pages/license` page
8. In most cases, instead of using an `<a>` tag, use the `Link` component, it does a bunch of magic (auto-detection of external links and such). It does make it nastier to add contextual styles though, do a project search to see how it was accomplished

## F.A.Q

#### How do I use images and such?

Just import them!

```js
import src from 'some-image.jpg'

<img {src}>
```

This also works in CSS. Just use `url(path-to-image)`

For SVGs, you might opt to transform them into svelte components, should you want to embed them as is. Just change the extension from `.svg` to `.svelte`! Any XML file is valid Svelte. Alternatively:

```js
import svg from 'some-image.svg'

<div>{@html svg}</div>
```

You can also throw your assets in the `static` directory and reference them by url:

```js
const src = base + '/images/some-image.jpg'
<img {src}>
```

But you'd lose static checks. Also, I intend to have images auto-transform and resize in the future, and that wouldn't work with static assets either.


#### Do I have to use pug/stylus? I hate it!

No! Some components use good old HTML and CSS. Feel free to mix and match. You could also use [SASS](https://sass-lang.com/) if that's your jam, it'd take one `npm install node-sass` to add that capability, then specify it in the component: 

```html
<style lang="sass">
.a-class{
  look: "ma, I'm writing sass";
}
</style>
```

#### How do I pass classes downwards?

This isn't really idiomatic Svelte, and you're "not supposed to do that". However, if you want to, checkout the `SocialMediaIcon.svelte` component. In short:

1 - export a `class` property in the child:

```html
<script>
  let className = ''
  export { className as class }
</script>

<template>
  <div class={className}/>
</template>
```

2 - scope the child class yourself in the parent, using `:global`:

```html
<script>
  import Child from '$c/Child.svelte'
</script>

<template>
  <div class="parent">
    <Child class="some-class"/>
  </div>
</template>

<style>
  .parent :global(.some-class){
    prop: value;
  }
</style>
```

It's important to scope `:global`, or else you created a global rule (but in a peripheral file), which is a recipe for disaster. It'd be a good idea to also name the child class with enough specificity to make collisions unlikely

#### How do I add Environment Variables?

1. Add the variable to your `.env` file, and also to the `.env.development.example`. It needs to start with `VITE_`, or else it won't be available to the app
2. Add the definition to the `ImportMetaEnv` interface in [`./src/global.d.ts`](./src/global.d.ts)
3. Open [`./src/lib/config/serverEnv.ts`](./src/lib/config/serverEnv.ts) and add the new variable
4. In the file you need it in, import `$lib/config/serverEnv.ts` and use the variable (NOT IN THE CLIENT)

And example of this process can be seen in commit 5478eae88f7f2ea9d66045f06d8daf5dad533318

Alternative method:

1. Add the value to [`./build-scripts//svelte-config/globalEnv.js`](./build-scripts//svelte-config/globalEnv.js)
2. Add the value to [./src/lib/config/env.ts](./src/lib/config/env.ts)
3. Import `$lib/config/env.ts` and use the variable

#### I need Icons!

That's not a question, but there's an icon library included, [Introvertuous-Fun/svelte-icons](https://github.com/Introvertuous-Fun/svelte-icons). Head to https://svelte-icons-explorer.vercel.app/, choose the icon you want, click on it to get the import statement, use it.

You can check [`$c/SocialMediaIcon.svelte`](./src/lib/components/SocialMediaIcon.svelte) for an example. I used FontAwesome for social icons, but there's nothing set for icons in general.

#### Is There an example of a large real world app to learn from?

You betcha. Head over to https://github.com/sveltejs/realworld

## Consistency & Code Style

Use the baked in EsLint and Prettier rules. If you're using VsCode and the recommended plugins, your code will auto-format on save, and the linter will throw warnings for you.

Otherwise, use `npm run check` to check linting and format, and `npm run format` to format all files.

## Todo

- [x] port one course
- [x] make it work on gh-pages
- [x] meta tags
- [x] routing management
- [x] implement some form of authentication
- [x] protect a page behind authentication
- [x] make reference links auto-work
- [x] global components
- [x] social media icons
- [x] implement some styles
- [x] write the README
- [x] Add a LICENSE file
- [ ] implement a payment provider
- [ ] Use [nps](https://www.npmjs.com/package/nps) for scripts
- [ ] Add a sidebar in course layout, as well as next/previous in course chapters
- [ ] Make an authors database (and link author field in articles)
- [ ] Do some SEO basics (meta tags and such)
- [ ] multilanguage (file.[lng].md)
- [ ] search functionality
- [ ] make `state` login unique to prevent session hijacking
- [ ] implement other authentication providers