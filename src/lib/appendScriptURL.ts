import { browser } from '$app/env'

export const scriptURLexists = (url: string) =>
  browser && Array.from(document.getElementsByTagName('script')).some(({ src }) => src === url)

export const appendScriptURL = (url: string) => {
  if (!browser) {
    return
  }
  const tag = document.createElement('script')
  tag.src = url
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  return true
}

export const appendScriptIfNotLoaded = (url: string) =>
  scriptURLexists(url) ? true : appendScriptURL(url)
