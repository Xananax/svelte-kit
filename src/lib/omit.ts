export const omit = <O, K extends keyof O>(input: O, ...keys: K[]) => {
  const _k = new Set(keys)
  return Object.fromEntries(Object.entries(input).filter(([key]) => !_k.has(key as K))) as Omit<
    O,
    K
  >
}
