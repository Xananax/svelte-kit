/// <reference path="../src/global.d.ts"/>

import { dirname } from 'path'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join } from 'path'

export const isDev = process.env.NODE_ENV !== 'production'
export const projectRoot = dirname(dirname(import.meta.url)).replace(/^file:\/+/, '/')

export const fromRoot = (path: string) => join(projectRoot, path)
export const relToRoot = (path: string) =>
  path
    .replace(/^file:\/+/, '/')
    .replace(projectRoot, '')
    .replace(/^\//, '')

export const getEnvFile = () => {
  const envFilename = join(projectRoot, `.env.${isDev ? 'development' : 'production'}.local`)
  const envFileContent = readFileSync(envFilename, { encoding: 'utf-8' })
  const config = dotenv.parse(envFileContent) as unknown as ImportMetaEnv
  return config
}

export const getPackageJson = () => {
  const package_json_location = join(projectRoot, 'package.json')
  const contents = readFileSync(package_json_location, 'utf8')
  return JSON.parse(contents)
}
