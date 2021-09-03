import { browser } from '$app/env'
import { deferredPromise } from './deferredPromise'

/**
 * Verifies if a script already exists in the document
 * @param url a script's url
 * @returns
 */
export const scriptURLexists = (url: string) =>
  browser && Array.from(document.getElementsByTagName('script')).some(({ src }) => src === url)

/**
 * Appends a script to the site's head, if it doesn't already exist
 * You can use this to load an API like Youtube, without fear of including it more than once
 * Using this on the server results in a no-op, so you can use it anywhere.
 * @param url the url of the script to append
 * @returns
 */
export const appendScriptURL = (url: string) => {
  if (!browser) {
    return
  }
  const tag = document.createElement('script')
  tag.src = url
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  const promise = deferredPromise<true>()
  tag.addEventListener('load', () => promise.resolve(true))
  return promise
}

/**
 * If a provided script isn't loaded, this function will load it. If the script
 * was already loaded, this function is a no-op. On the server, this function is a no-op
 * @param url the script's url
 * @returns A promise that resolves to `true` when the script is loaded
 */
export const appendScriptIfNotLoaded = (url: string) =>
  scriptURLexists(url) ? Promise.resolve(true) : appendScriptURL(url)
