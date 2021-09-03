/**
 * These values are set in ../../build-scripts/globalEnv.js
 * MAKE SURE TO NOT EXPOSE SENSITIVE DATA, this file is read by the client
 * For server-only environment variables, use `serverEnv.ts`
 */
export const name = process.env.NAME
export const version = Number(process.env.VERSION ?? 0)
export const homepage = process.env.HOMEPAGE
