/**
 * Use this file to configure which elements are available globally in Markdown.
 * Making changes to this file is not enough, the list of global components must
 * also be maintained in `svelte.config.js`
 *
 * TODO: automate the list creation
 */
import Note from '$c/Note.svelte'
import Youtube from '$c/Youtube.svelte'
import Ref from '$c/RefLink.svelte'
import Link from '$c/Link.svelte'

export { Note, Youtube, Ref, Link }
export { Link as a }
