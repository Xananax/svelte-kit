/**
 * Node has a neat `path` module, but despite needing no I/O, that module
 * isn't accessible to the client, and the canonical replacement, `browserify-path` is
 * neither TS-compatible, nor `import` compatible.
 *
 * The below is a poor man's `path` and very certainly doesn't pass the tests, but it
 * will get the job done for us
 */

export const basename = (path: string, removeExtension: boolean | string = false) => {
  const base = new String(path).substring(path.lastIndexOf('/') + 1)
  if (removeExtension && base.lastIndexOf('.') != -1) {
    return base.substring(0, base.lastIndexOf('.'))
  }
  return base
}

export const join = (...parts: string[]): string => {
  const base = parts.shift() ?? ''
  const url = parts.shift() ?? ''
  const ret = new URL(url, base).href
  return parts.length ? join(ret, ...parts) : ret
}

export const dirname = (path: string) => path.replace(/\\/g, '/').replace(/\/[^/]*\/?$/, '')

export const strip = (path: string) => path.replace(/^\/+|\/+$/g, '')

export const extname = (path: string) => {
  const extPosition = path.lastIndexOf('.')
  return path.substring(extPosition, path.length)
}
