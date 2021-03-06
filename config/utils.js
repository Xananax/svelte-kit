/// <reference path="../src/app.d.ts"/>
//@ts-check

import { dirname } from 'path'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

export const isDev = process.env.NODE_ENV !== 'production'
// @ts-ignore
export const projectRoot = dirname(dirname(import.meta.url)).replace(/^file:\/+/, '/')

export const fromRoot = (/** @type {string} */ path) => join(projectRoot, path)
export const relToRoot = (/** @type {string} */ path) =>
  path
    .replace(/^file:\/+/, '/')
    .replace(projectRoot, '')
    .replace(/^\//, '')

export const getEnvFile = () => {
  const envFilename = join(projectRoot, `.env.${isDev ? 'development' : 'production'}.local`)
  const envFileContent = readFileSync(envFilename, { encoding: 'utf-8' })
  const config = /** @type {ImportMetaEnv} */ dotenv.parse(envFileContent)
  return config
}

export const getPackageJson = () => {
  const package_json_location = join(projectRoot, 'package.json')
  const contents = readFileSync(package_json_location, 'utf8')
  return JSON.parse(contents)
}
