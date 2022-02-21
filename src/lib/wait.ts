export const wait =
  (ms = 500) =>
  <T>(arg?: T): Promise<T> =>
    new Promise((ok) => setTimeout(ok, ms, arg))
